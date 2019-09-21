// * Inputs for the Neural Net (p)
var inputs = [[1, -1 -1], [1, 1, -1]];

// * Vars for the weights (w)
var weights = [0.5, -1, -0.5];

// * Variable for the targets (t)
var target = [0, 1];

// * Neural outputs (a)
var neuralOutput = [0];

// * Perceptron output (n)
var perceptronOutput = [0];

// * Need to store the weighted sums
var weightedSum = [];

// * The bias to make the weighted sum a bias
var bias = 0.5; 

// * Log the error rate (er)
var error = 0;

// * Log the epochs
var epoch = 0;

// * While the error doesn't equal 1...
while(error != 1){
    // * Increase the epochs, as we'll be passing through the neural network
    epoch = epoch + 1;
    for(let i = 0; i < target.length; i++){
        error = target[i] - neuralOutput[i];
    }

};

function calculateWeightedSum(inputs, weights, bias){
    for(let i = 0; i < 2; i++){
        var c = 0;

        for(let iTwo = 0; i < 3; i++){
            var w = weights[i];
            var p = inputs[i[iTwo]];
            console.log("Weights from the loop: "+ w);
            console.log("Inputs from the loop"+ p);
        }
    }
}

// * Activation function
// * For this we're using the Hard Limit function (hardlim)
    // ? For this function, if an input is less than 0, the output will be 0
    // ? If an input is greater than 0, the output will be 1
function applyActivationFunction(weightedSum) {
    if(weightedSum < 0){
        return 0
    }
    return 1
}


