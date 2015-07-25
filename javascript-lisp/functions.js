// all the paramaters are going to be Arrays

function add(args) {
    var head = args[0];
    if (args.length == 1) {
        return head;
    }
    return head + add(args.slice(1, args.length));
}

function minus(args) {
    var ans = args[0];
    var i = 1;
    for (i; i<args.length; i++) {
        ans -= args[i];
    }
    return ans;
}

function divide(args) {
    var ans = args[0];
    var i = 1;
    for (i; i<args.length; i++) {
        ans /= args[i];
    }
    return ans;
}

function mult(args) {
    var ans = args[0];
    var i = 1;
    for (i; i<args.length; i++) {
        ans *= args[i];
    }
    return ans;
}
