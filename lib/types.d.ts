import eslint from 'eslint';
import estree from 'estree';

declare global {
  interface ASTNode extends estree.BaseNode {
    [_: string]: any; // TODO: fixme
  }
  type Scope = eslint.Scope.Scope;
  type Token = eslint.AST.Token;
  type Fixer = eslint.Rule.RuleFixer;
  type JSXAttribute = ASTNode;
  //type JSXSpreadAttribute = ASTNode;

  // or extends eslint.RuleContext
  interface RuleContext extends eslint.SourceCode {
    getFilename(): string;
    getFirstTokens(node: estree.Node | ASTNode, options?: eslint.SourceCode.CursorWithCountOptions): eslint.AST.Token[];
    report(descriptor: eslint.Rule.ReportDescriptor): void;
    getSourceCode(): any; // eslint.SourceCode
    getScope(): eslint.Scope.Scope;
    getAncestors(): estree.Node[];
    options?: Object;
  }

  interface Context {
    id: string;
    options: any[];
    settings: { [name: string]: any };
    parserPath: string;
    parserOptions: eslint.Linter.ParserOptions;
    parserServices: eslint.SourceCode.ParserServices;
    getAncestors(): estree.Node[];
    getDeclaredVariables(node: estree.Node): eslint.Scope.Variable[];
    getFilename(): string;
    getScope(): eslint.Scope.Scope;
    getSourceCode(): eslint.SourceCode;
    markVariableAsUsed(name: string): boolean;
    report(descriptor: eslint.Rule.ReportDescriptor): void;
}

  interface ImportDeclaration extends estree.ImportDeclaration {
  }
  // TODO: add .callee.name
  type CallExpression = estree.CallExpression
  type Identifier = estree.Identifier
  type BinaryExpression = estree.BinaryExpression
  type FunctionDeclaration = estree.FunctionDeclaration
  type FunctionExpression = estree.FunctionExpression
  type AssignmentPattern = estree.AssignmentPattern
  type ForStatement = estree.ForStatement
  type Literal = estree.Literal
  type WhileStatement = estree.WhileStatement
  type DoWhileStatement = estree.DoWhileStatement
  type VariableDeclarator = estree.VariableDeclarator
  type ConditionalExpression = estree.ConditionalExpression
  type UnaryExpression = estree.UnaryExpression
  type NewExpression = estree.NewExpression
  type Property = estree.Property & {
    key: {value?: string, name?: string}, 
    value: {raw?: string, name?: string}
  }
  type MemberExpression = estree.MemberExpression
  type ClassDeclaration = estree.ClassDeclaration
  type ArrayExpression = estree.ArrayExpression
  //type Pattern = estree.Pattern
  type RegExpLiteral = estree.RegExpLiteral
  
  //interface SimpleLiteral extends estree.SimpleLiteral {
    //value:number
  //}
  interface SimpleLiteral extends estree.BaseNodeWithoutComments {
    type: any;
    value?: string | boolean | number | null | RegExp;
    raw?: string;
    //[Symbol.iterator](): IterableIterator<any>;
  }

  interface RuleModule extends eslint.Rule.RuleModule {
  }

  type RuleMetaData = eslint.Rule.RuleMetaData
  type Schema = RuleMetaData["schema"]
  type Fixable = RuleMetaData["fixable"]

  type TypeDeclarationBuilder = (annotation: ASTNode, parentName: string, seen: Set<typeof annotation>) => object;

  type TypeDeclarationBuilders = {
    [k in string]: TypeDeclarationBuilder;
  };

  type UnionTypeDefinitionChildren = unknown[];
  type UnionTypeDefinition = {
    type: 'union' | 'shape';
    children: UnionTypeDefinitionChildren | true;
  };
}