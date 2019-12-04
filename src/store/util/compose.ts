
// const funcs = [f1, f2, f3, f4]
//
// 0 - a = f1
// 1 - a = function f11 (...args){ return f1(req, f2(...args))}
// 2 - a = function f21 (...args){return f11(req, f3(...args))}
// 3 - a = function f31 (...args){return f21(req, f4(...args))}

const compose = (funcs, req) => {
    const fn = funcs.reduce(function (a, b) {
        return function (...args) {
            return a(req, b(...args));
        }
    });

    return fn;
};

export default compose;


// const funcs = [f1, f2, f3]
//
// 0 - a = f1
// 1 - a = function f11 (...args){ return f1(req, f2(...args))}
// 2 - a = function f21 (...args){return f11(req, f3(...args))}


// f21(req, next);
// f11(req, f311)
// f1