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
  

var env = {
  '+': add,
  '-': minus,
  '/': divide,
  '*': mult,
}

function eval_(x, env) {
    if (typeof x == 'string') {
        return env[x];

    } else if (x.constructor != Array) {
        return x;

    } else {
        var proc = eval_(x[0], env);
        var args = [];
        for (var i=1; i<x.length; i++) {
            var arg = eval_(x[i], env);
            args.push(arg);
        }
        return proc(args[0], args[1]);
    }
}

function run(program) {
    var tokens = tokenize(program);
    var expr = readFromTokens(tokens);
    return eval_(expr, env);
}

// var program = "(begin (define r 10) (* 3.1416 (* r r)))";
// var program = "(+ 3 (+ 5 5))"
// var tokens = tokenize(program)
// var expr = readFromTokens(tokens);
// 
// var result = eval_(expr, env);
// console.log(result);
