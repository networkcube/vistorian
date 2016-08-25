///-----------------------------------------------------------------------------------------------------------------
/// clustering.ts.  Copyright (c) 2014 Microsoft Corporation.
///     - clustering related code for LinkWave.
///-----------------------------------------------------------------------------------------------------------------
/// <reference path="features.ts"/>

declare var numeric: any;

    class Clustering {
        // K-means clustering
        static Kmeans(data: number[][], clusterNum: number, numIteration: number) {
            var clusters = [];
            var clusterPerLink = []; // # links
            var linksPerCluster = []; // # clusters

            // iterate until clusters become stable (i.e. there is no sample changing clusters) or reach the prefixed max iteration number
            for (var nIter = 0; nIter < numIteration; nIter++) {

                // update clusters
                for (var i = 0; i < clusterNum; i++) {
                    if (nIter == 0) {
                        // initialize the clusters
                        clusters[i] = data[i];
                    } else {
                        clusters[i] = Clustering.Kmeans_computeMean(data, linksPerCluster[i])
                    }
                    linksPerCluster[i] = [];
                }

                // iterate for all links
                var numClusterChanges = 0;
                for (var j = 0; j < data.length; j++) {
                    var minSimilarity = 1000000;
                    var closestCluster = null;

                    if (nIter == 0)
                        clusterPerLink[j] = clusterNum + 1; // initialize

                    // iterate for all clusters (i.e. one link vs. all clusters)
                    for (var cIter = 0; cIter < clusterNum; cIter++) {
                        var similarity = Features.libDistEuc(data[j], clusters[cIter]);
                        if (minSimilarity > similarity) {
                            closestCluster = cIter;
                            minSimilarity = similarity;
                        }
                    }

                    // count the cluster changings
                    if (clusterPerLink[j] != closestCluster)
                        numClusterChanges = numClusterChanges + 1;

                    clusterPerLink[j] = closestCluster; // # links
                    var numSamples = linksPerCluster[closestCluster].length;
                    linksPerCluster[closestCluster][numSamples] = j;
                }

                if (numClusterChanges == 0)
                    break;
            }
            return linksPerCluster;
        }

        static Kmeans_computeMean(data: any, sampleIdx: number[]) {
            // compute and return a new cluster center
            var clusterMeans = [];

            // compute mean for each class
            var numSamples = sampleIdx.length;

            var accumulatedData = [];
            for (var i = 0; i < numSamples; i++) {
                var idx = sampleIdx[i];
                if (i == 0) {
                    accumulatedData = data[idx];
                }
                else {
                    accumulatedData = Features.libVecPlusMinus(accumulatedData, data[idx], "plus");
                }
            }

            // take mean
            for (var j = 0; j < accumulatedData.length; j++) {
                if (accumulatedData[j] != 0)
                    accumulatedData[j] = accumulatedData[j] / numSamples;
            }
            return accumulatedData;
        }

        static ascendSort(a, b) {
            return a.value - b.value;
        }

        // spectral clustering
        static SC_main(data: any, clusterNum: number, kNN: number, SCtype: string) {
            console.log("spectral clustering");

            // construct an affinity matrix, kNN connected SC'[''
            var A = []; // affinity matrix
            var D = []; // diagonal matrix
            for (var i = 0; i < data.length; i++) {
                var refCorr = data[i];
                var dist = [];
                A[i] = [];
                D[i] = [];

                for (var j = 0; j < data.length; j++) {
                    var targetCorr = data[j];
                    var distVal = Features.libDistEuc(refCorr, targetCorr);
                    dist.push({ id: j, value: distVal });
                    A[i][j] = 0;
                    D[i][j] = 0;
                }

                dist = dist.sort(this.ascendSort);
                for (var p = 0; p < kNN; p++) {
                    if (SCtype == "real") {
                        A[i][dist[p].id] = dist[p].value;
                    } else if (SCtype == "binary") {
                        A[i][dist[p].id] = 1;
                    }
                }
            }

            // compute the laplacian matrix
            // L_norm = D^(-1/2)*(D-A)*D^(-1/2)
            for (var m = 0; m < data.length; m++) {
                var sum = 0;
                for (var n = 0; n < data.length; n++) {
                    sum = sum + A[m][n];
                }
                D[m][m] = Math.pow(sum, (-1 / 2));
            }

            var DminusA = Features.libMatPlusMinus(D, A, "minus");
            var DDminusA = numeric.dot(D, DminusA);
            var L_norm = numeric.dot(DDminusA, D);


            // compute eigen vectors
            var eigenVecVal = numeric.eig(L_norm); // eigenvectors are sorted in descending order of eigenvalues
            var eigenVals = [];
            for (var q = 0; q < L_norm.length; q++) {
                eigenVals.push({ id: q, value: eigenVecVal.lambda.x[q]});
            }
            eigenVals = eigenVals.sort(this.ascendSort);

            // compute normalized U matrix
            var U = [];
            for (var n = 1; n < clusterNum + 1; n++) {
                var eigVecTemp = eigenVecVal.E.x[eigenVals[n].id];
                var normVal = numeric.norm2(eigVecTemp);
                for (var kk = 0; kk < eigVecTemp.length; kk++) {
                    eigVecTemp[kk] = eigVecTemp[kk] / normVal;
                }
                U[n - 1] = eigVecTemp;
            }

            return numeric.transpose(U);
        }

        // compute silhouette coefficient to determin the optimal number of clusters
        static silhouetteMeasure(data: number[][], linksPerCluster: number[][]) {
            var clusterNum = linksPerCluster.length;

            var coefficient = 0;
            var totalCount = 0;
            // loop for each clusters
            for (var i = 0; i < clusterNum; i++) {
                var samPerCluster = linksPerCluster[i];
                var samNum = samPerCluster.length;
                totalCount = totalCount + samNum;

                // loop for each samples per cluster
                for (var j = 0; j < samNum; j++) {
                    var samIdx1 = samPerCluster[j];

                    // compute the average a(i), within cluster
                    var withinCluster = 0;
                    for (var k = 0; k < samNum; k++) { // loop for each comparison within a cluster
                        var samIdx2 = samPerCluster[k];

                        withinCluster = withinCluster + Features.libDistEuc(data[samIdx1], data[samIdx2]);
                    }
                    withinCluster = withinCluster / samNum;

                    // compute the average b(i), between clusters
                    var betweenClusters = [];
                    for (var c = 0; c < clusterNum; c++) {
                        if (c == i) {
                            betweenClusters[c] = 1000;
                            continue; // skip the identical cluster
                        }

                        var samPerClusterSub = linksPerCluster[c];
                        var samNumSub = samPerClusterSub.length;
                        var betweenCluster = 0;
                        for (var d = 0; d < samNumSub; d++) {
                            var samIdx3 = samPerClusterSub[d];
                            betweenCluster = betweenCluster + Features.libDistEuc(data[samIdx1], data[samIdx3]);
                        }
                        betweenClusters[c] = betweenCluster / samNumSub;
                    }

                    // find the min val
                    var minBtwCluster = 100;
                    for (var m = 0; m < betweenClusters.length; m++) {
                        if (minBtwCluster > betweenClusters[m]) {
                            minBtwCluster = betweenClusters[m];
                        }
                    }

                    // compute silhouette coefficient
                    if (withinCluster > minBtwCluster) {
                        coefficient = coefficient + ((minBtwCluster / withinCluster) - 1);
                    } else if (withinCluster < minBtwCluster) {
                        coefficient = coefficient + (1 - (withinCluster / minBtwCluster));
                    }
                }
            }
            coefficient = coefficient / totalCount;

            return coefficient;
        }
    }
