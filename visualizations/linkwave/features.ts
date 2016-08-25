///-----------------------------------------------------------------------------------------------------------------
/// features.ts.  Copyright (c) 2014 Microsoft Corporation.
///     - metric and feature computation libraries for LinkWave.
///-----------------------------------------------------------------------------------------------------------------
declare var numeric: any;

    class Features {

        // libraries for features
        static computeArithemeticFeatures(corrSeg: number[]) {
            var length = corrSeg.length;


            // amplitude features
            var min = 1000000;
            var max = -1000000;
            var mean = 0;
            var std = 0;
            var thresholds = [0.1, 0.3, 0.5, 0.7];
            var posAreaByThresholds = [0, 0, 0, 0];

            // slope features
            var minSlope = 1000000;
            var maxSlope = -1000000;
            var meanSlope = 0;

            // borderline features
            var crossZero = 0;
            var posRatio = 0;
            var negRatio = 0;

            // geometrical features
            var numPeaks = 0;
            var numValley = 0;
            var startPoint = 0;
            var endPoint = 0;
            var startAngle = 0;
            var endAngle = 0;
            var startEndPoints = [];

            // statistical features
            var skewness = 0;
            var kurtosis = 0;
            var autocorrelation = 0;

            for (var i = 0; i < length; i++) {
                
                // if condition for local window based features
                if (i > 0 && i < length - 2) {
                    // peaks & velley
                    if (corrSeg[i - 1] < corrSeg[i] && corrSeg[i] > corrSeg[i + 1]) {
                        numPeaks = numPeaks + 1;
                    }
                    else if (corrSeg[i - 1] > corrSeg[i] && corrSeg[i] < corrSeg[i + 1]) {
                        numValley = numValley + 1;
                    }

                    // cross zero line
                    // positive -> negative, signal ending
                    if (corrSeg[i - 1] > 0 && corrSeg[i] <= 0 && corrSeg[i + 1] <= 0) {
                        crossZero = crossZero + 1;

                        //signal ending point
                        startEndPoints.push({type: "end", pos: i});
                    }
                    // negative -> positive, signal starting
                    else if (corrSeg[i - 1] <= 0 && corrSeg[i] > 0 && corrSeg[i + 1] > 0) {
                        crossZero = crossZero + 1;

                        //signal starting point
                        startEndPoints.push({ type: "start", pos: i });
                    }
                }

                // slope features
                if (i < length - 2) {
                    var slope = corrSeg[i + 1] - corrSeg[i];

                    // max slope
                    if (slope > maxSlope) { maxSlope = slope; }
                    // min slope
                    if (slope < minSlope) { minSlope = slope; }

                    meanSlope = meanSlope + slope;
                }

                // amplitude features
                // max value
                if (corrSeg[i] > max) { max = corrSeg[i]; }
                // min value
                if (corrSeg[i] < min) { min = corrSeg[i]; }

                // pos vs. neg ratio
                if (corrSeg[i] > 0) {
                    posRatio = posRatio + 1;
                }
                else { negRatio = negRatio + 1; }

                // mean

                mean = mean + corrSeg[i];

                // positive area above threshold
                for (var j = 0; j < thresholds.length; j++) {
                    if (corrSeg[i] > thresholds[j]) {
                        posAreaByThresholds[j] = posAreaByThresholds[j] + 1;
                    }
                }
            }

            // mean
            if (mean == 0) {
                mean = 0;
            } else {
                mean = mean / length;
            }

            // find out the dominant starting and ending point
            var startEnds = this.computeStartEndPointsAngles(corrSeg, startEndPoints, max)
            startPoint = startEnds[0];
            endPoint = startEnds[1];
            startAngle = startEnds[2];
            endAngle = startEnds[3];

            // statistical features
            var skewKurt = this.computeSkewnessKurtosis(corrSeg, mean);
            skewness = skewKurt[0];
            kurtosis = skewKurt[1];
            std = this.computeStd(corrSeg, mean);
            if (mean == 0) {
                autocorrelation = 0;
            } else {
                autocorrelation = this.computeAutocorrelation(corrSeg, mean, 3); // 3 is order, can be adjusted if needed
            }


            var featureVec =
            // amplitude
                [min, max, mean, posAreaByThresholds[0], posAreaByThresholds[1], //posAreaByThresholds[2], posAreaByThresholds[3],
            // slope
                minSlope, maxSlope, meanSlope,
            // cross border
                crossZero, posRatio, negRatio,// startAngle, endAngle,
            // global, statistical
                std, autocorrelation, skewness, kurtosis,
            // geometrical
                numPeaks, numValley, startPoint, endPoint];

            // the order of features should be same
            var featureSpecs = ["minAmp", "maxAmp", "meanAmp", "posAreaByThreshod", "poseAreaByThreshod",// "posAreaByThreshod", "poseAreaByThreshod",
                "minSlope", "maxSlope", "meanSlope",
                "crossZero", "posRatio", "negRatio",// "startAngle", "endAngle",
                "std", "autocorrelation", "skewness", "kurtosis",
                "numPeaks", "numValley", "startPoint", "endPoint"];
      
            return { featureVec: featureVec, featureSpecs: featureSpecs };
        }



        // ---- compute and extract signal features
        static computeAutocorrelation(corr: number[], mean: number, order: number) {
            // compute autocorrelation feature of a correlation
            var sum1 = 0, sum2 = 0;
            for (var i = 0; i < corr.length - order; i++) {
                if (i < corr.length - order) {
                    var temp = (corr[i] - mean) * (corr[i + order] - mean);
                    sum1 = sum1 + temp;
                }
                var diff = corr[i] - mean;
                sum2 = sum2 + (diff * diff);
            }
            return sum1 / sum2;
        }

        static computeStartEndPointsAngles(corrSeg: number[], startEndPoints: any, max: number) {
            // find out the dominant starting and ending point
            // angle features are included in this function - 1st Sep
            var startPoint = 0;
            var endPoint = 0;
            var startAngle = 0;
            var endAngle = 0;
            var length = corrSeg.length;

            if (startEndPoints.length == 0 && max != 0) {
                // when there is no starting or ending point
                startPoint = 0;
                endPoint = length; // the last point of the window
                startAngle = 0;
                endAngle = 0;
            }
            else if (startEndPoints.length == 1) {
                // when there is only one starting or ending point
                var positionTemp = startEndPoints[0].pos;
                if (startEndPoints[0].type == "start") {
                    startPoint = positionTemp;
                    endPoint = length;
                    var angleTemp = numeric.atan([corrSeg[positionTemp + 1], 1]);
                    startAngle = angleTemp[0];
                    endAngle = 0;
                } else {
                    startPoint = 0;
                    endPoint = positionTemp;
                    startAngle = 0;
                    angleTemp = numeric.atan([corrSeg[positionTemp - 1], 1]);
                    endAngle = angleTemp[0];
                }
            }
            else if (startEndPoints.length > 1) {
                // if there are more than one ending or starting points, take the dominant one in terms of signal amplitude
                var startEndPair = [];
                var prevStatus = startEndPoints[0].type;
                for (var j = 1; j < startEndPoints.length; j++) {

                    var startTemp = 0;
                    var endTemp = 0;
                    if (prevStatus == "start") {
                        startTemp = startEndPoints[j].pos;
                        if (j + 1 < startEndPoints.length) {
                            endTemp = startEndPoints[j + 1].pos;
                        }
                        else {
                            endTemp = length;
                        }
                        startEndPair.push({ start: startTemp, end: endTemp });
                        j++;
                    }
                    else if (prevStatus == "end") {
                        startTemp = 0;
                        endTemp = startEndPoints[j].pos;

                        startEndPair.push({ start: startTemp, end: endTemp });
                    }
                }

                var massMax = -1000;
                for (var m = 0; m < startEndPair.length; m++) {
                    var sum = 0;
                    for (var n = startEndPair[m].start; n < startEndPair[m].end; n++) {
                        sum = sum + corrSeg[n];
                    }

                    if (massMax < sum) {
                        startTemp = startEndPair[m].start;
                        endTemp = startEndPair[m].end;

                        massMax = sum;
                        startPoint = startTemp;
                        endPoint = endTemp;
                        angleTemp = numeric.atan([corrSeg[startPoint + 1], 1]);
                        startAngle = angleTemp[0];

                        numeric.atan([corrSeg[startPoint - 1], 1]);
                        endAngle = angleTemp[0];
                    }
                }
            }

            return [startPoint, endPoint, startAngle, endAngle];
        }

        static computeSkewnessKurtosis(corrSeg: number[], mean: number) {
            // compute skewness and kurtosis features
            var length = corrSeg.length;
            var std = this.computeStd(corrSeg, mean);

            var sumSkewness = 0;
            var sumKurtosis = 0;
            for (var i = 0; i < corrSeg.length; i++) {
                var meanDiff = corrSeg[i] - mean;
                sumSkewness = sumSkewness + Math.pow(meanDiff, 3);
                sumKurtosis = sumKurtosis + Math.pow(meanDiff, 4);
            }

            var skewness = sumSkewness / (length * Math.pow(std, 3));
            var kurtosis = sumKurtosis / (length * Math.pow(std, 4));
            if (numeric.isNaN(skewness) == true) {
                skewness = 0;
            }
            if (numeric.isNaN(kurtosis) == true) {
                kurtosis = 0;
            }

            return [skewness, kurtosis - 3];
        }


        static computeAreaDiff(refCorrSeg: number[], targetCorrSeg: number[]) {
            // compute area difference features between two signals
            var diffFromRef = [];
            for (var j = 0; j < refCorrSeg.length; j++) {
                if (refCorrSeg[j] >= targetCorrSeg[j]) {
                    diffFromRef[j] = refCorrSeg[j] - targetCorrSeg[j];
                }
                else {
                    diffFromRef[j] = targetCorrSeg[j] - refCorrSeg[j];
                }
            }
            return d3.sum(diffFromRef) / diffFromRef.length;
        }

        // signal shape features
        static localTrendCodingWindow(corrSeg: number[]) {
            // convert a timeseries into a set of codes which describe "signal shape"
            var codedCorr = [];

            for (var i = 0; i < corrSeg.length; i++) {
                if (i == 0) {
                    if (corrSeg[i] > corrSeg[i + 1])
                        codedCorr[i] = 1;
                    else if (corrSeg[i] < corrSeg[i + 1])
                        codedCorr[i] = 2;
                    else if ((corrSeg[i] == corrSeg[i + 1]) && (corrSeg[i] != 0))
                        codedCorr[i] = 5;
                    else if ((corrSeg[i] == corrSeg[i + 1]) && (corrSeg[i] == 0))
                        codedCorr[i] = 0;
                }
                else if (i == corrSeg.length - 1) {
                    if (corrSeg[i - 1] > corrSeg[i])
                        codedCorr[i] = 1;
                    else if (corrSeg[i - 1] < corrSeg[i])
                        codedCorr[i] = 2;
                    else if ((corrSeg[i - 1] == corrSeg[i]) && (corrSeg[i] != 0))
                        codedCorr[i] = 5;
                    else if ((corrSeg[i - 1] == corrSeg[i]) && (corrSeg[i] == 0))
                        codedCorr[i] = 0;
                }
                else {
                    if ((corrSeg[i - 1] > corrSeg[i]) && (corrSeg[i] > corrSeg[i + 1])) // monotonically decreasing
                        codedCorr[i] = 1;
                    else if ((corrSeg[i - 1] < corrSeg[i]) && (corrSeg[i] < corrSeg[i + 1])) // monotonically increasing
                        codedCorr[i] = 2;
                    else if ((corrSeg[i - 1] >= corrSeg[i]) && (corrSeg[i] < corrSeg[i + 1])) // event dec -> inc
                        codedCorr[i] = 3;
                    else if ((corrSeg[i - 1] < corrSeg[i]) && (corrSeg[i] >= corrSeg[i + 1])) // event inc -> dec
                        codedCorr[i] = 4;
                    else if (((corrSeg[i - 1] == corrSeg[i]) && (corrSeg[i] == corrSeg[i + 1])) && corrSeg[i] != 0) // consistent  // non-decreasing // non-increasing
                        codedCorr[i] = 5;
                    else if (((corrSeg[i - 1] == corrSeg[i]) && (corrSeg[i] == corrSeg[i + 1])) && corrSeg[i] == 0) // consistent  // non-decreasing // non-increasing
                        codedCorr[i] = 0;
                    else
                        codedCorr[i] = 6;
                }
            }
            return codedCorr;
        }

        static calcPearsonsCorrelation(x: number[], y: number[]) {

            if (x.length != y.length) {
                throw "Error in calculatePersonsCorrelation: vectors must be the same length";
            }

            if (x.length < 2 || y.length < 2) {
                throw "Error in calculatePersonsCorrelation: vectors must have length >= 2";
            }

            var xSum = 0;
            var ySum = 0;

            for (var i = 0; i < x.length; i++) {
                xSum += x[i];
                ySum += y[i];
            }

            var xMean = xSum / x.length;
            var yMean = ySum / y.length;

            var a = x.map(function (value) {
                return value - xMean;
            });

            var b = y.map(function (value) {
                return value - yMean;
            });

            var sumAB = 0;
            var sumAA = 0;
            var sumBB = 0;

            for (var i = 0; i < a.length; i++) {
                var aValue = a[i];
                var bValue = b[i];

                sumAB += aValue * bValue;
                sumAA += aValue * aValue;
                sumBB += bValue * bValue;
            }

            var corValue = sumAB / Math.sqrt(sumAA * sumBB);
            return corValue;
        }

        static computePairwiseFeatures(ref: number[], target: number[]) {
            // compute pairwise features
            var sum = 0;

            // feature 1: difference in area (i.e. difference in signal amplitude)
            sum = sum + this.computeAreaDiff(ref, target);

            // feature 2: difference in shape
            var codedRef = this.localTrendCodingWindow(ref);
            var codedTarget = this.localTrendCodingWindow(target);
            sum = sum + (1 - this.libDistHamming(ref, target));

            // feature 3: pearson correlation similarity
            if (numeric.sum(target) > 0) {
                sum = sum + (1 - this.calcPearsonsCorrelation(ref, target));
            }
            return sum;
        }

        static computeLBPfeatures(corrMat: number[][]) {
            // compute LBP features
            var numRow = corrMat.length;
            var numCol = corrMat[0].length;
            var LBPfeatures = [];

            var count = 0;
            for (var y = 1; y < numRow - 1; y++) {
                for (var x = 1; x < numCol - 1; x++) {
                    var xCoordinates = [x - 1, x + 1];
                    var yCoordinates = [y - 1, y + 1];

                    var convertedVec = this.mat2vec(corrMat, xCoordinates, yCoordinates);
                    LBPfeatures[count] = this.LBPthresholding(convertedVec);
                    count++;
                }
            }

            return LBPfeatures;
        }

        static LBPthresholding(convertedVec: number[]) {
            // sub-function of LBP. thresholding by the center point
            var centerVal = convertedVec[4];
            var featureCode = [];
            var count = 0;
            var sum = 0;
            for (var i = 0; i < convertedVec.length; i++) {
                if (i == 4) { continue; }

                if (convertedVec[i] >= centerVal) {
                    featureCode[count] = 1;
                } else {
                    featureCode[count] = 0;
                }
                sum = sum + Math.pow(2, 8 - count) * featureCode[count];
                count++;
            }

            return sum;
        }

        static thresholding(vec: number[], thresholds: number[]) {
            // threshold the input values (i.e. weights in vector form) by predetermined thresholds (threshold can be more than 1).
            var length = vec.length;
            var numTaus = thresholds.length;
            var thresholdedMat = [];
            var thresholdedVec = [];

            for (var j = 0; j < numTaus; j++) {
                var tau = thresholds[j];
                var tempVec = [];

                var lenTemp = thresholdedVec.length;
                for (var i = 0; i < length; i++) {

                    if (vec[i] >= tau) {
                        tempVec[i] = vec[i];
                        thresholdedVec[lenTemp + i] = vec[i];
                    } else {
                        tempVec[i] = 0;
                        thresholdedVec[lenTemp + i] = 0;
                    }
                }
                thresholdedMat[j] = tempVec;
            }

            return { matForm: thresholdedMat, vecForm: thresholdedVec };
        }


        // ---- normalization
        static libNormalization(data: number[][], type: string) {
            var numLinks = data.length; // # rows
            var dimension = data[0].length; // # cols

            // input matrix data \in R^{#samples x dimension}
            // normalized per each feature over all samples
            data = numeric.transpose(data);
            for (var j = 0; j < dimension; j++) {
                var aVector = data[j];

                if (type == "minmax") {
                    var minmax = this.computeMinMaxOfVector(aVector);

                    var normalizedVec = [];
                    for (var i = 0; i < numLinks; i++) {
                        normalizedVec[i] = (aVector[i] - minmax.min) / minmax.range;
                    }
                }
                else if (type == "z-score") {
                    var mean = this.computeVectorMean(aVector);
                    var std = this.computeStd(aVector, mean);

                    var normalizedVec = [];
                    for (var m = 0; m < numLinks; m++) {
                        normalizedVec[m] = (aVector[m] - mean) / std;
                    }
                }
                data[j] = [];
                data[j] = normalizedVec;
            }

            return numeric.transpose(data);
        }


        // ---- libraries for distance/similarity
        static libDistMahalanobis(covMat: number[][], refCorr: number[], targetCorr: number[]) {
            // compute mahalanobis distance between two vectors
            covMat = numeric.inv(covMat);

            // a = (X-mu)' * Cov^-1 * (X-mu)
            var subVec = [];
            subVec[0] = [];
            for (var i = 0; i < refCorr.length; i++) {
                subVec[0][i] = refCorr[i] - targetCorr[i];
            }
            var subVecTranspose = this.libTranspose(subVec);

            var leftSide = numeric.dot(subVec, covMat);
            var dist = numeric.dot(leftSide, subVecTranspose);

            var sqrt = d3.scale.sqrt();
            return sqrt(dist);
        }


        static libDistManhattan(refCorr: number[], targetCorr: number[]) {
            // compute manhattan distance between two vectors
            var dist = 0;
            for (var i = 0; i < refCorr.length; i++) {
                dist = dist + Math.abs(refCorr[i] - targetCorr[i])
            }
            return dist;
        }

        static libDistEuc(refCorr: number[], targetCorr: number[]) {
            // compute Euclidean distance between two vectors
            var sum = 0;
            for (var i = 0; i < refCorr.length; i++) {
                var diff = (refCorr[i] - targetCorr[i]);
                sum = sum + (diff * diff);
            }

            var dist = Math.sqrt(sum);
            return dist;
        }

        static libDistEucFusion(refCorr: any, targetCorr: any, featureSpecs: string[]) {
            var eucSum = 0;
            var startEndPointSum = 0;
            var pairwiseSum = 0;
            // iterate over all features
            for (var i = 0; i < refCorr.length; i++) {
                var ref = refCorr[i];
                var target = targetCorr[i];
                var featureName = featureSpecs[i];

                // a pairwise feature, penalty for dissimilar starting and ending point
                if (featureName == "endPoint") {
                    if (refCorr[i] != targetCorr[i]) {
                        startEndPointSum = startEndPointSum + 1;
                    }
                }
                else if (featureName == "startPoint") {
                    if (refCorr[i] != targetCorr[i]) {
                        startEndPointSum = startEndPointSum + 1;
                    }
                }
                else if (featureName == "rawData") {
                    pairwiseSum = pairwiseSum + this.computePairwiseFeatures(refCorr[i], targetCorr[i]);
                    continue;
                }
                // comparison (e.g. euclidean distance) of signal features between two links
                else {
                    var diff = refCorr[i] - targetCorr[i];
                    eucSum = eucSum + (diff * diff);
                }
            }

            // fusion using SUM rule
            var dist = Math.sqrt(eucSum) + pairwiseSum + startEndPointSum;

            if (numeric.isNaN(dist) == true)
                dist = 0;

            return dist;
        }

        static libDistMultiDimEuc(refCorr: any, targetCorr: any, featureSpecs: string[]) {
            var sum = 0;
            for (var i = 0; i < refCorr.length; i++) {
                var ref = refCorr[i];
                var target = targetCorr[i];
                var featureName = featureSpecs[i];
                var diff = 0;

                if ((featureName == "endPoint") || (featureName == "startPoint")) {
                    // a pairwise feature, penalty for dissimilar starting and ending point
                    if (refCorr[i] == targetCorr[i]) {
                        diff = 0;
                    }
                    else {
                        diff = 1 + Math.abs(refCorr[i] - targetCorr[i]); // panelty
                    }
                }
                else if (featureName == "rawData") {
                    sum = sum + this.computePairwiseFeatures(refCorr[i], targetCorr[i]);
                    continue;
                }
                else {
                    diff = refCorr[i] - targetCorr[i];
                }
                sum = sum + (diff * diff);
            }

            var dist = Math.sqrt(sum);
            if (numeric.isNaN(dist) == true)
                dist = 0;

            return dist;
        }



        static libDistHamming(refCorrSeg: number[], targetCorrSeg: number[]) {
            // compute hamming distance between two discrete vectors
            var hammingDist = 0;
            for (var j = 0; j < refCorrSeg.length; j++) {
                if (refCorrSeg[j] == targetCorrSeg[j]) {
                    hammingDist++;
                }
            }
            return hammingDist / refCorrSeg.length;
        }

        static libDistCosine(refCorr: number[], targetCorr: number[]) {
            // compute cosine distance between two vectors
            var sqrt = d3.scale.sqrt();

            var sumRef = 0, sumTarget = 0, sumMul = 0;
            for (var i = 0; i < refCorr.length; i++) {
                sumRef = sumRef + (refCorr[i] * refCorr[i]);
                sumTarget = sumTarget + (targetCorr[i] * targetCorr[i]);
                sumMul = sumMul + (refCorr[i] * targetCorr[i]);
            }

            return 1 - (sumMul / (sqrt(sumRef) * sqrt(sumTarget)));
        }


        static libDistCorrelation(refCorr: number[], targetCorr: number[]) {
            // compute correlation distance between two vectors
            var sqrt = d3.scale.sqrt();
            var length = refCorr.length;

            var refMean = d3.sum(refCorr) / length;
            var targetMean = d3.sum(targetCorr) / length;

            var sumRef = 0, sumTarget = 0, sumMul = 0;
            for (var i = 0; i < refCorr.length; i++) {
                sumRef = sumRef + ((refCorr[i] - refMean) * (refCorr[i] - refMean));
                sumTarget = sumTarget + ((targetCorr[i] - targetMean) * (targetCorr[i] - targetMean));
                sumMul = sumMul + ((refCorr[i] - refMean) * (targetCorr[i] - targetMean));
            }
            return 1 - (sumMul / (sqrt(sumRef) * sqrt(sumTarget)));

            //return 10;
        }

        static libDistProcrustes(refCorrSeg: number[], targetCorrSeg: number[]) {
            // compute Procrustes distance between two vectors, not completed yet
            var ref = [], target = [];
            // generate 2 dimensional data
            var idxVec = [];
            for (var i = 0; i < refCorrSeg.length; i++) {
                ref[i] = [i, refCorrSeg[i]];
                target[i] = [i, targetCorrSeg[i]];
            }

            var transposedRef = numeric.transpose(ref);
            var mul = numeric.dot(ref, target);

            var I = numeric.identity(refCorrSeg.length);
            var diffMat = this.libMatPlusMinus(I, mul, 'minus');
            var traceDiff = this.libTrace(diffMat);
        }

        static libNumSimilarity(refCorr: number[], targetCorr: number[]) {
            // compute number similairty between two vectors
            var sum = 0;
            for (var i = 0; i < refCorr.length; i++) {
                var numSim = 1 - (Math.abs(refCorr[i] - targetCorr[i]) / (Math.abs(refCorr[i]) + Math.abs(targetCorr[i])));

                sum = sum + (numSim * numSim);
            }
            sum = sum / refCorr.length;

            var sqrt = d3.scale.sqrt();
            return sqrt(sum);
        }

        static DTW_main(refCorrSeg: number[], targetCorrSeg: number[]) {
            // compute DTW distance between two vectors
            var weights = [];
            weights.push({ hor: 1, ver: 1, diag: 1 });

            var ref = [], target = [];
            // generate 2 dimensional data
            for (var i = 0; i < refCorrSeg.length; i++) {
                ref[i] = [refCorrSeg[i]];
                target[i] = [targetCorrSeg[i]];
            }

            var pathMap = this.DTW_computePathMap(ref, target, weights);
            return 1 - pathMap[refCorrSeg.length - 1][targetCorrSeg.length - 1].min;
        }

        static DTW_computePathMap(refCorrSeg2D: number[][], targetCorrSeg2D: number[][], weights) {
            // sub-function of DTW function. computing path map
            var pathMap = [];

            for (var i = 0; i < refCorrSeg2D.length; i++) {
                pathMap[i] = [];

                for (var j = 0; j < targetCorrSeg2D.length; j++) {
                    pathMap[i][j] = [];

                    var dist = this.libDistEuc(refCorrSeg2D[i], targetCorrSeg2D[j]);
                    var hor = null, ver = null, diag = null, path = null, min = null;
                    if (i == 0 && j == 0) {
                        min = dist;
                    }
                    else if (i > 0 && j == 0) {
                        min = (dist * weights[0].hor) + pathMap[i - 1][j].min;
                        path = 1;
                    }
                    else if (i == 0 && j != 0) {
                        min = (dist * weights[0].ver) + pathMap[i][j - 1].min;
                        path = 3;
                    }
                    else {
                        hor = (dist * weights[0].hor) + pathMap[i - 1][j].min;
                        ver = (dist * weights[0].ver) + pathMap[i][j - 1].min;
                        diag = (dist * weights[0].diag) + pathMap[i - 1][j - 1].min;

                        min = d3.min([hor, ver, diag]);
                        for (var k = 0; k < 3; k++) {
                            if (min == hor) path = 1;
                            else if (min == diag) path = 2;
                            else if (min == ver) path = 3;
                        }
                    }

                    pathMap[i][j] = ({ hor: hor, ver: ver, diag: diag, path: path, min: dist });
                }
            }
            return pathMap;
        }


        // --- linear algebra operations
        static mat2vec(corrMat: number[][], xCoordinates: number[], yCoordinates: number[]) {
            // convert a matrix into a vector
            var x1 = xCoordinates[0];
            var x2 = xCoordinates[1];
            var y1 = yCoordinates[0];
            var y2 = yCoordinates[1];

            var convertedVec = [];
            var count = 0;
            for (var r = y1; r <= y2; r++) {
                for (var c = x1; c <= x2; c++) {
                    convertedVec[count] = corrMat[r][c];
                    count++;
                }
            }
            return convertedVec;
        }

        static computeMinMaxOfVector(vector: number[]) {
            // find out the min and max values of an input vector
            // input vector should be a colum vector
            var length = vector.length; // vector length, # rows
            var min = 1000000;
            var max = -1000000;

            for (var i = 0; i < length; i++) {
                if (vector[i] > max) {
                    max = vector[i];
                } else if (vector[i] < min) {
                    min = vector[i];
                }
            }
            var range = max - min;

            return { min: min, max: max, range: range };
        }

        static computeVectorMean(vector: number[]) {
            // compute a mean of a vector
            // input vector should be a colum vector
            var length = vector.length;
            var mean = 0;

            for (var i = 0; i < length; i++) {
                mean = mean + vector[i];
            }

            return (mean / length);
        }

        static computeCovarianceMat(data: number[][]) {
            // compute covariance matrix of input data
            var numLinks = data.length;
            var dataTranspose = numeric.transpose(data);
            var dimension = dataTranspose.length;

            // compute sample mean
            var meanVec = [];
            for (var n = 0; n < dimension; n++) {
                var tempVec = dataTranspose[n];
                meanVec[n] = numeric.sum(tempVec) / numLinks;
            }

            var subMat = [];
            for (var i = 0; i < numLinks; i++) {
                subMat[i] = this.libVecPlusMinus(data[i], meanVec, 'minus');
            }

            var subMatTranspose = numeric.transpose(subMat);
            var covMat = numeric.dot(subMatTranspose, subMat);

            return covMat;
        }

        static computeStd(corrSeg: number[], mean: number) {
            // compute standard deviation
            var sum = 0;
            var sqrt = d3.scale.sqrt();
            for (var i = 0; i < corrSeg.length; i++) {
                var diff = corrSeg[i] - mean;

                sum = sum + (diff * diff);
            }
            var temp = sum / corrSeg.length;
            return sqrt(temp);
        }

        static libTrace(Mat: number[][]) {
            // compute trace of a square matrix
            var row = Mat.length;

            var sum = 0;
            for (var r = 0; r < row; r++) {
                sum = sum + Mat[r][r];
            }

            return sum;
        }

        static libInnerProduct(Mat1: number[][], Mat2: number[][]) {
            // perform inner product between two matrices
            // Numeric library has a similar function
            var row1 = Mat1.length;
            var row2 = Mat2.length;
            var col1 = Mat1[0].length;
            var col2 = Mat2[0].length;
            if (col1 != row1) {
                console.log("matrix dimension is not matched for innter product computation");
            }
            var Mat1xMat2 = [];
            for (var r = 0; r < row1; r++) {
                var vecMul = [];
                for (var c = 0; c < col2; c++) {
                    var sum = 0;
                    for (var rc = 0; rc < col1; rc++) {
                        sum = sum + (Mat1[r][rc] * Mat2[rc][c]);
                    }
                    vecMul[c] = sum;
                }
                Mat1xMat2[r] = vecMul;
            }

            return Mat1xMat2;
        }

        static libTranspose(Mat: number[][]) {
            // transpose a matrix
            var oldRow = Mat.length;
            var oldCol = Mat[0].length;

            var rotatedMat = [];
            for (var r = 0; r < oldCol; r++) {
                rotatedMat[r] = [];
            }

            for (var newRow = 0; newRow < oldCol; newRow++) {
                for (var newCol = 0; newCol < oldRow; newCol++) {
                    rotatedMat[newRow][newCol] = Mat[newCol][newRow];
                }
            }
            return rotatedMat;
        }


        static libVecPlusMinus(vec1: number[], vec2: number[], type: string) {
            // perform addition or subtraction between two vectors
            var length = vec1.length;
            var result = [];

            for (var i = 0; i < length; i++) {
                if (type == "plus") {
                    result[i] = vec1[i] + vec2[i];
                }
                else {
                    result[i] = vec1[i] - vec2[i];
                }
            }
            return result;
        }


        static libMatPlusMinus(mat1: number[][], mat2: number[][], type: string) {
            // perform addition or subtraction between two matrices
            var row = mat1.length;
            var col = mat1[0].length;
            var resultMat = [];
            for (var r = 0; r < row; r++) {
                resultMat[r] = [];
                for (var c = 0; c < col; c++) {
                    if (type == "plus") {
                        resultMat[r][c] = mat1[r][c] + mat2[r][c];
                    } else if (type == "minus") {
                        resultMat[r][c] = mat1[r][c] - mat2[r][c];
                    }
                }
            }
            return resultMat;
        }
    }
