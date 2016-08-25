///-----------------------------------------------------------------------------------------------------------------
/// sorting.ts.  Copyright (c) 2014 Microsoft Corporation.
///     - sorting related code for LinkWave.
///-----------------------------------------------------------------------------------------------------------------
/// <reference path="features.ts"/>
/// <reference path="clustering.ts"/>
declare var numeric: any;

    class Sorting {

        // ordering by similarity to a reference link
        // data [index] = [weight t, weight t+1, weight t+n]
        static sortBySimilarity(data: number[][], referenceIndex: number, metric: string) {

            if (metric ==null)
              metric="euclideanFusion";

            // feature extraction
            var features = [];
            var featureSpecs = [];

            for(var i=0; i<data.length; i++ ) {
                var featureTemp = Features.computeArithemeticFeatures(data[i]);
                features[i] = featureTemp.featureVec;
                if (i==referenceIndex) {
                    featureSpecs = featureTemp.featureSpecs;
                }
            }

            // normalization into [0, 1]
            features = Features.libNormalization(features, "minmax"); // "minmax" or "z-score"

            // appending raw data as a feature
            // do it after normalization of other features
            if (metric == "euclideanMulti" || metric == "euclideanFusion") {
                var lastIdx = features[0].length;
                for (var i = 0; i < data.length; i++) {
                    features[i][lastIdx] = data[i];
                }
                featureSpecs[lastIdx] = "rawData";
            }
            // we could do weighting on the features
            // will be like (\alpha x feature 1) + (\beta x feature 2) + ...

            // matching
            var min = 10000;
            var max = -10000;
            var score = 0;
            var scores = [];
            var covMat: number[][]; // cov matrix for mahalanobis distance measure
            for (var k = 0; k < features.length; k++) {
                if (metric == "manhattan") {
                    score = Features.libDistManhattan(features[referenceIndex], features[k]);
                }
                else if (metric == "euclidean") {
                    score = Features.libDistEuc(features[referenceIndex], features[k]);
                }
                else if (metric == "euclideanMulti") {
                    // euclidean distance based
                    // it may not satisfy inequality property of distance
                    // disabled
                    score = Features.libDistMultiDimEuc(features[referenceIndex], features[k], featureSpecs);
                }
                else if (metric == "euclideanFusion") {
                    // scores fusion using simple SUM rule
                    // euclidean distanced based
                    score = Features.libDistEucFusion(features[referenceIndex], features[k], featureSpecs);
                }
                else if (metric == "cosine") {
                    score = Features.libDistCosine(features[referenceIndex], features[k]);
                }
                else if (metric == "mahalanobis") {
                    if (k == 0) {
                        covMat = Features.computeCovarianceMat(features);
                    }
                    score = Features.libDistMahalanobis(covMat, features[referenceIndex], features[k]);
                }
                else if (metric == "DTW") {
                    // not appropriate for our project. disabled.
                    score = Features.DTW_main(features[referenceIndex], features[k]);
                }
                else if (metric == "pearson") {
                    // not appropriate for our project. disabled.
                    score = Features.calcPearsonsCorrelation(features[referenceIndex], features[k]);
                }
                else if (metric == "correlation") {
                    score = Features.libDistCorrelation(features[referenceIndex], features[k]);
                }

                if (score > max) {
                    max = score;
                }
                if (score < min) {
                    min = score;
                }
                scores[k] = score;
            }
            var range = max - min;
            // score normalization for visualization
            //var scoreref = 1- ((scores[referenceIndex] - min) / range);
            //this.debug("score of reference " + scoreref);

            var similarity = [];
            for(var i=0; i<data.length; i++) {
                similarity[i]=  1 - ((scores[i] - min) / range);
            }
            
            return similarity;
        }
    }
