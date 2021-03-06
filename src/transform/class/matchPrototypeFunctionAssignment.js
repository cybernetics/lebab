import {matchesAst, extract} from '../../utils/matchesAst';
import isTransformableToMethod from './isTransformableToMethod';

/**
 * Matches: <className>.prototype.<methodName> = function () { ... }
 *
 * When node matches returns the extracted fields:
 *
 * - className
 * - methodName
 * - methodNode
 *
 * @param  {Object} node
 * @return {Object}
 */
export default matchesAst({
  type: 'ExpressionStatement',
  expression: {
    type: 'AssignmentExpression',
    left: {
      type: 'MemberExpression',
      computed: false,
      object: {
        type: 'MemberExpression',
        computed: false,
        object: {
          type: 'Identifier',
          name: extract('className')
        },
        property: {
          type: 'Identifier',
          name: 'prototype'
        },
      },
      property: {
        type: 'Identifier',
        name: extract('methodName')
      }
    },
    operator: '=',
    right: extract('methodNode', isTransformableToMethod)
  }
});
