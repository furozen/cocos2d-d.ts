/// <reference path="../../../index.d.ts" />

declare namespace ccs {
  /**
   * Parsed out object from studio JSON file
   */
  export class Loadable {
    node: mz.Node;
    action: ccs.ActionTimeline;
  }

  /**
   * Analysis of studio JSON file
   * The incoming file name, parse out the corresponding object
   * Temporary support file list:
   *   ui 1.*
   *   node 1.* - 2.*
   *   action 1.* - 2.*
   *   scene 0.* - 1.*
   * @param {string} file
   * @param {string} [path=] Resource path
   * @returns {{node: cc.Node, action: cc.Action}}
   */
  export function load(file: string, path?: string): Loadable;

  /**
   * Analysis of studio JSON file and layout ui widgets by visible size.
   * The incoming file name, parse out the corresponding object
   * Temporary support file list:
   *   ui 1.*
   *   node 1.* - 2.*
   *   action 1.* - 2.*
   *   scene 0.* - 1.*
   * @param {string} file
   * @param {string} [path=] Resource path
   * @returns {{node: cc.Node, action: cc.Action}}
   */
  export function loadWithVisibleSize(file: string, path?: string): Loadable;
}
