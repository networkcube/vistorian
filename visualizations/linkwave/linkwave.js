var Features = (function () {
    function Features() {
    }
    Features.computeArithemeticFeatures = function (corrSeg) {
        var length = corrSeg.length;
        var min = 1000000;
        var max = -1000000;
        var mean = 0;
        var std = 0;
        var thresholds = [0.1, 0.3, 0.5, 0.7];
        var posAreaByThresholds = [0, 0, 0, 0];
        var minSlope = 1000000;
        var maxSlope = -1000000;
        var meanSlope = 0;
        var crossZero = 0;
        var posRatio = 0;
        var negRatio = 0;
        var numPeaks = 0;
        var numValley = 0;
        var startPoint = 0;
        var endPoint = 0;
        var startAngle = 0;
        var endAngle = 0;
        var startEndPoints = [];
        var skewness = 0;
        var kurtosis = 0;
        var autocorrelation = 0;
        for (var i = 0; i < length; i++) {
            if (i > 0 && i < length - 2) {
                if (corrSeg[i - 1] < corrSeg[i] && corrSeg[i] > corrSeg[i + 1]) {
                    numPeaks = numPeaks + 1;
                }
                else if (corrSeg[i - 1] > corrSeg[i] && corrSeg[i] < corrSeg[i + 1]) {
                    numValley = numValley + 1;
                }
                if (corrSeg[i - 1] > 0 && corrSeg[i] <= 0 && corrSeg[i + 1] <= 0) {
                    crossZero = crossZero + 1;
                    startEndPoints.push({ type: "end", pos: i });
                }
                else if (corrSeg[i - 1] <= 0 && corrSeg[i] > 0 && corrSeg[i + 1] > 0) {
                    crossZero = crossZero + 1;
                    startEndPoints.push({ type: "start", pos: i });
                }
            }
            if (i < length - 2) {
                var slope = corrSeg[i + 1] - corrSeg[i];
                if (slope > maxSlope) {
                    maxSlope = slope;
                }
                if (slope < minSlope) {
                    minSlope = slope;
                }
                meanSlope = meanSlope + slope;
            }
            if (corrSeg[i] > max) {
                max = corrSeg[i];
            }
            if (corrSeg[i] < min) {
                min = corrSeg[i];
            }
            if (corrSeg[i] > 0) {
                posRatio = posRatio + 1;
            }
            else {
                negRatio = negRatio + 1;
            }
            mean = mean + corrSeg[i];
            for (var j = 0; j < thresholds.length; j++) {
                if (corrSeg[i] > thresholds[j]) {
                    posAreaByThresholds[j] = posAreaByThresholds[j] + 1;
                }
            }
        }
        if (mean == 0) {
            mean = 0;
        }
        else {
            mean = mean / length;
        }
        var startEnds = this.computeStartEndPointsAngles(corrSeg, startEndPoints, max);
        startPoint = startEnds[0];
        endPoint = startEnds[1];
        startAngle = startEnds[2];
        endAngle = startEnds[3];
        var skewKurt = this.computeSkewnessKurtosis(corrSeg, mean);
        skewness = skewKurt[0];
        kurtosis = skewKurt[1];
        std = this.computeStd(corrSeg, mean);
        if (mean == 0) {
            autocorrelation = 0;
        }
        else {
            autocorrelation = this.computeAutocorrelation(corrSeg, mean, 3);
        }
        var featureVec = [min, max, mean, posAreaByThresholds[0], posAreaByThresholds[1],
            minSlope, maxSlope, meanSlope,
            crossZero, posRatio, negRatio,
            std, autocorrelation, skewness, kurtosis,
            numPeaks, numValley, startPoint, endPoint];
        var featureSpecs = ["minAmp", "maxAmp", "meanAmp", "posAreaByThreshod", "poseAreaByThreshod",
            "minSlope", "maxSlope", "meanSlope",
            "crossZero", "posRatio", "negRatio",
            "std", "autocorrelation", "skewness", "kurtosis",
            "numPeaks", "numValley", "startPoint", "endPoint"];
        return { featureVec: featureVec, featureSpecs: featureSpecs };
    };
    Features.computeAutocorrelation = function (corr, mean, order) {
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
    };
    Features.computeStartEndPointsAngles = function (corrSeg, startEndPoints, max) {
        var startPoint = 0;
        var endPoint = 0;
        var startAngle = 0;
        var endAngle = 0;
        var length = corrSeg.length;
        if (startEndPoints.length == 0 && max != 0) {
            startPoint = 0;
            endPoint = length;
            startAngle = 0;
            endAngle = 0;
        }
        else if (startEndPoints.length == 1) {
            var positionTemp = startEndPoints[0].pos;
            if (startEndPoints[0].type == "start") {
                startPoint = positionTemp;
                endPoint = length;
                var angleTemp = numeric.atan([corrSeg[positionTemp + 1], 1]);
                startAngle = angleTemp[0];
                endAngle = 0;
            }
            else {
                startPoint = 0;
                endPoint = positionTemp;
                startAngle = 0;
                angleTemp = numeric.atan([corrSeg[positionTemp - 1], 1]);
                endAngle = angleTemp[0];
            }
        }
        else if (startEndPoints.length > 1) {
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
    };
    Features.computeSkewnessKurtosis = function (corrSeg, mean) {
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
    };
    Features.computeAreaDiff = function (refCorrSeg, targetCorrSeg) {
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
    };
    Features.localTrendCodingWindow = function (corrSeg) {
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
                if ((corrSeg[i - 1] > corrSeg[i]) && (corrSeg[i] > corrSeg[i + 1]))
                    codedCorr[i] = 1;
                else if ((corrSeg[i - 1] < corrSeg[i]) && (corrSeg[i] < corrSeg[i + 1]))
                    codedCorr[i] = 2;
                else if ((corrSeg[i - 1] >= corrSeg[i]) && (corrSeg[i] < corrSeg[i + 1]))
                    codedCorr[i] = 3;
                else if ((corrSeg[i - 1] < corrSeg[i]) && (corrSeg[i] >= corrSeg[i + 1]))
                    codedCorr[i] = 4;
                else if (((corrSeg[i - 1] == corrSeg[i]) && (corrSeg[i] == corrSeg[i + 1])) && corrSeg[i] != 0)
                    codedCorr[i] = 5;
                else if (((corrSeg[i - 1] == corrSeg[i]) && (corrSeg[i] == corrSeg[i + 1])) && corrSeg[i] == 0)
                    codedCorr[i] = 0;
                else
                    codedCorr[i] = 6;
            }
        }
        return codedCorr;
    };
    Features.calcPearsonsCorrelation = function (x, y) {
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
    };
    Features.computePairwiseFeatures = function (ref, target) {
        var sum = 0;
        sum = sum + this.computeAreaDiff(ref, target);
        var codedRef = this.localTrendCodingWindow(ref);
        var codedTarget = this.localTrendCodingWindow(target);
        sum = sum + (1 - this.libDistHamming(ref, target));
        if (numeric.sum(target) > 0) {
            sum = sum + (1 - this.calcPearsonsCorrelation(ref, target));
        }
        return sum;
    };
    Features.computeLBPfeatures = function (corrMat) {
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
    };
    Features.LBPthresholding = function (convertedVec) {
        var centerVal = convertedVec[4];
        var featureCode = [];
        var count = 0;
        var sum = 0;
        for (var i = 0; i < convertedVec.length; i++) {
            if (i == 4) {
                continue;
            }
            if (convertedVec[i] >= centerVal) {
                featureCode[count] = 1;
            }
            else {
                featureCode[count] = 0;
            }
            sum = sum + Math.pow(2, 8 - count) * featureCode[count];
            count++;
        }
        return sum;
    };
    Features.thresholding = function (vec, thresholds) {
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
                }
                else {
                    tempVec[i] = 0;
                    thresholdedVec[lenTemp + i] = 0;
                }
            }
            thresholdedMat[j] = tempVec;
        }
        return { matForm: thresholdedMat, vecForm: thresholdedVec };
    };
    Features.libNormalization = function (data, type) {
        var numLinks = data.length;
        var dimension = data[0].length;
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
    };
    Features.libDistMahalanobis = function (covMat, refCorr, targetCorr) {
        covMat = numeric.inv(covMat);
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
    };
    Features.libDistManhattan = function (refCorr, targetCorr) {
        var dist = 0;
        for (var i = 0; i < refCorr.length; i++) {
            dist = dist + Math.abs(refCorr[i] - targetCorr[i]);
        }
        return dist;
    };
    Features.libDistEuc = function (refCorr, targetCorr) {
        var sum = 0;
        for (var i = 0; i < refCorr.length; i++) {
            var diff = (refCorr[i] - targetCorr[i]);
            sum = sum + (diff * diff);
        }
        var dist = Math.sqrt(sum);
        return dist;
    };
    Features.libDistEucFusion = function (refCorr, targetCorr, featureSpecs) {
        var eucSum = 0;
        var startEndPointSum = 0;
        var pairwiseSum = 0;
        for (var i = 0; i < refCorr.length; i++) {
            var ref = refCorr[i];
            var target = targetCorr[i];
            var featureName = featureSpecs[i];
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
            else {
                var diff = refCorr[i] - targetCorr[i];
                eucSum = eucSum + (diff * diff);
            }
        }
        var dist = Math.sqrt(eucSum) + pairwiseSum + startEndPointSum;
        if (numeric.isNaN(dist) == true)
            dist = 0;
        return dist;
    };
    Features.libDistMultiDimEuc = function (refCorr, targetCorr, featureSpecs) {
        var sum = 0;
        for (var i = 0; i < refCorr.length; i++) {
            var ref = refCorr[i];
            var target = targetCorr[i];
            var featureName = featureSpecs[i];
            var diff = 0;
            if ((featureName == "endPoint") || (featureName == "startPoint")) {
                if (refCorr[i] == targetCorr[i]) {
                    diff = 0;
                }
                else {
                    diff = 1 + Math.abs(refCorr[i] - targetCorr[i]);
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
    };
    Features.libDistHamming = function (refCorrSeg, targetCorrSeg) {
        var hammingDist = 0;
        for (var j = 0; j < refCorrSeg.length; j++) {
            if (refCorrSeg[j] == targetCorrSeg[j]) {
                hammingDist++;
            }
        }
        return hammingDist / refCorrSeg.length;
    };
    Features.libDistCosine = function (refCorr, targetCorr) {
        var sqrt = d3.scale.sqrt();
        var sumRef = 0, sumTarget = 0, sumMul = 0;
        for (var i = 0; i < refCorr.length; i++) {
            sumRef = sumRef + (refCorr[i] * refCorr[i]);
            sumTarget = sumTarget + (targetCorr[i] * targetCorr[i]);
            sumMul = sumMul + (refCorr[i] * targetCorr[i]);
        }
        return 1 - (sumMul / (sqrt(sumRef) * sqrt(sumTarget)));
    };
    Features.libDistCorrelation = function (refCorr, targetCorr) {
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
    };
    Features.libDistProcrustes = function (refCorrSeg, targetCorrSeg) {
        var ref = [], target = [];
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
    };
    Features.libNumSimilarity = function (refCorr, targetCorr) {
        var sum = 0;
        for (var i = 0; i < refCorr.length; i++) {
            var numSim = 1 - (Math.abs(refCorr[i] - targetCorr[i]) / (Math.abs(refCorr[i]) + Math.abs(targetCorr[i])));
            sum = sum + (numSim * numSim);
        }
        sum = sum / refCorr.length;
        var sqrt = d3.scale.sqrt();
        return sqrt(sum);
    };
    Features.DTW_main = function (refCorrSeg, targetCorrSeg) {
        var weights = [];
        weights.push({ hor: 1, ver: 1, diag: 1 });
        var ref = [], target = [];
        for (var i = 0; i < refCorrSeg.length; i++) {
            ref[i] = [refCorrSeg[i]];
            target[i] = [targetCorrSeg[i]];
        }
        var pathMap = this.DTW_computePathMap(ref, target, weights);
        return 1 - pathMap[refCorrSeg.length - 1][targetCorrSeg.length - 1].min;
    };
    Features.DTW_computePathMap = function (refCorrSeg2D, targetCorrSeg2D, weights) {
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
                        if (min == hor)
                            path = 1;
                        else if (min == diag)
                            path = 2;
                        else if (min == ver)
                            path = 3;
                    }
                }
                pathMap[i][j] = ({ hor: hor, ver: ver, diag: diag, path: path, min: dist });
            }
        }
        return pathMap;
    };
    Features.mat2vec = function (corrMat, xCoordinates, yCoordinates) {
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
    };
    Features.computeMinMaxOfVector = function (vector) {
        var length = vector.length;
        var min = 1000000;
        var max = -1000000;
        for (var i = 0; i < length; i++) {
            if (vector[i] > max) {
                max = vector[i];
            }
            else if (vector[i] < min) {
                min = vector[i];
            }
        }
        var range = max - min;
        return { min: min, max: max, range: range };
    };
    Features.computeVectorMean = function (vector) {
        var length = vector.length;
        var mean = 0;
        for (var i = 0; i < length; i++) {
            mean = mean + vector[i];
        }
        return (mean / length);
    };
    Features.computeCovarianceMat = function (data) {
        var numLinks = data.length;
        var dataTranspose = numeric.transpose(data);
        var dimension = dataTranspose.length;
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
    };
    Features.computeStd = function (corrSeg, mean) {
        var sum = 0;
        var sqrt = d3.scale.sqrt();
        for (var i = 0; i < corrSeg.length; i++) {
            var diff = corrSeg[i] - mean;
            sum = sum + (diff * diff);
        }
        var temp = sum / corrSeg.length;
        return sqrt(temp);
    };
    Features.libTrace = function (Mat) {
        var row = Mat.length;
        var sum = 0;
        for (var r = 0; r < row; r++) {
            sum = sum + Mat[r][r];
        }
        return sum;
    };
    Features.libInnerProduct = function (Mat1, Mat2) {
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
    };
    Features.libTranspose = function (Mat) {
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
    };
    Features.libVecPlusMinus = function (vec1, vec2, type) {
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
    };
    Features.libMatPlusMinus = function (mat1, mat2, type) {
        var row = mat1.length;
        var col = mat1[0].length;
        var resultMat = [];
        for (var r = 0; r < row; r++) {
            resultMat[r] = [];
            for (var c = 0; c < col; c++) {
                if (type == "plus") {
                    resultMat[r][c] = mat1[r][c] + mat2[r][c];
                }
                else if (type == "minus") {
                    resultMat[r][c] = mat1[r][c] - mat2[r][c];
                }
            }
        }
        return resultMat;
    };
    return Features;
}());
var Clustering = (function () {
    function Clustering() {
    }
    Clustering.Kmeans = function (data, clusterNum, numIteration) {
        var clusters = [];
        var clusterPerLink = [];
        var linksPerCluster = [];
        for (var nIter = 0; nIter < numIteration; nIter++) {
            for (var i = 0; i < clusterNum; i++) {
                if (nIter == 0) {
                    clusters[i] = data[i];
                }
                else {
                    clusters[i] = Clustering.Kmeans_computeMean(data, linksPerCluster[i]);
                }
                linksPerCluster[i] = [];
            }
            var numClusterChanges = 0;
            for (var j = 0; j < data.length; j++) {
                var minSimilarity = 1000000;
                var closestCluster = null;
                if (nIter == 0)
                    clusterPerLink[j] = clusterNum + 1;
                for (var cIter = 0; cIter < clusterNum; cIter++) {
                    var similarity = Features.libDistEuc(data[j], clusters[cIter]);
                    if (minSimilarity > similarity) {
                        closestCluster = cIter;
                        minSimilarity = similarity;
                    }
                }
                if (clusterPerLink[j] != closestCluster)
                    numClusterChanges = numClusterChanges + 1;
                clusterPerLink[j] = closestCluster;
                var numSamples = linksPerCluster[closestCluster].length;
                linksPerCluster[closestCluster][numSamples] = j;
            }
            if (numClusterChanges == 0)
                break;
        }
        return linksPerCluster;
    };
    Clustering.Kmeans_computeMean = function (data, sampleIdx) {
        var clusterMeans = [];
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
        for (var j = 0; j < accumulatedData.length; j++) {
            if (accumulatedData[j] != 0)
                accumulatedData[j] = accumulatedData[j] / numSamples;
        }
        return accumulatedData;
    };
    Clustering.ascendSort = function (a, b) {
        return a.value - b.value;
    };
    Clustering.SC_main = function (data, clusterNum, kNN, SCtype) {
        console.log("spectral clustering");
        var A = [];
        var D = [];
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
                }
                else if (SCtype == "binary") {
                    A[i][dist[p].id] = 1;
                }
            }
        }
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
        var eigenVecVal = numeric.eig(L_norm);
        var eigenVals = [];
        for (var q = 0; q < L_norm.length; q++) {
            eigenVals.push({ id: q, value: eigenVecVal.lambda.x[q] });
        }
        eigenVals = eigenVals.sort(this.ascendSort);
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
    };
    Clustering.silhouetteMeasure = function (data, linksPerCluster) {
        var clusterNum = linksPerCluster.length;
        var coefficient = 0;
        var totalCount = 0;
        for (var i = 0; i < clusterNum; i++) {
            var samPerCluster = linksPerCluster[i];
            var samNum = samPerCluster.length;
            totalCount = totalCount + samNum;
            for (var j = 0; j < samNum; j++) {
                var samIdx1 = samPerCluster[j];
                var withinCluster = 0;
                for (var k = 0; k < samNum; k++) {
                    var samIdx2 = samPerCluster[k];
                    withinCluster = withinCluster + Features.libDistEuc(data[samIdx1], data[samIdx2]);
                }
                withinCluster = withinCluster / samNum;
                var betweenClusters = [];
                for (var c = 0; c < clusterNum; c++) {
                    if (c == i) {
                        betweenClusters[c] = 1000;
                        continue;
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
                var minBtwCluster = 100;
                for (var m = 0; m < betweenClusters.length; m++) {
                    if (minBtwCluster > betweenClusters[m]) {
                        minBtwCluster = betweenClusters[m];
                    }
                }
                if (withinCluster > minBtwCluster) {
                    coefficient = coefficient + ((minBtwCluster / withinCluster) - 1);
                }
                else if (withinCluster < minBtwCluster) {
                    coefficient = coefficient + (1 - (withinCluster / minBtwCluster));
                }
            }
        }
        coefficient = coefficient / totalCount;
        return coefficient;
    };
    return Clustering;
}());
var Sorting = (function () {
    function Sorting() {
    }
    Sorting.sortBySimilarity = function (data, referenceIndex, metric) {
        if (metric == null)
            metric = "euclideanFusion";
        var features = [];
        var featureSpecs = [];
        for (var i = 0; i < data.length; i++) {
            var featureTemp = Features.computeArithemeticFeatures(data[i]);
            features[i] = featureTemp.featureVec;
            if (i == referenceIndex) {
                featureSpecs = featureTemp.featureSpecs;
            }
        }
        features = Features.libNormalization(features, "minmax");
        if (metric == "euclideanMulti" || metric == "euclideanFusion") {
            var lastIdx = features[0].length;
            for (var i = 0; i < data.length; i++) {
                features[i][lastIdx] = data[i];
            }
            featureSpecs[lastIdx] = "rawData";
        }
        var min = 10000;
        var max = -10000;
        var score = 0;
        var scores = [];
        var covMat;
        for (var k = 0; k < features.length; k++) {
            if (metric == "manhattan") {
                score = Features.libDistManhattan(features[referenceIndex], features[k]);
            }
            else if (metric == "euclidean") {
                score = Features.libDistEuc(features[referenceIndex], features[k]);
            }
            else if (metric == "euclideanMulti") {
                score = Features.libDistMultiDimEuc(features[referenceIndex], features[k], featureSpecs);
            }
            else if (metric == "euclideanFusion") {
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
                score = Features.DTW_main(features[referenceIndex], features[k]);
            }
            else if (metric == "pearson") {
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
        var similarity = [];
        for (var i = 0; i < data.length; i++) {
            similarity[i] = 1 - ((scores[i] - min) / range);
        }
        return similarity;
    };
    return Sorting;
}());
var _this = this;
var COLOR_DEFAULT = new THREE.Color(0x000000);
var COLOR_HIGHLIGHT = new THREE.Color(0xff8800);
var OPACITY_DIM = .5;
var DURATION = 500;
var FONT_SIZE_NODE_LABEL = 11;
var NBounds = (function () {
    function NBounds(v1, v2) {
        this.x = v1;
        if (v2 == undefined)
            this.y = v1;
        else
            this.y = v2;
    }
    return NBounds;
}());
var width;
var height;
var urlVars = networkcube.getUrlVars();
if (urlVars['width'])
    this.width = parseInt(urlVars['width']);
else
    this.width = window.innerWidth - 30;
if (urlVars['height'])
    this.height = parseInt(urlVars['height']);
else
    this.height = window.innerHeight - 100;
console.log('>>>', width);
var plotMargin = new NBounds(80, 0);
var plotWidth = this.width - plotMargin.x * 2;
var plotHeight;
var HIGHT_ROW_DEFAULT = 20;
var rowHeight = HIGHT_ROW_DEFAULT;
var rowSpacing = 0;
var dgraph = networkcube.getDynamicGraph();
var startTime = dgraph.startTime;
var endTime = dgraph.endTime;
var startTimeZoom = dgraph.startTime;
var endTimeZoom = dgraph.endTime;
plotHeight = rowHeight * dgraph.links().length;
height = plotHeight;
networkcube.setDefaultEventListener(updateEvent);
networkcube.addEventListener('timeRange', timeRangeHandler);
$('#dataName').text(dgraph.name);
var timeSvg = d3.select('#timelineDiv')
    .append('svg')
    .attr('width', width)
    .attr('height', 50);
var timeSlider = new TimeSlider(dgraph, plotWidth + 45);
timeSlider.appendTo(timeSvg, plotMargin.x - 10, 0);
timeSvg.append('text')
    .text('Time Range:')
    .attr('x', 0)
    .attr('y', 35)
    .style('font-family', 'Helvetica')
    .style('opacity', 0.5)
    .style('font-size', '10pt');
var timeSvg2 = d3.select('#timelineDiv')
    .append('svg')
    .attr('width', width)
    .attr('height', 50);
var timeZoomSlider = new TimeSlider(dgraph, plotWidth + 45, timezoomCallback);
timeZoomSlider.appendTo(timeSvg2, plotMargin.x - 10, 0);
timeSvg2.append('text')
    .text('Time Zoom:')
    .attr('x', 0)
    .attr('y', 35)
    .style('font-family', 'Helvetica')
    .style('opacity', 0.5)
    .style('font-size', '10pt');
var linkWeightScale = d3.scale.linear().range([0, (rowHeight - rowSpacing) / 2]);
var svg = d3.select('#visSvg')
    .attr('width', width)
    .attr('height', height);
var order = [];
var rank = [];
for (var i = 0; i < dgraph.links().length; i++) {
    order[i] = { id: i, value: i };
    rank[i] = i;
}
var visibleRank;
sortBySimilarity(4);
var rows = svg.selectAll('.row')
    .data(dgraph.links().toArray())
    .enter()
    .append('g')
    .attr('class', 'row')
    .attr('transform', function (d, i) {
    return 'translate(0, ' + (plotMargin.y + rowHeight * (visibleRank[i] + .6)) + ')';
});
rows.append('text')
    .datum(function (d) { return d.source; })
    .attr('class', 'labelsLeft nodeLabel')
    .attr('text-anchor', 'end')
    .text(function (d, i) { return d.label(); })
    .attr('x', plotMargin.x - 10)
    .on('mouseover', function (d, i) {
    networkcube.highlight('set', { nodes: [d] });
})
    .on('mouseout', function (d, i) {
    networkcube.highlight('reset');
})
    .on('click', function (d, i) {
    if (!d.isSelected()) {
        networkcube.selection('add', { nodes: [d] });
    }
    else {
        var selections = d.getSelections();
        var currentSelection = _this.dgraph.getCurrentSelection();
        for (var j = 0; j < selections.length; j++) {
            if (selections[j] == currentSelection) {
                networkcube.selection('remove', { nodes: [d] });
                return;
            }
        }
        networkcube.selection('add', { nodes: [d] });
    }
})
    .style('font-size', FONT_SIZE_NODE_LABEL);
rows.append('text')
    .datum(function (d) { return d.target; })
    .attr('class', 'labelsRight nodeLabel')
    .attr('text-anchor', 'start')
    .text(function (d, i) { return d.label(); })
    .attr('x', plotMargin.x + plotWidth + 10)
    .on('mouseover', function (d, i) {
    networkcube.highlight('set', { nodes: [d] });
})
    .on('mouseout', function (d, i) {
    networkcube.highlight('reset');
})
    .on('click', function (d, i) {
    var selections = d.getSelections();
    var currentSelection = _this.dgraph.getCurrentSelection();
    for (var j = 0; j < selections.length; j++) {
        if (selections[j] == currentSelection) {
            networkcube.selection('remove', { nodes: [d] });
            return;
        }
    }
    networkcube.selection('add', { nodes: [d] });
})
    .style('font-size', FONT_SIZE_NODE_LABEL);
var scene;
var camera;
var renderer;
var geometry;
var mesh;
var attributes = {
    customColor: { type: 'c', value: [] }
};
var shaderMaterial = new THREE.ShaderMaterial({
    attributes: attributes,
    vertexShader: document.getElementById('vertexshader').textContent,
    fragmentShader: document.getElementById('fragmentshader').textContent,
    blending: THREE.NormalBlending,
    depthTest: true,
    transparent: true,
    side: THREE.DoubleSide,
    linewidth: 2
});
var scene = new THREE.Scene();
var camera = new THREE.OrthographicCamera(plotWidth / -2, plotWidth / 2, plotHeight / 2, plotHeight / -2, 0, 11);
scene.add(camera);
camera.position.x = plotWidth / 2;
camera.position.y = -plotHeight / 2;
camera.position.z = 10;
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(plotWidth, plotHeight);
renderer.setClearColor(0xffffff, 1);
var canvas = renderer.domElement;
canvas.width = plotWidth;
canvas.height = plotHeight;
canvas.addEventListener('mousemove', function (e) { _this.mouseMove(e); });
canvas.addEventListener('click', click);
$('#visCanvasFO').append(canvas);
d3.select('#visCanvasFO')
    .attr('x', plotMargin.x)
    .attr('y', plotMargin.y)
    .attr('width', plotWidth)
    .attr('height', plotHeight);
var vertexColors = [];
var material = new THREE.LineBasicMaterial({ color: 0x000000 });
var WaveShape = (function () {
    function WaveShape() {
    }
    return WaveShape;
}());
var waveShapes = [];
var stepWidth;
var stretchFactorX = 1;
var stretchFactorY = 1;
var waveHighlightFrames = [];
var waveSelectionFrames = [];
var rectLength = plotWidth;
var dimLayerLeft = new THREE.Shape();
dimLayerLeft.moveTo(0, 0);
dimLayerLeft.lineTo(0, -plotHeight);
dimLayerLeft.lineTo(-rectLength, -plotHeight);
dimLayerLeft.lineTo(-rectLength, 0);
dimLayerLeft.lineTo(0, 0);
var rectGeomLeft = new THREE.ShapeGeometry(dimLayerLeft);
var rectMeshLeft = new THREE.Mesh(rectGeomLeft, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true }));
rectMeshLeft.position.set(0, 0, 1);
rectMeshLeft.material.opacity = OPACITY_DIM;
scene.add(rectMeshLeft);
var dimLayerRight = new THREE.Shape();
dimLayerRight.moveTo(0, 0);
dimLayerRight.lineTo(0, -plotHeight);
dimLayerRight.lineTo(rectLength, -plotHeight);
dimLayerRight.lineTo(rectLength, 0);
dimLayerRight.lineTo(0, 0);
var rectGeomRight = new THREE.ShapeGeometry(dimLayerRight);
var rectMeshRight = new THREE.Mesh(rectGeomRight, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true }));
rectMeshRight.position.set(plotWidth, 0, 1);
rectMeshRight.material.opacity = OPACITY_DIM;
scene.add(rectMeshRight);
update();
function update() {
    updateLinkGeometry();
    updateLinks();
    updateNodes();
    render();
}
function updateLinkGeometry() {
    var splineObject;
    var pointsPositiveTop;
    var pointsNegativeTop;
    var pointsPositiveBottom;
    var pointsNegativeBottom;
    var link;
    var weights;
    var waveShape;
    stepWidth = plotWidth / (endTime.id() - startTime.id());
    linkWeightScale.domain([0, Math.max(dgraph.links().weights().max(), dgraph.links().weights().min())]);
    for (var i = 0; i < waveShapes.length; i++) {
        if (waveShapes[i].positive)
            scene.remove(waveShapes[i].positive);
        if (waveShapes[i].negative)
            scene.remove(waveShapes[i].negative);
    }
    waveShapes = [];
    var isPositive;
    for (var i = 0; i < dgraph.links().length; i++) {
        link = dgraph.link(order[i].id);
        weights = link.weights(startTime, endTime).toArray();
        pointsPositiveTop = [];
        pointsNegativeTop = [];
        pointsPositiveBottom = [];
        pointsNegativeBottom = [];
        isPositive = weights[0] >= 0;
        waveShape = new WaveShape();
        waveShapes.push(waveShape);
        pointsNegativeTop.push(new THREE.Vector2(0, 0));
        pointsNegativeBottom.push(new THREE.Vector2(0, 0));
        pointsPositiveTop.push(new THREE.Vector2(0, 0));
        pointsPositiveBottom.push(new THREE.Vector2(0, 0));
        for (var j = 0; j < weights.length; j++) {
            if (weights[j] == undefined) {
                weights[j] = 0.1;
            }
            if (weights[j] >= 0 != isPositive) {
                pointsNegativeTop.push(new THREE.Vector2(stepWidth * (j - 1), 0));
                pointsNegativeBottom.push(new THREE.Vector2(stepWidth * (j - 1), 0));
                pointsPositiveTop.push(new THREE.Vector2(stepWidth * (j - 1), 0));
                pointsPositiveBottom.push(new THREE.Vector2(stepWidth * (j - 1), 0));
                isPositive = weights[j] >= 0;
            }
            if (weights[j] >= 0) {
                pointsPositiveTop.push(new THREE.Vector2(stepWidth * j, linkWeightScale(weights[j])));
                pointsPositiveBottom.push(new THREE.Vector2(stepWidth * j, -linkWeightScale(weights[j])));
            }
            else {
                pointsNegativeTop.push(new THREE.Vector2(stepWidth * j, linkWeightScale(-weights[j])));
                pointsNegativeBottom.push(new THREE.Vector2(stepWidth * j, -linkWeightScale(-weights[j])));
            }
        }
        pointsNegativeTop.push(new THREE.Vector2(stepWidth * j, 0));
        pointsNegativeBottom.push(new THREE.Vector2(stepWidth * j, 0));
        pointsPositiveTop.push(new THREE.Vector2(stepWidth * j, 0));
        pointsPositiveBottom.push(new THREE.Vector2(stepWidth * j, 0));
        if (pointsNegativeTop.length > 0) {
            var curve = new THREE.SplineCurve(pointsNegativeTop.concat(pointsNegativeBottom.reverse()));
            var path = new THREE.Path(curve.points);
            var geometry = path.createPointsGeometry();
            var material = new THREE.LineBasicMaterial({ color: COLOR_DEFAULT.getHex() });
            splineObject = new THREE.Line(geometry, material);
            waveShape.negative = splineObject;
            this.scene.add(splineObject);
        }
        if (pointsPositiveTop.length > 0) {
            var curve = new THREE.SplineCurve(pointsPositiveTop);
            var shape = new THREE.Shape(curve.points);
            var geometry = new THREE.ShapeGeometry(shape);
            mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: COLOR_DEFAULT.getHex() }));
            curve = new THREE.SplineCurve(pointsPositiveBottom);
            shape = new THREE.Shape(curve.points);
            var geometry2 = new THREE.ShapeGeometry(shape);
            geometry.merge(geometry2);
            mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: COLOR_DEFAULT.getHex() }));
            waveShape.positive = mesh;
            this.scene.add(mesh);
        }
    }
}
var transition;
function updateLinks() {
    var links = dgraph.links().toArray();
    var l;
    var j;
    transition = new animations.Transition(render);
    var color;
    var selections;
    for (var i = 0; i < links.length; i++) {
        l = links[i];
        if (!l.isVisible()
            || !l.source.isVisible()
            || !l.target.isVisible()) {
            if (waveShapes[l.id()].positive && waveShapes[l.id()].positive.material.opacity > 0) {
                transition.add(new animations.OpacityAnimation(waveShapes[l.id()].positive, 0, DURATION));
            }
            if (waveShapes[l.id()].negative && waveShapes[l.id()].negative.material.opacity > 0) {
                transition.add(new animations.OpacityAnimation(waveShapes[l.id()].negative, 0, DURATION));
            }
            continue;
        }
        if (waveShapes[l.id()].positive && waveShapes[l.id()].positive.material.opacity == 0) {
            transition.add(new animations.OpacityAnimation(waveShapes[l.id()].positive, 1, DURATION));
        }
        if (waveShapes[l.id()].negative && waveShapes[l.id()].negative.material.opacity == 0) {
            transition.add(new animations.OpacityAnimation(waveShapes[l.id()].negative, 1, DURATION));
        }
        color = undefined;
        if (l.isHighlighted()) {
            color = COLOR_HIGHLIGHT.getStyle();
        }
        else if (l.isSelected()) {
            color = networkcube.getPriorityColor(l);
        }
        if (!color)
            color = COLOR_DEFAULT.getHex();
        if (waveShapes[l.id()].positive) {
            waveShapes[l.id()].positive.material.color = new THREE.Color(color);
        }
        if (waveShapes[l.id()].negative) {
            waveShapes[l.id()].negative.material.color = new THREE.Color(color);
        }
        if (waveShapes[l.id()].positive) {
            transition.add(new animations.TranslationAnimation(waveShapes[l.id()].positive, waveShapes[l.id()].positive.position.x, -(rowHeight * visibleRank[l.id()] + rowHeight / 2), DURATION));
        }
        if (waveShapes[l.id()].negative) {
            transition.add(new animations.TranslationAnimation(waveShapes[l.id()].negative, waveShapes[l.id()].negative.position.x, -(rowHeight * visibleRank[l.id()] + rowHeight / 2), DURATION));
        }
    }
    transition.start();
    d3.selectAll('.row')
        .attr('transform', function (d, i) {
        var pos_i = visibleRank[d.id()];
        if (pos_i > -1)
            return 'translate(0, ' + (plotMargin.y + rowHeight * (pos_i + .5) + 6) + ')';
        return 'translate(0, -100)';
    });
}
function updateNodes() {
    var color;
    var size;
    var n;
    d3.selectAll('.nodeLabel')
        .style('fill', function (d) {
        color = undefined;
        if (d.isHighlighted()) {
            color = COLOR_HIGHLIGHT.getStyle();
        }
        else if (d.isSelected()) {
            color = networkcube.getPriorityColor(d);
        }
        if (!color)
            color = COLOR_DEFAULT.getStyle();
        return color;
    })
        .style('font-size', function (d) {
        if (d.isHighlighted()) {
            size = 13;
        }
        else {
            size = 10;
        }
        return size;
    });
}
function render() {
    renderer.render(scene, camera);
}
var orderTimer;
function updateRowHeight() {
    rowHeight = parseInt(document.getElementById("rowHeightInput").value);
    stretchFactorY = rowHeight / HIGHT_ROW_DEFAULT;
    for (var i = 0; i < waveShapes.length; i++) {
        if (waveShapes[i].positive) {
            waveShapes[i].positive.scale.y = stretchFactorY;
            waveShapes[i].positive.position.y = -rowHeight * visibleRank[i] - rowHeight / 2;
        }
        if (waveShapes[i].negative) {
            waveShapes[i].negative.scale.y = stretchFactorY;
            waveShapes[i].negative.position.y = -rowHeight * visibleRank[i] - rowHeight / 2;
        }
    }
    render();
    d3.selectAll('.row')
        .attr('transform', function (d, i) {
        return 'translate(0, ' + (plotMargin.y + rowHeight * (visibleRank[i] + .5) + 6) + ')';
    });
}
function updateRowOrdering() {
    var _this = this;
    clearTimeout(this.orderTimer);
    this.orderTimer = setTimeout(function (e) {
        console.log("sort");
        sortBySimilarity(4);
        updateLinks();
        render();
        _this.orderTimer = null;
    }, 500);
}
function dscsort(a, b) {
    return b.value - a.value;
}
function ascsort(a, b) {
    return a.value - b.value;
}
function sortBySimilarity(referenceIndex) {
    var data = [];
    for (var i = 0; i < dgraph.links().length; i++) {
        var link = dgraph.link(i);
        data[i] = link.weights(startTime, endTime).toArray();
    }
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
            if (!data[i][j] || data[i][j] == undefined)
                data[i][j] = 0;
        }
    }
    var similarity = Sorting.sortBySimilarity(data, referenceIndex, "euclidean");
    for (var i = 0; i < order.length; i++) {
        order[i].value = similarity[order[i].id];
    }
    order.sort(this.dscsort);
    var str = "";
    for (var i = 0; i < order.length; i++) {
        rank[order[i].id] = i;
        str += order[i].id + ' ';
    }
    updateVisibleRank();
}
function updateVisibleRank() {
    var link;
    var orderedLinks = dgraph.links().toArray().slice(0, dgraph.links().length);
    orderedLinks.sort(byRank);
    visibleRank = networkcube.array(-1, orderedLinks.length);
    var visibleRankCount = 0;
    for (var i = 0; i < orderedLinks.length; i++) {
        link = orderedLinks[i];
        if (link.isVisible() && link.source.isVisible() && link.target.isVisible()) {
            visibleRank[link.id()] = visibleRankCount++;
        }
    }
}
function timezoomCallback(min, max, single, propagate) {
    stretchFactorX = dgraph.times().length / (endTimeZoom.id() - startTimeZoom.id());
    if ((endTimeZoom.id() - startTimeZoom.id()) != (max.id() - min.id())) {
        for (var i = 0; i < waveShapes.length; i++) {
            if (waveShapes[i].positive)
                waveShapes[i].positive.scale.x = stretchFactorX;
            if (waveShapes[i].negative)
                waveShapes[i].negative.scale.x = stretchFactorX;
        }
    }
    camera.position.x = plotWidth / 2 + (min.id() * stepWidth * stretchFactorX);
    startTimeZoom = min;
    endTimeZoom = max;
    render();
    updateRowOrdering();
    updateTimeSelection();
    timeZoomSlider.set(startTimeZoom, endTimeZoom);
}
function updateTimeSelection() {
    rectMeshLeft.position.x = (plotWidth / dgraph.times().length) * startTime.id() * stretchFactorX;
    rectMeshLeft.scale.x = stretchFactorX;
    rectMeshRight.position.x = (plotWidth / dgraph.times().length) * endTime.id() * stretchFactorX;
    rectMeshRight.scale.x = stretchFactorX;
}
function updateEvent(m) {
    if (m.type == 'filter' || m.type == 'selectionFilter') {
        updateVisibleRank();
    }
    updateLinks();
    updateNodes();
    render();
}
function timeRangeHandler(m) {
    startTime = dgraph.time(m.startId);
    endTime = dgraph.time(m.endId);
    timeSlider.set(startTime, endTime);
    updateTimeSelection();
    updateRowOrdering();
    render();
}
var hoveredLink;
var lastClickMoment = window.performance.now();
function mouseMove(e) {
    if (window.performance.now() - lastClickMoment < 400) {
        return;
    }
    hoveredLink = undefined;
    var mpos = glutils.getMousePos(canvas, e.clientX, e.clientY);
    var hoveredLinkId = visibleRank.indexOf(Math.floor(mpos.y / rowHeight));
    if (dgraph.link(hoveredLinkId)) {
        hoveredLink = dgraph.link(hoveredLinkId);
        networkcube.highlight('set', {
            links: [hoveredLink],
        });
    }
    else {
        networkcube.highlight('reset');
    }
}
function click(e) {
    lastClickMoment = window.performance.now();
    if (hoveredLink) {
        if (!hoveredLink.isSelected(dgraph.getCurrentSelection())) {
            console.log('adding to selection', hoveredLink.source.label(), hoveredLink.target.label());
            networkcube.selection('add', { links: [hoveredLink] });
        }
        else {
            networkcube.selection('remove', { links: [hoveredLink] });
        }
    }
}
function byRank(a, b) {
    return rank[a.id()] - rank[b.id()];
}

//# sourceMappingURL=linkwave.js.map
