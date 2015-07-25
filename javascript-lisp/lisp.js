'use strict'

function tokenize (chars) {
  // put white space between the brackets so we can easiy split them up
  var chars = chars.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ');
  
  // split up into tokens. the filter method just removes the empty strings
  var tokens = chars.split(/[\s]+/).filter(function(el) {return el.length != 0});
  return tokens;
}

function readFromTokens(tokens) {
  //  numbers and decimals turn to Numbers, everything else is a string
  var token = tokens.shift()
  if (token === '(') {
    var L = [];
    while (tokens[0] != ')') {
      L.push(readFromTokens(tokens));
    }
    tokens.shift(); // remove the ')'
    return L;
  } else {
    return atom(token);
  }

}

// used to check if the string contains only numbers
function isNumeric(s) {
  return !isNaN(parseFloat(s)) && isFinite(s);
}

function atom(token) {
  if (isNumeric(token)) {
    return parseFloat(token);
  } else {
    return token;
  }
}

function pack(parms, args) {
    var i;
    var kv = {};
    for (i=0; i<args.length; i++) {
        kv[parms[i]] = args[i];
    }
    return kv;
}

// function Procedure(parms, body, env) {
//     this.parms = parms;
//     this.body = body;
//     this.env = env;
//     this.call = function(args) {
//         var i;
//         var kv = {};
//         for (i=0; i<args.length; i++) {
//             kv[this.parms[i]] = args[i];
//         }
//         console.log(args);
//         return eval_(this.body, new Env(kv, this.env));
//     }
// }

function Procedure(parms, body, env) {
    parms = parms;
    body = body;
    env = env;
    return function(args) {
        var kv = pack(parms, args);
        return eval_(body, new Env(kv, env));
    }
}

  
function Env(kv, outer) {
  this.outer = outer;
  for (var key in kv) {
    this[key] = kv[key];
  }
}

Env.prototype.find = function(key) {
    console.log(key);
    if (this[key]) {
        return this;
    } else {
        return this.outer.find(key);
    }
}

var global_env = new Env({
  '+': add,
  '-': minus,
  '/': divide,
  '*': mult,
});

//var test_env = new Env({'foo': 'bar'}, global_env);
//console.log(test_env.find('+')['+']);


function eval_(x, env) {
    if (typeof x == 'string') {
        return env.find(x)[x];

    } else if (x.constructor != Array) {
        console.log(env);
        console.log('in here');
        return x;

    } else if (x[0] == 'define') {
        var variable = x[1];
        var exp = x[2];
        env[variable] = eval_(exp, env);
        console.log(env);
    } else if (x[0] == 'lambda') {
        var parms = x[1];
        var body = x[2];
        return new Procedure(parms, body, env);
    } else {
        var proc = eval_(x[0], env);
        var args = [];
        for (var i=1; i<x.length; i++) {
            var arg = eval_(x[i], env);
            args.push(arg);
        }
        return proc(args);
    }
}

function run(program) {
    var tokens = tokenize(program);
    var expr = readFromTokens(tokens);
    return eval_(expr, global_env);
}

// var program = "(begin (define r 10) (* 3.1416 (* r r)))";
// var program = "(+ 3 (+ 5 5))"
// var tokens = tokenize(program)
// var expr = readFromTokens(tokens);
// 
// var result = eval_(expr, env);
// console.log(result);
