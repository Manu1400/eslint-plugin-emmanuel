import {expectType} from 'tsd';
import {parse} from 'reflect-type-3';
//const {parse} = require('reflect-type-3');


parse(/[ab]+/.source)
parse(3333)
expectType(parse(/[ab]+/.source));

expectType<number>(parse(/[ab]+/.source));
expectType<string>(parse(/[ab]+/.source));
expectType<RegExp>(/[ab]+/);
expectType<string>(/[ab]+/);
expectType<PageTransitionEvent>(parse('...'));