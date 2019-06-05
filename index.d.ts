/// <reference path="extensions/ccui/Widget.d.ts" />
/// <reference path="extensions/ccui/Button.d.ts" />
/// <reference path="extensions/cocosstudio/components/CCComponent.d.ts" />
/// <reference path="extensions/cocosstudio/loader/load.d.ts" />
/// <reference path="extensions/cocosstudio/timeline/ActionTimeline.d.ts" />
/// <reference path="extensions/cocosstudio/timeline/Frame.d.ts" />
/// <reference path="extensions/cocosstudio/timeline/Timeline.d.ts" />
/// <reference path="particle/CCParticleSystem.d.ts" />

/**
 * Based upon
 * https://github.com/jamma/cocos2d-typescript-definitions
 * And then edited slightly
 */

/* tslint:disable:unified-signatures no-consecutive-blank-lines class-name adjacent-overload-signatures interface-name max-line-length no-empty-interface no-namespace */

declare type CallFuncCallback = (targetOrData?: any, data?: any) => any;
declare type ccMenuItemCallback = (mi: mz.Node) => void;

// TODO: Figure out what's going on here. In lib.d.ts, this declaration exists:
//          declare var Image: {new(width?: number, height?: number): HTMLImageElement; };
//       What exactly does the declare var mean, and why it is not resolved below by TextureAtlas::get/setTexture?
//       Does that mean the DefinitelyTyped file is set up improperly? Or am I somehow using it incorrectly?

interface Image extends HTMLImageElement {}

declare namespace cc {
  /**
   * The element contains the game canvas
   * @type {HTMLDivElement}
   */
  export const container: HTMLDivElement;

  // +--------------------------------------------------------------------------------
  // + File: cocos2d/core/base-nodes/CCAction.js
  // +--------------------------------------------------------------------------------

  /** Default Action tag
   * @constant
   * @type {Number}
   * @default
   */
  export const ACTION_TAG_INVALID: number;

  /**
   * Base class for Action objects.
   * @class
   *
   * @extends Class
   *
   * @property {Node}  target          - The target will be set with the 'startWithTarget' method. When the 'stop' method is called, target will be set to nil.
   * @property {Node}  originalTarget  - The original target of the action.
   * @property {Number}   tag             - The tag of the action, can be used to find the action.
   */
  export class Action extends Class {
    public originalTarget: Node;
    public target: Node;
    public tag: number;

    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     */
    public ctor(): void;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @return {Action}
     */
    public clone(): Action;

    /**
     * return true if the action has finished.
     *
     * @return {Boolean}
     */
    public isDone(): boolean;

    /**
     * called before the action start. It will also set the target.
     *
     * @param {Node} target
     */
    public startWithTarget(target: Node): void;

    /**
     * called after the action has finished. It will set the 'target' to nil. <br />
     * IMPORTANT: You should never call "action stop" manually. Instead, use: "target.stopAction(action);"
     */
    public stop(): void;

    /**
     * called every frame with it's delta time. <br />
     * DON'T override unless you know what you are doing.
     *
     * @param {Number} dt
     */
    public step(dt: number): void;

    /**
     * Called once per frame. Time is the number of seconds of a frame interval.
     *
     * @param {Number}  dt
     */
    public update(dt: number): void;

    /**
     * get the target.
     *
     * @return {Node}
     */
    public getTarget(): Node;

    /**
     * The action will modify the target properties.
     *
     * @param {Node} target
     */
    public setTarget(target: Node): void;

    /**
     * get the original target.
     *
     * @return {Node}
     */
    public getOriginalTarget(): Node;

    /**
     * Set the original target, since target can be nil. <br/>
     * Is the target that were used to run the action.  <br/>
     * Unless you are doing something complex, like ActionManager, you should NOT call this method. <br/>
     * The target is 'assigned', it is not 'retained'. <br/>
     * @param {Node} originalTarget
     */
    public setOriginalTarget(originalTarget: Node): void;

    /**
     * get tag number.
     * @return {Number}
     */
    public getTag(): number;

    /**
     * set tag number.
     * @param {Number} tag
     */
    public setTag(tag: number): void;

    /**
     * Currently JavaScript Bindigns (JSB), in some cases, needs to use retain and release. This is a bug in JSB, <br/>
     * and the ugly workaround is to use retain/release. So, these 2 methods were added to be compatible with JSB. <br/>
     * This is a hack, and should be removed once JSB fixes the retain/release bug.
     */
    public retain(): void;

    /**
     * Currently JavaScript Bindigns (JSB), in some cases, needs to use retain and release. This is a bug in JSB, <br/>
     * and the ugly workaround is to use retain/release. So, these 2 methods were added to be compatible with JSB. <br/>
     * This is a hack, and should be removed once JSB fixes the retain/release bug.
     */
    public release(): void;
  }

  /**
   * Allocates and initializes the action.
   *
   * @function action
   * @static
   * @return {Action}
   *
   * @example
   * // return {Action}
   * var action = action();
   */
  export function action(): Action;

  /**
   * Base class actions that do have a finite time duration. <br/>
   * Possible actions: <br/>
   * - An action with a duration of 0 seconds. <br/>
   * - An action with a duration of 35.5 seconds.
   *
   * Infinite time actions are valid
   * @class
   * @extends Action
   */
  export class FiniteTimeAction extends Action {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     */
    public ctor(): void;

    /**
     * get duration of the action. (seconds)
     *
     * @return {Number}
     */
    public getDuration(): number;

    /**
     * set duration of the action. (seconds)
     *
     * @param {Number} duration
     */
    public setDuration(duration: number): void;

    /**
     * Returns a reversed action. <br />
     * For example: <br />
     * - The action will be x coordinates of 0 move to 100. <br />
     * - The reversed action will be x of 100 move to 0.
     * - Will be rewritten
     *
     * @return {Null}
     */
    public reverse(): void;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @return {FiniteTimeAction}
     */
    public clone(): FiniteTimeAction;
  }

  /**
   * Changes the speed of an action, making it take longer (speed > 1)
   * or less (speed < 1) time. <br/>
   * Useful to simulate 'slow motion' or 'fast forward' effect.
   *
   * @warning This action can't be Sequenceable because it is not an IntervalAction
   * @class
   * @extends Action
   * @param {ActionInterval} action
   * @param {Number} speed
   */
  export class Speed extends Action {
    //_speed: 0.0,
    //_innerAction: null,

    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @param {ActionInterval} action
     * @param {Number} speed
     */
    public ctor(action: ActionInterval, speed: number): void;
    public ctor(): void;

    /**
     * initializes the action.
     *
     * @param {ActionInterval} action
     * @param {Number} speed
     * @return {Boolean}
     */
    public initWithAction(action: ActionInterval, speed: number): boolean;

    /**
     * Gets the current running speed. <br />
     * Will get a percentage number, compared to the original speed.
     *
     * @return {Number}
     */
    public getSpeed(): number;

    /**
     * alter the speed of the inner function in runtime.
     *
     * @param {Number} speed
     */
    public setSpeed(speed: number): void;

    /**
     * returns a reversed action. <br />
     * For example: <br />
     * - The action will be x coordinates of 0 move to 100. <br />
     * - The reversed action will be x of 100 move to 0.
     * - Will be rewritten
     *
     * @return {Speed}
     */
    public reverse(): Speed;

    /**
     * Set inner Action.
     * @param {ActionInterval} action
     */
    public setInnerAction(action: ActionInterval): void;

    /**
     * Get inner Action.
     *
     * @return {ActionInterval}
     */
    public getInnerAction(): ActionInterval;
  }

  /**
   * creates the speed action.
   *
   * @function speed
   * @param {ActionInterval} action
   * @param {Number} speed
   * @return {Speed}
   */
  export function speed(action: ActionInterval, speed: number): Speed;

  /**
   * Follow is an action that "follows" a node.
   *
   * @example
   * //example
   * //Instead of using Camera as a "follower", use this action instead.
   * layer.runAction(follow(hero));
   *
   * @property {Number}  leftBoundary - world leftBoundary.
   * @property {Number}  rightBoundary - world rightBoundary.
   * @property {Number}  topBoundary - world topBoundary.
   * @property {Number}  bottomBoundary - world bottomBoundary.
   *
   * @param {Node} followedNode
   * @param {Rect} rect
   * @example
   * // creates the action with a set boundary
   * var sprite = new Sprite("spriteFileName");
   * var followAction = new Follow(sprite, rect(0, 0, s.width * 2 - 100, s.height));
   * this.runAction(followAction);
   *
   * // creates the action with no boundary set
   * var sprite = new Sprite("spriteFileName");
   * var followAction = new Follow(sprite);
   * this.runAction(followAction);
   *
   * @class
   * @extends Action
   */
  export class Follow extends Action {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
     * creates the action with a set boundary. <br/>
     * creates the action with no boundary set.
     * @param {Node} followedNode
     * @param {Rect} rect
     */
    public ctor(followedNode: Node, rect: Rect): void;
    public ctor(): void;

    public initWithTarget(followedNode: Node, rect: Rect): boolean;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @return {Follow}
     */
    public clone(): Follow;

    /**
     * Get whether camera should be limited to certain area.
     *
     * @return {Boolean}
     */
    public isBoundarySet(): boolean;

    /**
     * alter behavior - turn on/off boundary.
     *
     * @param {Boolean} value
     */
    public setBoudarySet(value: boolean): void;
  }

  /**
   * creates the action with a set boundary. <br/>
   * creates the action with no boundary set.
   *
   * @function
   * @param {Node} followedNode
   * @param {Rect} rect
   * @return {Follow|Null} returns the Follow object on success
   * @example
   * // example
   * // creates the action with a set boundary
   * var sprite = new Sprite("spriteFileName");
   * var followAction = follow(sprite, rect(0, 0, s.width * 2 - 100, s.height));
   * this.runAction(followAction);
   *
   * // creates the action with no boundary set
   * var sprite = new Sprite("spriteFileName");
   * var followAction = follow(sprite);
   * this.runAction(followAction);
   */
  export function follow(followedNode: Node, rect: Rect): Follow;

  // +--------------------------------------------------------------------------------
  // + File: cocos2d/core/base-nodes/CCActionCamera.js
  // +--------------------------------------------------------------------------------
  /**
   * Base class for Camera actions
   * @class
   * @extends ActionInterval
   */
  export class ActionCamera extends ActionInterval {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     */
    public ctor(): void;

    /**
     * called before the action start. It will also set the target.
     *
     * @param {Node} target
     */
    public startWithTarget(target: Node): void;

    /**
     * to copy object with deep copy.
     * returns a new clone of the action
     *
     * @returns {ActionCamera}
     */
    public clone(): ActionCamera;

    /**
     * returns a reversed action. <br />
     * For example: <br />
     * - The action will be x coordinates of 0 move to 100. <br />
     * - The reversed action will be x of 100 move to 0.
     * - Will be rewritten
     *
     */
    public reverse(): ActionCamera;
  }

  export interface SphericalCoordinates {
    newRadius: number;
    zenith: number;
    azimuth: number;
  }

  /**
   * Orbits the camera around the center of the screen using spherical coordinates.
   *
   * @param {Number} t time
   * @param {Number} radius
   * @param {Number} deltaRadius
   * @param {Number} angleZ
   * @param {Number} deltaAngleZ
   * @param {Number} angleX
   * @param {Number} deltaAngleX
   *
   * @class
   * @extends ActionCamera
   */
  export class OrbitCamera extends ActionCamera {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
     * creates a OrbitCamera action with radius, delta-radius,  z, deltaZ, x, deltaX.
     * @param {Number} t time
     * @param {Number} radius
     * @param {Number} deltaRadius
     * @param {Number} angleZ
     * @param {Number} deltaAngleZ
     * @param {Number} angleX
     * @param {Number} deltaAngleX
     */
    public ctor(
      t: number,
      radius: number,
      deltaRadius: number,
      angleZ: number,
      deltaAngleZ: number,
      angleX: number,
      deltaAngleX: number
    ): void;
    public ctor(): void;

    /**
     * initializes a OrbitCamera action with radius, delta-radius,  z, deltaZ, x, deltaX
     * @param {Number} t time
     * @param {Number} radius
     * @param {Number} deltaRadius
     * @param {Number} angleZ
     * @param {Number} deltaAngleZ
     * @param {Number} angleX
     * @param {Number} deltaAngleX
     * @return {Boolean}
     */
    public initWithDuration(
      t: number,
      radius: number,
      deltaRadius: number,
      angleZ: number,
      deltaAngleZ: number,
      angleX: number,
      deltaAngleX: number
    ): boolean;
    public initWithDuration(d: number): boolean;

    /**
     * positions the camera according to spherical coordinates
     * @return {Object}
     */
    public sphericalRadius(): SphericalCoordinates;

    /**
     * called before the action start. It will also set the target.
     *
     * @param {Node} target
     */
    public startWithTarget(target: Node): void;

    /**
     * to copy object with deep copy.
     * returns a new clone of the action
     *
     * @returns {ActionCamera}
     */
    public clone(): ActionCamera;
  }

  /**
   * creates a OrbitCamera action with radius, delta-radius,  z, deltaZ, x, deltaX
   * @function
   * @param {Number} t time
   * @param {Number} radius
   * @param {Number} deltaRadius
   * @param {Number} angleZ
   * @param {Number} deltaAngleZ
   * @param {Number} angleX
   * @param {Number} deltaAngleX
   * @return {OrbitCamera}
   */
  export function orbitCamera(
    t: number,
    radius: number,
    deltaRadius: number,
    angleZ: number,
    deltaAngleZ: number,
    angleX: number,
    deltaAngleX: number
  ): OrbitCamera;

  // +--------------------------------------------------------------------------------
  // + File: cocos2d/core/base-nodes/CCActionCatmullRom.js
  // +--------------------------------------------------------------------------------
  /**
   * Returns the Cardinal Spline position for a given set of control points, tension and time. <br />
   * CatmullRom Spline formula. <br />
   * s(-ttt + 2tt - t)P1 + s(-ttt + tt)P2 + (2ttt - 3tt + 1)P2 + s(ttt - 2tt + t)P3 + (-2ttt + 3tt)P3 + s(ttt - tt)P4
   *
   * @function
   * @param {Point} p0
   * @param {Point} p1
   * @param {Point} p2
   * @param {Point} p3
   * @param {Number} tension
   * @param {Number} t
   * @return {Point}
   */
  export function cardinalSplineAt(
    p0: Point,
    p1: Point,
    p2: Point,
    p3: Point,
    tension: number,
    t: number
  ): Point;

  /**
   * returns a new copy of the array reversed.
   *
   * @return {Array}
   */
  export function reverseControlPoints(controlPoints: Point[]): Point[];

  /**
   * returns a new clone of the controlPoints
   *
   * @param controlPoints
   * @returns {Array}
   */
  export function cloneControlPoints(controlPoints: Point[]): Point[];

  /**
   * returns a point from the array
   *
   * @param {Array} controlPoints
   * @param {Number} pos
   * @return {Point}
   */
  export function getControlPointAt(controlPoints: Point[], pos: number): Point;

  /**
   * reverse the current control point array inline, without generating a new one <br />
   *
   * @param controlPoints
   */
  export function reverseControlPointsInline(controlPoints: Point[]): void;

  /**
   * Cardinal Spline path. {@link http://en.wikipedia.org/wiki/Cubic_Hermite_spline#Cardinal_spline}
   * Absolute coordinates.
   *
   * @class
   * @extends ActionInterval
   * @param {Number} duration
   * @param {Array} points array of control points
   * @param {Number} tension
   *
   * @example
   * //create a CardinalSplineTo
   * var action1 = cardinalSplineTo(3, array, 0);
   */
  export class CardinalSplineTo extends ActionInterval {
    ///** Array of control points */
    //_points:null,
    //_deltaT:0,
    //_tension:0,
    //_previousPosition:null,
    //_accumulatedDiff:null,

    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
     * Creates an action with a Cardinal Spline array of points and tension.
     * @param {Number} duration
     * @param {Array} points array of control points
     * @param {Number} tension
     */
    public ctor(duration: number, points: Point[], tension: number): void;
    public ctor(): void;

    /**
     * initializes the action with a duration and an array of points
     *
     * @param {Number} duration
     * @param {Array} points array of control points
     * @param {Number} tension
     *
     * @return {Boolean}
     */
    public initWithDuration(duration: number, points: Point[], tension: number): boolean;
    public initWithDuration(d: number): boolean;

    /**
     * returns a new clone of the action
     *
     * @returns {CardinalSplineTo}
     */
    public clone(): CardinalSplineTo;

    /**
     * called before the action start. It will also set the target.
     *
     * @param {Node} target
     */
    public startWithTarget(target: Node): void;

    /**
     * reverse a new CardinalSplineTo. <br />
     * Along the track of movement in the opposite.
     *
     * @return {CardinalSplineTo}
     */
    public reverse(): CardinalSplineTo;

    /**
     * update position of target
     *
     * @param {Point} newPos
     */
    public updatePosition(newPos: Point): void;

    /**
     * Points getter
     *
     * @return {Array}
     */
    public getPoints(): Point[];

    /**
     * Points setter
     *
     * @param {Array} points
     */
    public setPoints(points: Point[]): void;
  }

  /**
   * creates an action with a Cardinal Spline array of points and tension.
   *
   * @function
   * @param {Number} duration
   * @param {Array} points array of control points
   * @param {Number} tension
   * @return {CardinalSplineTo}
   *
   * @example
   * //create a CardinalSplineTo
   * var action1 = cardinalSplineTo(3, array, 0);
   */
  export function cardinalSplineTo(
    duration: number,
    points: Point[],
    tension: number
  ): CardinalSplineTo;

  /**
   * Cardinal Spline path. {@link http://en.wikipedia.org/wiki/Cubic_Hermite_spline#Cardinal_spline}
   * Relative coordinates.
   *
   * @class
   * @extends CardinalSplineTo
   * @param {Number} duration
   * @param {Array} points
   * @param {Number} tension
   *
   * @example
   * //create a CardinalSplineBy
   * var action1 = cardinalSplineBy(3, array, 0);
   */
  export class CardinalSplineBy extends CardinalSplineTo {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
     * creates an action with a Cardinal Spline array of points and tension.
     * @param {Number} duration
     * @param {Array} points
     * @param {Number} tension
     */
    public ctor(duration: number, points: Point[], tension: number): void;
    public ctor(): void;

    /**
     * reverse a new CardinalSplineBy
     *
     * @return {CardinalSplineBy}
     */
    public reverse(): CardinalSplineBy;

    /**
     * returns a new clone of the action
     *
     * @returns {CardinalSplineBy}
     */
    public clone(): CardinalSplineBy;
  }

  /**
   * creates an action with a Cardinal Spline array of points and tension.
   *
   * @function
   * @param {Number} duration
   * @param {Array} points
   * @param {Number} tension
   *
   * @return {CardinalSplineBy}
   */
  export function cardinalSplineBy(
    duration: number,
    points: Point[],
    tension: number
  ): CardinalSplineBy;

  /**
   * An action that moves the target with a CatmullRom curve to a destination point.<br/>
   * A Catmull Rom is a Cardinal Spline with a tension of 0.5.  <br/>
   * {@link http://en.wikipedia.org/wiki/Cubic_Hermite_spline#Catmull.E2.80.93Rom_spline}
   * Absolute coordinates.
   *
   * @class
   * @extends CardinalSplineTo
   * @param {Number} dt
   * @param {Array} points
   *
   * @example
   * var action1 = catmullRomTo(3, array);
   */
  export class CatmullRomTo extends CardinalSplineTo {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
     * creates an action with a Cardinal Spline array of points and tension.
     * @param {Number} dt
     * @param {Array} points
     * @param {number} [tension] Ignore, only here to suppress TypeScript compiler error for overloading method.
     */
    public ctor(dt: number, points: Point[], tension: number): void;
    public ctor(): void;

    /**
     * returns a new clone of the action
     * @returns {CatmullRomTo}
     */
    public clone(): CatmullRomTo;
  }

  /**
   * creates an action with a Cardinal Spline array of points and tension.
   *
   * @function
   * @param {Number} dt
   * @param {Array} points
   * @param {number} [tension] Ignore, only here to suppress TypeScript compiler error for overloading method.
   * @return {CatmullRomTo}
   *
   * @example
   * var action1 = catmullRomTo(3, array);
   */
  export function catmullRomTo(dt: number, points: Point[], tension?: number): CatmullRomTo;

  /**
   * An action that moves the target with a CatmullRom curve by a certain distance.  <br/>
   * A Catmull Rom is a Cardinal Spline with a tension of 0.5.<br/>
   * http://en.wikipedia.org/wiki/Cubic_Hermite_spline#Catmull.E2.80.93Rom_spline
   * Relative coordinates.
   *
   * @class
   * @extends CardinalSplineBy
   * @param {Number} dt
   * @param {Array} points
   *
   * @example
   * var action1 = catmullRomBy(3, array);
   */
  export class CatmullRomBy extends CardinalSplineBy {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
     * Creates an action with a Cardinal Spline array of points and tension.
     * @param {Number} dt
     * @param {Array} points
     */
    public ctor(dt: number, points: Point[]): void;
    public ctor(): void;

    /**
     * initializes the action with a duration and an array of points
     *
     * @function
     * @param {Number} dt
     * @param {Array} points
     */
    public initWithDuration(dt: number, points: Point[]): boolean;
    public initWithDuration(d: number): boolean;

    /**
     * returns a new clone of the action
     * @returns {CatmullRomBy}
     */
    public clone(): CatmullRomBy;
  }

  /**
   * Creates an action with a Cardinal Spline array of points and tension
   * @function
   * @param {Number} dt
   * @param {Array} points
   * @return {CatmullRomBy}
   * @example
   * var action1 = catmullRomBy(3, array);
   */
  export function catmullRomBy(dt: number, points: Point[]): CatmullRomBy;

  // +--------------------------------------------------------------------------------
  // + File: cocos2d/core/base-nodes/CCActionEase.js
  // +--------------------------------------------------------------------------------
  /**
   * Base class for Easing actions
   * @class
   * @extends ActionInterval
   * @param {ActionInterval} action
   *
   * @deprecated since v3.0 Does not recommend the use of the base object.
   *
   * @example
   * var moveEase = new ActionEase(action);
   */
  export class ActionEase extends ActionInterval {
    //_inner:null,

    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
     * creates the action of ActionEase.
     * @param {ActionInterval} action
     */
    public ctor(action: ActionInterval): void;
    public ctor(): void;

    /**
     * initializes the action
     *
     * @param {ActionInterval} action
     * @return {Boolean}
     */
    public initWithAction(action: ActionInterval): boolean;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {ActionEase}
     */
    public clone(): ActionEase;

    /**
     * Create new action to original operation effect opposite. <br />
     * For example: <br />
     * - The action will be x coordinates of 0 move to 100. <br />
     * - The reversed action will be x of 100 move to 0.
     * - Will be rewritten
     * @return {ActionEase}
     */
    public reverse(): ActionEase;

    /**
     * Get inner Action.
     *
     * @return {ActionInterval}
     */
    public getInnerAction(): ActionInterval;
  }

  /**
   * creates the action of ActionEase
   *
   * @param {ActionInterval} action
   * @return {ActionEase}
   * @example
   * // example
   * var moveEase = actionEase(action);
   */
  export function actionEase(action: ActionInterval): ActionEase;

  /**
   * Base class for Easing actions with rate parameters
   *
   * @class
   * @extends ActionEase
   * @param {ActionInterval} action
   * @param {Number} rate
   *
   * @deprecated since v3.0 please easeRateAction(action, 3.0);
   *
   * @example
   * //The old usage
   * EaseRateAction.create(action, 3.0);
   * //The new usage
   * var moveEaseRateAction = easeRateAction(action, 3.0);
   */
  export class EaseRateAction extends ActionEase {
    //_rate:0,

    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
     * Creates the action with the inner action and the rate parameter.
     * @param {ActionInterval} action
     * @param {Number} rate
     */
    public ctor(action: ActionInterval, rate?: number): void;
    public ctor(): void;

    /**
     * Initializes the action with the inner action and the rate parameter
     * @param {ActionInterval} action
     * @param {Number} rate
     * @return {Boolean}
     */
    public initWithAction(action: ActionInterval, rate?: number): boolean;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseRateAction}
     */
    public clone(): EaseRateAction;

    /**
     * set rate value for the actions
     * @param {Number} rate
     */
    public setRate(rate: number): void;

    /** get rate value for the actions
     * @return {Number}
     */
    public getRate(): number;

    /**
     * Create new action to original operation effect opposite. <br />
     * For example: <br />
     * - The action will be x coordinates of 0 move to 100. <br />
     * - The reversed action will be x of 100 move to 0.
     * - Will be rewritten
     * @return {EaseRateAction}
     */
    public reverse(): EaseRateAction;
  }

  /**
   * Creates the action with the inner action and the rate parameter.
   *
   * @param {ActionInterval} action
   * @param {Number} rate
   * @return {EaseRateAction}
   * @example
   * // example
   * var moveEaseRateAction = easeRateAction(action, 3.0);
   */
  export function easeRateAction(action: ActionInterval, rate: number): EaseRateAction;

  /**
   * EaseIn action with a rate. From slow to fast.
   *
   * @class
   * @extends EaseRateAction
   *
   * @deprecated since v3.0 please use action.easing(easeIn(3));
   *
   * @example
   * //The old usage
   * EaseIn.create(action, 3);
   * //The new usage
   * action.easing(easeIn(3.0));
   */
  export class EaseIn extends EaseRateAction {
    /**
     * Create a easeIn action. Opposite with the original motion trajectory.
     * @return {EaseIn}
     */
    public reverse(): EaseIn;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseIn}
     */
    public clone(): EaseIn;
  }

  /**
   * Creates the action easing object with the rate parameter. <br />
   * From slow to fast.
   *
   * @function
   * @param {Number} rate
   * @return {Object}
   * @example
   * // example
   * action.easing(easeIn(3.0));
   */
  export function easeIn(rate: number): EaseIn;

  /**
   * EaseOut action with a rate. From fast to slow.
   *
   * @class
   * @extends EaseRateAction
   *
   * @deprecated since v3.0 please use action.easing(easeOut(3))
   *
   * @example
   * //The old usage
   * EaseOut.create(action, 3);
   * //The new usage
   * action.easing(easeOut(3.0));
   */
  export class EaseOut extends EaseRateAction {
    /**
     * Create a easeIn action. Opposite with the original motion trajectory.
     * @return {EaseOut}
     */
    public reverse(): EaseOut;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseOut}
     */
    public clone(): EaseOut;
  }

  /**
   * Creates the action easing object with the rate parameter. <br />
   * From fast to slow.
   *
   * @function
   * @param {Number} rate
   * @return {Object}
   * @example
   * // example
   * action.easing(easeOut(3.0));
   */
  export function easeOut(rate: number): EaseOut;

  /**
   * EaseInOut action with a rate. <br />
   * Slow to fast then to slow.
   * @class
   * @extends EaseRateAction
   *
   * @deprecated since v3.0 please use action.easing(easeInOut(3.0))
   *
   * @example
   * //The old usage
   * EaseInOut.create(action, 3);
   * //The new usage
   * action.easing(easeInOut(3.0));
   */
  export class EaseInOut extends EaseRateAction {
    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseInOut}
     */
    public clone(): EaseInOut;

    /**
     * Create a EaseInOut action. Opposite with the original motion trajectory.
     * @return {EaseInOut}
     */
    public reverse(): EaseInOut;
  }

  /**
   * Creates the action easing object with the rate parameter. <br />
   * Slow to fast then to slow.
   * @function
   * @param {Number} rate
   * @return {Object}
   *
   * @example
   * //The new usage
   * action.easing(easeInOut(3.0));
   */
  export function easeInOut(rate: number): EaseInOut;

  /**
   * Ease Exponential In. Slow to Fast. <br />
   * Reference easeInExpo: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @class
   * @extends ActionEase
   *
   * @deprecated since v3.0 please action.easing(easeExponentialIn())
   *
   * @example
   * //The old usage
   * EaseExponentialIn.create(action);
   * //The new usage
   * action.easing(easeExponentialIn());
   */
  export class EaseExponentialIn extends ActionEase {
    /**
     * Create a EaseExponentialOut action. Opposite with the original motion trajectory.
     * @return {EaseExponentialOut}
     */
    public reverse(): EaseExponentialOut;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseExponentialIn}
     */
    public clone(): EaseExponentialIn;
  }

  //// TODO: What's this for? Does it alter the inteface?
  //_easeExponentialInObj = {
  //    easing: function(dt){
  //        return dt === 0 ? 0 : Math.pow(2, 10 * (dt - 1));
  //    },
  //    reverse: function(){
  //        return _easeExponentialOutObj;
  //    }
  //};

  /**
   * Creates the action easing object with the rate parameter. <br />
   * Reference easeInExpo: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @function
   * @return {Object}
   * @example
   * // example
   * action.easing(easeExponentialIn());
   */
  export function easeExponentialIn(): EaseExponentialIn;

  /**
   * Ease Exponential Out. <br />
   * Reference easeOutExpo: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @class
   * @extends ActionEase
   *
   * @deprecated since v3.0 please use action.easing(easeExponentialOut())
   *
   * @example
   * //The old usage
   * EaseExponentialOut.create(action);
   * //The new usage
   * action.easing(easeExponentialOut());
   */
  export class EaseExponentialOut extends ActionEase {
    /**
     * Create a EaseExponentialIn action. Opposite with the original motion trajectory.
     * @return {EaseExponentialIn}
     */
    public reverse(): EaseExponentialIn;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseExponentialOut}
     */
    public clone(): EaseExponentialOut;
  }

  //_easeExponentialOutObj = {
  //    easing: function(dt){
  //        return dt === 1 ? 1 : (-(Math.pow(2, -10 * dt)) + 1);
  //    },
  //    reverse: function(){
  //        return _easeExponentialInObj;
  //    }
  //};

  /**
   * creates the action easing object. <br />
   * Reference easeOutExpo: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   *
   * @return {Object}
   * @example
   * // example
   * action.easing(easeExponentialOut());
   */
  export function easeExponentialOut(): EaseExponentialOut;

  /**
   * Ease Exponential InOut. <br />
   * Reference easeInOutExpo: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   *
   * @class
   * @extends ActionEase
   *
   * @deprecated since v3.0 please use action.easing(easeExponentialInOut)
   *
   * @example
   * //The old usage
   * EaseExponentialInOut.create(action);
   * //The new usage
   * action.easing(easeExponentialInOut());
   */
  export class EaseExponentialInOut extends ActionEase {
    /**
     * Create a EaseExponentialInOut action. Opposite with the original motion trajectory.
     * @return {EaseExponentialInOut}
     */
    public reverse(): EaseExponentialInOut;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseExponentialInOut}
     */
    public clone(): EaseExponentialInOut;
  }

  //_easeExponentialInOutObj = {
  //    easing: function(dt){
  //        if( dt !== 1 && dt !== 0) {
  //            dt *= 2;
  //            if (dt < 1)
  //                return 0.5 * Math.pow(2, 10 * (dt - 1));
  //            else
  //                return 0.5 * (-Math.pow(2, -10 * (dt - 1)) + 2);
  //        }
  //        return dt;
  //    },
  //    reverse: function(){
  //        return _easeExponentialInOutObj;
  //    }
  //};

  /**
   * creates an EaseExponentialInOut action easing object. <br />
   * Reference easeInOutExpo: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @function
   * @return {Object}
   * @example
   * // example
   * action.easing(easeExponentialInOut());
   */
  export function easeExponentialInOut(): EaseExponentialInOut;

  /**
   * Ease Sine In. <br />
   * Reference easeInSine: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @class
   * @extends ActionEase
   *
   * @deprecated since v3.0 please use action.easing(easeSineIn())
   *
   * @example
   * //The old usage
   * EaseSineIn.create(action);
   * //The new usage
   * action.easing(easeSineIn());
   */
  export class EaseSineIn extends ActionEase {
    /**
     * Create a EaseSineOut action. Opposite with the original motion trajectory.
     * @return {EaseSineOut}
     */
    public reverse(): EaseSineOut;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseSineIn}
     */
    public clone(): EaseSineIn;
  }

  //_easeSineInObj = {
  //    easing: function(dt){
  //        return (dt===0 || dt===1) ? dt : -1 * Math.cos(dt * Math.PI / 2) + 1;
  //    },
  //    reverse: function(){
  //        return _easeSineOutObj;
  //    }
  //};

  /**
   * creates an EaseSineIn action. <br />
   * Reference easeInSine: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @function
   * @return {Object}
   * @example
   * // example
   * action.easing(easeSineIn());
   */
  export function easeSineIn(): EaseSineIn;

  /**
   * Ease Sine Out. <br />
   * Reference easeOutSine: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @class
   * @extends ActionEase
   *
   * @deprecated since v3.0 please use action.easing(easeSineOut())
   *
   * @example
   * //The old usage
   * EaseSineOut.create(action);
   * //The new usage
   * action.easing(easeSineOut());
   */
  export class EaseSineOut extends ActionEase {
    /**
     * Create a EaseSineIn action. Opposite with the original motion trajectory.
     * @return {EaseSineIn}
     */
    public reverse(): EaseSineIn;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseSineOut}
     */
    public clone(): EaseSineOut;
  }

  //_easeSineOutObj = {
  //    easing: function(dt){
  //        return (dt===0 || dt===1) ? dt : Math.sin(dt * Math.PI / 2);
  //    },
  //    reverse: function(){
  //        return _easeSineInObj;
  //    }
  //};

  /**
   * Creates an EaseSineOut action easing object. <br />
   * Reference easeOutSine: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @function
   * @return {Object}
   * @example
   * // example
   * action.easing(easeSineOut());
   */
  export function easeSineOut(): EaseSineOut;

  /**
   * Ease Sine InOut. <br />
   * Reference easeInOutSine: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @class
   * @extends ActionEase
   *
   * @deprecated since v3.0 please use action.easing(easeSineInOut())
   *
   * @example
   * //The old usage
   * EaseSineInOut.create(action);
   * //The new usage
   * action.easing(easeSineInOut());
   */
  export class EaseSineInOut extends ActionEase {
    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseSineInOut}
     */
    public clone(): EaseSineInOut;

    /**
     * Create a EaseSineInOut action. Opposite with the original motion trajectory.
     * @return {EaseSineInOut}
     */
    public reverse(): EaseSineInOut;
  }

  //_easeSineInOutObj = {
  //    easing: function(dt){
  //        return (dt === 0 || dt === 1) ? dt : -0.5 * (Math.cos(Math.PI * dt) - 1);
  //    },
  //    reverse: function(){
  //        return _easeSineInOutObj;
  //    }
  //};

  /**
   * creates the action easing object. <br />
   * Reference easeInOutSine: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @return {Object}
   * @example
   * // example
   * action.easing(easeSineInOut());
   */
  export function easeSineInOut(): EaseSineInOut;

  /**
   * Ease Elastic abstract class.
   * @class
   * @extends ActionEase
   * @param {ActionInterval} action
   * @param {Number} [period=0.3]
   *
   * @deprecated since v3.0 Does not recommend the use of the base object.
   */
  export class EaseElastic extends ActionEase {
    //_period: 0.3,

    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
     * Creates the action with the inner action and the period in radians (default is 0.3).
     * @param {ActionInterval} action
     * @param {Number} [period=0.3]
     */
    public ctor(action: ActionInterval, period?: number): void;
    public ctor(): void;

    /**
     * get period of the wave in radians. default is 0.3
     * @return {Number}
     */
    public getPeriod(): number;

    /**
     * set period of the wave in radians.
     * @param {Number} period
     */
    public setPeriod(period: number): void;

    /**
     * Initializes the action with the inner action and the period in radians (default is 0.3)
     * @param {ActionInterval} action
     * @param {Number} [period=0.3]
     * @return {Boolean}
     */
    public initWithAction(action: ActionInterval, period: number): boolean;
    public initWithAction(action: ActionInterval): boolean;

    /**
     * Create a action. Opposite with the original motion trajectory. <br />
     * Will be overwrite.
     * @return {null}
     */
    public reverse(): EaseElastic;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseElastic}
     */
    public clone(): EaseElastic;
  }

  /**
   * Ease Elastic In action. <br />
   * Reference easeInElastic: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @warning This action doesn't use a bijective function. Actions like Sequence might have an unexpected result when used with this action.
   * @class
   * @extends EaseElastic
   *
   * @deprecated since v3.0 please use action.easing(easeElasticIn())
   *
   * @example
   * //The old usage
   * EaseElasticIn.create(action, period);
   * //The new usage
   * action.easing(easeElasticIn(period));
   */
  export class EaseElasticIn extends EaseElastic {
    /**
     * Create a action. Opposite with the original motion trajectory.
     * @return {EaseElasticOut}
     */
    public reverse(): EaseElasticOut;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseElasticIn}
     */
    public clone(): EaseElasticIn;
  }

  ////default ease elastic in object (period = 0.3)
  //    _easeElasticInObj = {
  //        easing:function(dt){
  //            if (dt === 0 || dt === 1)
  //                return dt;
  //            dt = dt - 1;
  //            return -Math.pow(2, 10 * dt) * Math.sin((dt - (0.3 / 4)) * Math.PI * 2 / 0.3);
  //        },
  //        reverse:function(){
  //            return _easeElasticOutObj;
  //        }
  //    };

  /**
   * Creates the action easing obejct with the period in radians (default is 0.3). <br />
   * Reference easeInElastic: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @function
   * @param {Number} [period=0.3]
   * @return {Object}
   * @example
   * // example
   * action.easing(easeElasticIn(3.0));
   */
  export function easeElasticIn(period?: number): EaseElasticIn;

  /**
   * Ease Elastic Out action. <br />
   * Reference easeOutElastic: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @warning This action doesn't use a bijective function. Actions like Sequence might have an unexpected result when used with this action.
   * @class
   * @extends EaseElastic
   *
   * @deprecated since v3.0 <br /> Please use action.easing(easeElasticOut(period))
   *
   * @example
   * //The old usage
   * EaseElasticOut.create(action, period);
   * //The new usage
   * action.easing(easeElasticOut(period));
   */
  export class EaseElasticOut extends EaseElastic {
    /**
     * Create a action. Opposite with the original motion trajectory.
     * @return {EaseElasticIn}
     */
    public reverse(): EaseElasticIn;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseElasticOut}
     */
    public clone(): EaseElasticOut;
  }

  ////default ease elastic out object (period = 0.3)
  //    _easeElasticOutObj = {
  //        easing: function (dt) {
  //            return (dt === 0 || dt === 1) ? dt : Math.pow(2, -10 * dt) * Math.sin((dt - (0.3 / 4)) * Math.PI * 2 / 0.3) + 1;
  //        },
  //        reverse:function(){
  //            return _easeElasticInObj;
  //        }
  //    };
  /**
   * Creates the action easing object with the period in radians (default is 0.3). <br />
   * Reference easeOutElastic: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @function
   * @param {Number} [period=0.3]
   * @return {Object}
   * @example
   * // example
   * action.easing(easeElasticOut(3.0));
   */
  export function easeElasticOut(period?: number): EaseElasticOut;

  /**
   * Ease Elastic InOut action. <br />
   * Reference easeInOutElastic: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @warning This action doesn't use a bijective function. Actions like Sequence might have an unexpected result when used with this action.
   * @class
   * @extends EaseElastic
   *
   * @deprecated since v3.0 please use action.easing(easeElasticInOut())
   *
   * @example
   * //The old usage
   * EaseElasticInOut.create(action, period);
   * //The new usage
   * action.easing(easeElasticInOut(period));
   */
  export class EaseElasticInOut extends EaseElastic {
    /**
     * Create a action. Opposite with the original motion trajectory.
     * @return {EaseElasticInOut}
     */
    public reverse(): EaseElasticInOut;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseElasticInOut}
     */
    public clone(): EaseElasticInOut;
  }

  /**
   * Creates the action easing object with the period in radians (default is 0.3). <br />
   * Reference easeInOutElastic: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @function
   * @param {Number} [period=0.3]
   * @return {Object}
   * @example
   * // example
   * action.easing(easeElasticInOut(3.0));
   */
  export function easeElasticInOut(period?: number): EaseElasticInOut;

  /**
   * EaseBounce abstract class.
   *
   * @deprecated since v3.0 Does not recommend the use of the base object.
   *
   * @class
   * @extends ActionEase
   */
  export class EaseBounce extends ActionEase {
    /**
     * @param {Number} time1
     * @return {Number}
     */
    public bounceTime(time1: number): number;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseBounce}
     */
    public clone(): EaseBounce;

    /**
     * Create a action. Opposite with the original motion trajectory.
     * @return {EaseBounce}
     */
    public reverse(): EaseBounce;
  }

  /**
   * EaseBounceIn action. <br />
   * Eased bounce effect at the beginning.
   * @warning This action doesn't use a bijective function. Actions like Sequence might have an unexpected result when used with this action.
   * @class
   * @extends EaseBounce
   *
   * @deprecated since v3.0 please use action.easing(easeBounceIn())
   *
   * @example
   * //The old usage
   * EaseBounceIn.create(action);
   * //The new usage
   * action.easing(easeBounceIn());
   */
  export class EaseBounceIn extends EaseBounce {
    /**
     * Create a action. Opposite with the original motion trajectory.
     * @return {EaseBounceOut}
     */
    public reverse(): EaseBounceOut;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseBounceIn}
     */
    public clone(): EaseBounceIn;
  }

  //_easeBounceInObj = {
  //    easing: function(dt){
  //        return 1 - _bounceTime(1 - dt);
  //    },
  //    reverse: function(){
  //        return _easeBounceOutObj;
  //    }
  //};

  /**
   * Creates the action easing object. <br />
   * Eased bounce effect at the beginning.
   * @function
   * @return {Object}
   * @example
   * // example
   * action.easing(easeBounceIn());
   */
  export function easeBounceIn(): EaseBounceIn;

  /**
   * EaseBounceOut action. <br />
   * Eased bounce effect at the ending.
   * @warning This action doesn't use a bijective function. Actions like Sequence might have an unexpected result when used with this action.
   * @class
   * @extends EaseBounce
   *
   * @deprecated since v3.0 please use action.easing(easeBounceOut())
   *
   * @example
   * //The old usage
   * EaseBounceOut.create(action);
   * //The new usage
   * action.easing(easeBounceOut());
   */
  export class EaseBounceOut extends EaseBounce {
    /**
     * Create a action. Opposite with the original motion trajectory.
     * @return {EaseBounceIn}
     */
    public reverse(): EaseBounceIn;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseBounceOut}
     */
    public clone(): EaseBounceOut;
  }

  //_easeBounceOutObj = {
  //    easing: function(dt){
  //        return _bounceTime(dt);
  //    },
  //    reverse:function () {
  //        return _easeBounceInObj;
  //    }
  //};

  /**
   * Creates the action easing object. <br />
   * Eased bounce effect at the ending.
   * @function
   * @return {Object}
   * @example
   * // example
   * action.easing(easeBounceOut());
   */
  export function easeBounceOut(): EaseBounceOut;

  /**
   * EaseBounceInOut action. <br />
   * Eased bounce effect at the begining and ending.
   * @warning This action doesn't use a bijective function. Actions like Sequence might have an unexpected result when used with this action.
   * @class
   * @extends EaseBounce
   *
   * @deprecated since v3.0 <br /> Please use acton.easing(easeBounceInOut())
   *
   * @example
   * //The old usage
   * EaseBounceInOut.create(action);
   * //The new usage
   * action.easing(easeBounceInOut());
   */
  export class EaseBounceInOut extends EaseBounce {
    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseBounceInOut}
     */
    public clone(): EaseBounceInOut;

    /**
     * Create a action. Opposite with the original motion trajectory.
     * @return {EaseBounceInOut}
     */
    public reverse(): EaseBounceInOut;
  }

  //_easeBounceInOutObj = {
  //    easing: function (time1) {
  //        var newT;
  //        if (time1 < 0.5) {
  //            time1 = time1 * 2;
  //            newT = (1 - _bounceTime(1 - time1)) * 0.5;
  //        } else {
  //            newT = _bounceTime(time1 * 2 - 1) * 0.5 + 0.5;
  //        }
  //        return newT;
  //    },
  //    reverse: function(){
  //        return _easeBounceInOutObj;
  //    }
  //};

  /**
   * Creates the action easing object. <br />
   * Eased bounce effect at the begining and ending.
   * @function
   * @return {Object}
   * @example
   * // example
   * action.easing(easeBounceInOut());
   */
  export function easeBounceInOut(): EaseBounceInOut;

  /**
   * EaseBackIn action. <br />
   * In the opposite direction to move slowly, and then accelerated to the right direction.
   * @warning This action doesn't use a bijective function. Actions like Sequence might have an unexpected result when used with this action.
   * @class
   * @extends ActionEase
   *
   * @deprecated since v3.0 please use action.easing(easeBackIn())
   *
   * @example
   * //The old usage
   * EaseBackIn.create(action);
   * //The new usage
   * action.easing(easeBackIn());
   */
  export class EaseBackIn extends ActionEase {
    /**
     * Create a action. Opposite with the original motion trajectory.
     * @return {EaseBackOut}
     */
    public reverse(): EaseBackOut;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseBackIn}
     */
    public clone(): EaseBackIn;
  }

  //_easeBackInObj = {
  //    easing: function (time1) {
  //        var overshoot = 1.70158;
  //        return (time1===0 || time1===1) ? time1 : time1 * time1 * ((overshoot + 1) * time1 - overshoot);
  //    },
  //    reverse: function(){
  //        return _easeBackOutObj;
  //    }
  //};

  /**
   * Creates the action easing object. <br />
   * In the opposite direction to move slowly, and then accelerated to the right direction.
   * @function
   * @return {Object}
   * @example
   * // example
   * action.easing(easeBackIn());
   */
  export function easeBackIn(): EaseBackIn;

  /**
   * EaseBackOut action. <br />
   * Fast moving more than the finish, and then slowly back to the finish.
   * @warning This action doesn't use a bijective function. Actions like Sequence might have an unexpected result when used with this action.
   * @class
   * @extends ActionEase
   *
   * @deprecated since v3.0 please use action.easing(easeBackOut());
   *
   * @example
   * //The old usage
   * EaseBackOut.create(action);
   * //The new usage
   * action.easing(easeBackOut());
   */
  export class EaseBackOut extends ActionEase {
    /**
     * Create a action. Opposite with the original motion trajectory.
     * @return {EaseBackIn}
     */
    public reverse(): EaseBackIn;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseBackOut}
     */
    public clone(): EaseBackOut;
  }

  //_easeBackOutObj = {
  //    easing: function (time1) {
  //        var overshoot = 1.70158;
  //        time1 = time1 - 1;
  //        return time1 * time1 * ((overshoot + 1) * time1 + overshoot) + 1;
  //    },
  //    reverse: function(){
  //        return _easeBackInObj;
  //    }
  //};

  /**
   * Creates the action easing object. <br />
   * Fast moving more than the finish, and then slowly back to the finish.
   * @function
   * @return {Object}
   * @example
   * // example
   * action.easing(easeBackOut());
   */
  export function easeBackOut(): EaseBackOut;

  /**
   * EaseBackInOut action. <br />
   * Begining of EaseBackIn. Ending of EaseBackOut.
   * @warning This action doesn't use a bijective function. Actions like Sequence might have an unexpected result when used with this action.
   * @class
   * @extends ActionEase
   *
   * @deprecated since v3.0 <br /> Please use action.easing(easeBackInOut())
   *
   * @example
   * //The old usage
   * EaseBackInOut.create(action);
   * //The new usage
   * action.easing(easeBackInOut());
   */
  export class EaseBackInOut extends ActionEase {
    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseBackInOut}
     */
    public clone(): EaseBackInOut;

    /**
     * Create a action. Opposite with the original motion trajectory.
     * @return {EaseBackInOut}
     */
    public reverse(): EaseBackInOut;
  }

  //_easeBackInOutObj = {
  //    easing: function (time1) {
  //        var overshoot = 1.70158 * 1.525;
  //        time1 = time1 * 2;
  //        if (time1 < 1) {
  //            return (time1 * time1 * ((overshoot + 1) * time1 - overshoot)) / 2;
  //        } else {
  //            time1 = time1 - 2;
  //            return (time1 * time1 * ((overshoot + 1) * time1 + overshoot)) / 2 + 1;
  //        }
  //    },
  //    reverse: function(){
  //        return _easeBackInOutObj;
  //    }
  //};

  /**
   * Creates the action easing object. <br />
   * Begining of EaseBackIn. Ending of EaseBackOut.
   * @function
   * @return {Object}
   * @example
   * // example
   * action.easing(easeBackInOut());
   */
  export function easeBackInOut(): EaseBackInOut;

  /**
   * EaseBezierAction action. <br />
   * Manually set a 4 order Bessel curve. <br />
   * According to the set point, calculate the trajectory.
   * @class
   * @extends ActionEase
   * @param {Action} action
   *
   * @deprecated since v3.0 <br /> Please use action.easing(easeBezierAction())
   *
   * @example
   * //The old usage
   * var action = EaseBezierAction.create(action);
   * action.setBezierParamer(0.5, 0.5, 1.0, 1.0);
   * //The new usage
   * action.easing(easeBezierAction(0.5, 0.5, 1.0, 1.0));
   */
  export class EaseBezierAction extends ActionEase {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
     * Initialization requires the application of Bessel curve of action.
     * @param {Action} action
     */
    public ctor(action: Action): void;
    public ctor(): void;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseBezierAction}
     */
    public clone(): EaseBezierAction;

    /**
     * Create a action. Opposite with the original motion trajectory.
     * @return {EaseBezierAction}
     */
    public reverse(): EaseBezierAction;

    /**
     * Set of 4 reference point
     * @param p0
     * @param p1
     * @param p2
     * @param p3
     */
    public setBezierParamer(p0: number, p1: number, p2: number, p3: number): void;
  }

  /**
   * Creates the action easing object. <br />
   * Into the 4 reference point. <br />
   * To calculate the motion curve.
   * @param {Number} p0 The first bezier parameter
   * @param {Number} p1 The second bezier parameter
   * @param {Number} p2 The third bezier parameter
   * @param {Number} p3 The fourth bezier parameter
   * @returns {Object}
   * @example
   * // example
   * action.easing(easeBezierAction(0.5, 0.5, 1.0, 1.0));
   */
  export function easeBezierAction(
    p0: number,
    p1: number,
    p2: number,
    p3: number
  ): EaseBezierAction;

  /**
   * EaseQuadraticActionIn action. <br />
   * Reference easeInQuad: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @class
   * @extends ActionEase
   *
   * @deprecated since v3.0 <br /> Please use action.easing(easeQuadraticAction())
   *
   * @example
   * //The old usage
   * EaseQuadraticActionIn.create(action);
   * //The new usage
   * action.easing(easeQuadraticActionIn());
   */
  export class EaseQuadraticActionIn extends ActionEase {
    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseQuadraticActionIn}
     */
    public clone(): EaseQuadraticActionIn;

    /**
     * Create a action. Opposite with the original motion trajectory.
     * @return {EaseQuadraticActionIn}
     */
    public reverse(): EaseQuadraticActionIn;
  }

  //_easeQuadraticActionIn = {
  //    easing: EaseQuadraticActionIn.prototype._updateTime,
  //    reverse: function(){
  //        return _easeQuadraticActionIn;
  //    }
  //};

  /**
   * Creates the action easing object. <br />
   * Reference easeInQuad: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @returns {Object}
   * @example
   * //example
   * action.easing(easeQuadraticActionIn());
   */
  export function easeQuadraticActionIn(): EaseQuadraticActionIn;

  /**
   * EaseQuadraticActionIn action. <br />
   * Reference easeOutQuad: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @class
   * @extends ActionEase
   *
   * @deprecated since v3.0 <br /> Please use action.easing(easeQuadraticActionOut())
   *
   * @example
   * //The old usage
   * EaseQuadraticActionOut.create(action);
   * //The new usage
   * action.easing(easeQuadraticActionOut());
   */
  export class EaseQuadraticActionOut extends ActionEase {
    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseQuadraticActionOut}
     */
    public clone(): EaseQuadraticActionOut;

    /**
     * Create a action. Opposite with the original motion trajectory.
     * @return {EaseQuadraticActionOut}
     */
    public reverse(): EaseQuadraticActionOut;
  }

  //_easeQuadraticActionOut = {
  //    easing: EaseQuadraticActionOut.prototype._updateTime,
  //    reverse: function(){
  //        return _easeQuadraticActionOut;
  //    }
  //};

  /**
   * Creates the action easing object. <br />
   * Reference easeOutQuad: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @function
   * @returns {Object}
   * @example
   * //example
   * action.easing(easeQuadraticActionOut());
   */
  export function easeQuadraticActionOut(): EaseQuadraticActionOut;

  /**
   * EaseQuadraticActionInOut action. <br />
   * Reference easeInOutQuad: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @class
   * @extends ActionEase
   *
   * @deprecated since v3.0 <br /> Please use action.easing(easeQuadraticActionInOut())
   *
   * @example
   * //The old usage
   * EaseQuadraticActionInOut.create(action);
   * //The new usage
   * action.easing(easeQuadraticActionInOut());
   */
  export class EaseQuadraticActionInOut extends ActionEase {
    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseQuadraticActionInOut}
     */
    public clone(): EaseQuadraticActionInOut;

    /**
     * Create a action. Opposite with the original motion trajectory.
     * @return {EaseQuadraticActionInOut}
     */
    public reverse(): EaseQuadraticActionInOut;
  }

  //_easeQuadraticActionInOut = {
  //    easing: EaseQuadraticActionInOut.prototype._updateTime,
  //    reverse: function(){
  //        return _easeQuadraticActionInOut;
  //    }
  //};

  /**
   * Creates the action easing object. <br />
   * Reference easeInOutQuad: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @function
   * @returns {Object}
   * @example
   * //example
   * action.easing(easeQuadraticActionInOut());
   */
  export function easeQuadraticActionInOut(): EaseQuadraticActionInOut;

  /**
   * EaseQuarticActionIn action. <br />
   * Reference easeInQuart: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @class
   * @extends ActionEase
   *
   * @deprecated since v3.0 <br /> Please use action.easing(easeQuarticActionIn());
   *
   * @example
   * //The old usage
   * EaseQuarticActionIn.create(action);
   * //The new usage
   * action.easing(easeQuarticActionIn());
   */
  export class EaseQuarticActionIn extends ActionEase {
    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseQuarticActionIn}
     */
    public clone(): EaseQuarticActionIn;

    /**
     * Create a action. Opposite with the original motion trajectory.
     * @return {EaseQuarticActionIn}
     */
    public reverse(): EaseQuarticActionIn;
  }

  //_easeQuarticActionIn = {
  //    easing: EaseQuarticActionIn.prototype._updateTime,
  //    reverse: function(){
  //        return _easeQuarticActionIn;
  //    }
  //};

  /**
   * Creates the action easing object. <br />
   * Reference easeIntQuart: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @function
   * @returns {Object}
   * @example
   * //example
   * action.easing(easeQuarticActionIn());
   */
  export function easeQuarticActionIn(): EaseQuarticActionIn;

  /**
   * EaseQuarticActionOut action. <br />
   * Reference easeOutQuart: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @class
   * @extends ActionEase
   *
   * @deprecated since v3.0 <br /> Please use action.easing(QuarticActionOut());
   *
   * @example
   * //The old usage
   * EaseQuarticActionOut.create(action);
   * //The new usage
   * action.easing(EaseQuarticActionOut());
   */
  export class EaseQuarticActionOut extends ActionEase {
    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseQuarticActionOut}
     */
    public clone(): EaseQuarticActionOut;

    /**
     * Create a action. Opposite with the original motion trajectory.
     * @return {EaseQuarticActionOut}
     */
    public reverse(): EaseQuarticActionOut;
  }

  //_easeQuarticActionOut = {
  //    easing: EaseQuarticActionOut.prototype._updateTime,
  //    reverse: function(){
  //        return _easeQuarticActionOut;
  //    }
  //};

  /**
   * Creates the action easing object. <br />
   * Reference easeOutQuart: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @function
   * @returns {Object}
   * @example
   * //example
   * action.easing(QuarticActionOut());
   */
  export function easeQuarticActionOut(): EaseQuarticActionOut;

  /**
   * EaseQuarticActionInOut action. <br />
   * Reference easeInOutQuart: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @class
   * @extends ActionEase
   *
   * @deprecated since v3.0 <br /> Please use action.easing(easeQuarticActionInOut());
   *
   * @example
   * //The old usage
   * EaseQuarticActionInOut.create(action);
   * //The new usage
   * action.easing(easeQuarticActionInOut());
   */
  export class EaseQuarticActionInOut extends ActionEase {
    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseQuarticActionInOut}
     */
    public clone(): EaseQuarticActionInOut;

    /**
     * Create a action. Opposite with the original motion trajectory.
     * @return {EaseQuarticActionInOut}
     */
    public reverse(): EaseQuarticActionInOut;
  }

  //_easeQuarticActionInOut = {
  //    easing: EaseQuarticActionInOut.prototype._updateTime,
  //    reverse: function(){
  //        return _easeQuarticActionInOut;
  //    }
  //};

  /**
   * Creates the action easing object.  <br />
   * Reference easeInOutQuart: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @function
   * @returns {Object}
   */
  export function easeQuarticActionInOut(): EaseQuarticActionInOut;

  /**
   * EaseQuinticActionIn action. <br />
   * Reference easeInQuint: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @class
   * @extends ActionEase
   *
   * @deprecated since v3.0 <br /> Please use action.easing(easeQuinticActionIn());
   *
   * @example
   * //The old usage
   * EaseQuinticActionIn.create(action);
   * //The new usage
   * action.easing(easeQuinticActionIn());
   */
  export class EaseQuinticActionIn extends ActionEase {
    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseQuinticActionIn}
     */
    public clone(): EaseQuinticActionIn;

    /**
     * Create a action. Opposite with the original motion trajectory.
     * @return {EaseQuinticActionIn}
     */
    public reverse(): EaseQuinticActionIn;
  }

  //_easeQuinticActionIn = {
  //    easing: EaseQuinticActionIn.prototype._updateTime,
  //    reverse: function(){
  //        return _easeQuinticActionIn;
  //    }
  //};

  /**
   * Creates the action easing object. <br />
   * Reference easeInQuint: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @function
   * @returns {Object}
   * @example
   * //example
   * action.easing(easeQuinticActionIn());
   */
  export function easeQuinticActionIn(): EaseQuinticActionIn;

  /**
   * EaseQuinticActionOut action. <br />
   * Reference easeQuint: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @class
   * @extends ActionEase
   *
   * @deprecated since v3.0 <br /> Please use action.easing(easeQuadraticActionOut());
   *
   * @example
   * //The old usage
   * EaseQuinticActionOut.create(action);
   * //The new usage
   * action.easing(easeQuadraticActionOut());
   */
  export class EaseQuinticActionOut extends ActionEase {
    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseQuinticActionOut}
     */
    public clone(): EaseQuinticActionOut;

    /**
     * Create a action. Opposite with the original motion trajectory.
     * @return {EaseQuinticActionOut}
     */
    public reverse(): EaseQuinticActionOut;
  }

  //_easeQuinticActionOut = {
  //    easing: EaseQuinticActionOut.prototype._updateTime,
  //    reverse: function(){
  //        return _easeQuinticActionOut;
  //    }
  //};

  /**
   * Creates the action easing object. <br />
   * Reference easeOutQuint: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @function
   * @returns {Object}
   * @example
   * //example
   * action.easing(easeQuadraticActionOut());
   */
  export function easeQuinticActionOut(): EaseQuinticActionOut;

  /**
   * EaseQuinticActionInOut action. <br />
   * Reference easeInOutQuint: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @class
   * @extends ActionEase
   *
   * @deprecated since v3.0 <br /> Please use action.easing(easeQuinticActionInOut());
   *
   * @example
   * //The old usage
   * EaseQuinticActionInOut.create(action);
   * //The new usage
   * action.easing(easeQuinticActionInOut());
   */
  export class EaseQuinticActionInOut extends ActionEase {
    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseQuinticActionInOut}
     */
    public clone(): EaseQuinticActionInOut;

    /**
     * Create a action. Opposite with the original motion trajectory.
     * @return {EaseQuinticActionInOut}
     */
    public reverse(): EaseQuinticActionInOut;
  }

  //_easeQuinticActionInOut = {
  //    easing: EaseQuinticActionInOut.prototype._updateTime,
  //    reverse: function(){
  //        return _easeQuinticActionInOut;
  //    }
  //};

  /**
   * Creates the action easing object. <br />
   * Reference easeInOutQuint: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @function
   * @returns {Object}
   * @example
   * //example
   * action.easing(easeQuinticActionInOut());
   */
  export function easeQuinticActionInOut(): EaseQuinticActionInOut;

  /**
   * EaseCircleActionIn action. <br />
   * Reference easeInCirc: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @class
   * @extends ActionEase
   *
   * @deprecated since v3.0 <br /> Please use action.easing(easeCircleActionIn());
   *
   * @example
   * //The old usage
   * EaseCircleActionIn.create(action);
   * //The new usage
   * action.easing(easeCircleActionIn());
   */
  export class EaseCircleActionIn extends ActionEase {
    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseCircleActionIn}
     */
    public clone(): EaseCircleActionIn;

    /**
     * Create a action. Opposite with the original motion trajectory.
     * @return {EaseCircleActionIn}
     */
    public reverse(): EaseCircleActionIn;
  }

  //_easeCircleActionIn = {
  //    easing: EaseCircleActionIn.prototype._updateTime,
  //    reverse: function(){
  //        return _easeCircleActionIn;
  //    }
  //};

  /**
   * Creates the action easing object. <br />
   * Reference easeInCirc: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @function
   * @returns {Object}
   * @example
   * //example
   * action.easing(easeCircleActionIn());
   */
  export function easeCircleActionIn(): EaseCircleActionIn;

  /**
   * EaseCircleActionOut action. <br />
   * Reference easeOutCirc: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @class
   * @extends ActionEase
   *
   * @deprecated since v3.0 <br /> Please use action.easing(easeCircleActionOut());
   *
   * @example
   * //The old usage
   * EaseCircleActionOut.create(action);
   * //The new usage
   * action.easing(easeCircleActionOut());
   */
  export class EaseCircleActionOut extends ActionEase {
    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseCircleActionOut}
     */
    public clone(): EaseCircleActionOut;

    /**
     * Create a action. Opposite with the original motion trajectory.
     * @return {EaseCircleActionOut}
     */
    public reverse(): EaseCircleActionOut;
  }

  //_easeCircleActionOut = {
  //    easing: EaseCircleActionOut.prototype._updateTime,
  //    reverse: function(){
  //        return _easeCircleActionOut;
  //    }
  //};

  /**
   * Creates the action easing object. <br />
   * Reference easeOutCirc: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @function
   * @returns {Object}
   * @exampple
   * //example
   * actioneasing(easeCircleActionOut());
   */
  export function easeCircleActionOut(): EaseCircleActionOut;

  /**
   * EaseCircleActionInOut action. <br />
   * Reference easeInOutCirc: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @class
   * @extends ActionEase
   *
   * @deprecated since v3.0 <br /> Please use action.easing(easeCircleActionInOut());
   *
   * @example
   * //The old usage
   * EaseCircleActionInOut.create(action);
   * //The new usage
   * action.easing(easeCircleActionInOut());
   */
  export class EaseCircleActionInOut extends ActionEase {
    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseCircleActionInOut}
     */
    public clone(): EaseCircleActionInOut;

    /**
     * Create a action. Opposite with the original motion trajectory.
     * @return {EaseCircleActionInOut}
     */
    public reverse(): EaseCircleActionInOut;
  }

  //_easeCircleActionInOut = {
  //    easing: EaseCircleActionInOut.prototype._updateTime,
  //    reverse: function(){
  //        return _easeCircleActionInOut;
  //    }
  //};

  /**
   * Creates the action easing object. <br />
   * Reference easeInOutCirc: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @function
   * @returns {Object}
   * @example
   * //example
   * action.easing(easeCircleActionInOut());
   */
  export function easeCircleActionInOut(): EaseCircleActionInOut;

  /**
   * EaseCubicActionIn action. <br />
   * Reference easeInCubic: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @class
   * @extends ActionEase
   *
   * @deprecated since v3.0 <br /> action.easing(easeCubicActionIn());
   *
   * @example
   * //The old usage
   * EaseCubicActionIn.create(action);
   * //The new usage
   * action.easing(easeCubicActionIn());
   */
  export class EaseCubicActionIn extends ActionEase {
    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseCubicActionIn}
     */
    public clone(): EaseCubicActionIn;

    /**
     * Create a action. Opposite with the original motion trajectory.
     * @return {EaseCubicActionIn}
     */
    public reverse(): EaseCubicActionIn;
  }

  //_easeCubicActionIn = {
  //    easing: EaseCubicActionIn.prototype._updateTime,
  //    reverse: function(){
  //        return _easeCubicActionIn;
  //    }
  //};

  /**
   * Creates the action easing object. <br />
   * Reference easeInCubic: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @function
   * @returns {Object}
   * @example
   * //example
   * action.easing(easeCubicActionIn());
   */
  export function easeCubicActionIn(): EaseCubicActionIn;

  /**
   * EaseCubicActionOut action. <br />
   * Reference easeOutCubic: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @class
   * @extends ActionEase
   *
   * @deprecated since v3.0 <br /> Please use action.easing(easeCubicActionOut());
   *
   * @example
   * //The old usage
   * EaseCubicActionOut.create(action);
   * //The new usage
   * action.easing(easeCubicActionOut());
   */
  export class EaseCubicActionOut extends ActionEase {
    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseCubicActionOut}
     */
    public clone(): EaseCubicActionOut;

    /**
     * Create a action. Opposite with the original motion trajectory.
     * @return {EaseCubicActionOut}
     */
    public reverse(): EaseCubicActionOut;
  }

  //_easeCubicActionOut = {
  //    easing: EaseCubicActionOut.prototype._updateTime,
  //    reverse: function(){
  //        return _easeCubicActionOut;
  //    }
  //};

  /**
   * Creates the action easing object. <br />
   * Reference easeOutCubic: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @function
   * @returns {Object}
   * @example
   * //example
   * action.easing(easeCubicActionOut());
   */
  export function easeCubicActionOut(): EaseCubicActionOut;

  /**
   * EaseCubicActionInOut action. <br />
   * Reference easeInOutCubic: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @class
   * @extends ActionEase
   *
   * @deprecated since v3.0 <br /> Please use action.easing(easeCubicActionInOut());
   *
   * @example
   * //The old usage
   * EaseCubicActionInOut.create(action);
   * //The new usage
   * action.easing(easeCubicActionInOut());
   */
  export class EaseCubicActionInOut extends ActionEase {
    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @returns {EaseCubicActionInOut}
     */
    public clone(): EaseCubicActionInOut;

    /**
     * Create a action. Opposite with the original motion trajectory.
     * @return {EaseCubicActionInOut}
     */
    public reverse(): EaseCubicActionInOut;
  }

  //_easeCubicActionInOut = {
  //    easing: EaseCubicActionInOut.prototype._updateTime,
  //    reverse: function(){
  //        return _easeCubicActionInOut;
  //    }
  //};

  /**
   * Creates the action easing object. <br />
   * Reference easeInOutCubic: <br />
   * {@link http://www.zhihu.com/question/21981571/answer/19925418}
   * @function
   * @returns {Object}
   */
  export function easeCubicActionInOut(): EaseCubicActionInOut;

  // +--------------------------------------------------------------------------------
  // + File: cocos2d/core/base-nodes/CCActionInstant.js
  // +--------------------------------------------------------------------------------
  /**
   * Instant actions are immediate actions. They don't have a duration like.
   * the CCIntervalAction actions.
   * @class
   * @extends FiniteTimeAction
   */
  export class ActionInstant extends FiniteTimeAction {
    /**
     * returns a reversed action. <br />
     * For example: <br />
     * - The action will be x coordinates of 0 move to 100. <br />
     * - The reversed action will be x of 100 move to 0.
     * - Will be rewritten
     * @returns {Action}
     */
    public reverse(): ActionInstant;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @return {FiniteTimeAction}
     */
    public clone(): ActionInstant;
  }

  /**
   * Show the node.
   * @class
   * @extends ActionInstant
   */
  export class Show extends ActionInstant {
    /**
     * returns a reversed action. <br />
     * For example: <br />
     * - The action will be x coordinates of 0 move to 100. <br />
     * - The reversed action will be x of 100 move to 0.
     * - Will be rewritten
     * @returns {Hide}
     */
    public reverse(): Hide;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @return {FiniteTimeAction}
     */
    public clone(): Show;
  }

  /**
   * Show the Node.
   * @function
   * @return {Show}
   * @example
   * // example
   * var showAction = show();
   */
  export function show(): Show;

  /**
   * Hide the node.
   * @class
   * @extends ActionInstant
   */
  export class Hide extends ActionInstant {
    /**
     * returns a reversed action. <br />
     * For example: <br />
     * - The action will be x coordinates of 0 move to 100. <br />
     * - The reversed action will be x of 100 move to 0.
     * - Will be rewritten
     * @returns {Show}
     */
    public reverse(): Show;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @return {Hide}
     */
    public clone(): Hide;
  }

  /**
   * Hide the node.
   * @function
   * @return {Hide}
   * @example
   * // example
   * var hideAction = hide();
   */
  export function hide(): Hide;

  /**
   * Toggles the visibility of a node.
   * @class
   * @extends ActionInstant
   */
  export class ToggleVisibility extends ActionInstant {
    /**
     * returns a reversed action.
     * @returns {ToggleVisibility}
     */
    public reverse(): ToggleVisibility;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @return {ToggleVisibility}
     */
    public clone(): ToggleVisibility;
  }

  /**
   * Toggles the visibility of a node.
   * @function
   * @return {ToggleVisibility}
   * @example
   * // example
   * var toggleVisibilityAction = toggleVisibility();
   */
  export function toggleVisibility(): ToggleVisibility;

  /**
   * Delete self in the next frame.
   * @class
   * @extends ActionInstant
   * @param {Boolean} [isNeedCleanUp=true]
   *
   * @example
   * // example
   * var removeSelfAction = new RemoveSelf(false);
   */
  export class RemoveSelf extends ActionInstant {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
     * Create a RemoveSelf object with a flag indicate whether the target should be cleaned up while removing.
     * @param {Boolean} [isNeedCleanUp=true]
     */
    public ctor(isNeedCleanUp?: boolean): void;

    /**
     * Initialization of the node, please do not call this function by yourself, you should pass the parameters to constructor to initialize it .
     * @param isNeedCleanUp
     * @returns {boolean}
     */
    init(isNeedCleanUp?: boolean): boolean;

    /**
     * returns a reversed action.
     */
    public reverse(): RemoveSelf;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @return {RemoveSelf}
     */
    public clone(): RemoveSelf;
  }

  /**
   * Create a RemoveSelf object with a flag indicate whether the target should be cleaned up while removing.
   *
   * @function
   * @param {Boolean} [isNeedCleanUp=true]
   * @return {RemoveSelf}
   *
   * @example
   * // example
   * var removeSelfAction = removeSelf();
   */
  export function removeSelf(isNeedCleanUp?: boolean): RemoveSelf;

  /**
   * Flips the sprite horizontally.
   * @class
   * @extends ActionInstant
   * @param {Boolean} flip Indicate whether the target should be flipped or not
   *
   * @example
   * var flipXAction = new FlipX(true);
   */
  export class FlipX extends ActionInstant {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
     * Create a FlipX action to flip or unflip the target.
     * @param {Boolean} flip Indicate whether the target should be flipped or not
     */
    public ctor(flip: boolean): void;
    public ctor(): void;

    /**
     * initializes the action with a set flipX.
     * @param {Boolean} flip
     * @return {Boolean}
     */
    initWithFlipX(flip: boolean): void;

    /**
     * returns a reversed action.
     * @return {FlipX}
     */
    public reverse(): FlipX;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @return {FiniteTimeAction}
     */
    public clone(): FlipX;
  }

  /**
   * Create a FlipX action to flip or unflip the target.
   *
   * @function
   * @param {Boolean} flip Indicate whether the target should be flipped or not
   * @return {FlipX}
   * @example
   * var flipXAction = flipX(true);
   */
  export function flipX(flip: boolean): FlipX;

  /**
   * Flips the sprite vertically
   * @class
   * @extends ActionInstant
   * @param {Boolean} flip
   * @example
   * var flipYAction = new FlipY(true);
   */

  export class FlipY extends ActionInstant {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
     * Create a FlipY action to flip or unflip the target.
     *
     * @param {Boolean} flip
     */
    public ctor(flip: boolean): void;
    public ctor(): void;

    /**
     * initializes the action with a set flipY.
     * @param {Boolean} flip
     * @return {Boolean}
     */
    public initWithFlipY(flip: boolean): boolean;

    /**
     * returns a reversed action.
     * @return {FlipY}
     */
    public reverse(): FlipY;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @return {FlipY}
     */
    public clone(): FlipY;
  }

  /**
   * Create a FlipY action to flip or unflip the target.
   *
   * @function
   * @param {Boolean} flip
   * @return {FlipY}
   * @example
   * var flipYAction = flipY(true);
   */
  export function flipY(flip: boolean): FlipY;

  /**
   * Places the node in a certain position
   * @class
   * @extends ActionInstant
   * @param {Point|Number} pos
   * @param {Number} [y]
   * @example
   * var placeAction = new Place(p(200, 200));
   * var placeAction = new Place(200, 200);
   */
  export class Place extends ActionInstant {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
     * Creates a Place action with a position.
     * @param {Point|Number} pos
     * @param {Number} [y]
     */
    public ctor(pos: Point | number, y?: number): void;
    public ctor(): void;

    /**
     * Initializes a Place action with a position
     * @param {number} pos
     * @param {number} [y]
     * @return {Boolean}
     */
    public initWithPosition(pos: Point | number, y?: number): boolean;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @return {Place}
     */
    public clone(): Place;
  }

  /**
   * Creates a Place action with a position.
   * @function
   * @param {Point|Number} pos
   * @param {Number} [y]
   * @return {Place}
   * @example
   * // example
   * var placeAction = place(p(200, 200));
   * var placeAction = place(200, 200);
   */
  export function place(pos: Point | number, y?: number): Place;

  /**
   * Calls a 'callback'.
   * @class
   * @extends ActionInstant
   * @param {function} selector
   * @param {object|null} [selectorTarget]
   * @param {*|null} [data] data for function, it accepts all data types.
   * @example
   * // example
   * // CallFunc without data
   * var finish = new CallFunc(this.removeSprite, this);
   *
   * // CallFunc with data
   * var finish = new CallFunc(this.removeFromParentAndCleanup, this,  true);
   */
  export class CallFunc extends ActionInstant {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
     * Creates a CallFunc action with the callback.
     * @param {function} selector
     * @param {object|null} [selectorTarget]
     * @param {*|null} [data] data for function, it accepts all data types.
     */
    public ctor(selector: CallFuncCallback, selectorTarget?: any, data?: any): void;
    public ctor(): void;

    /**
     * Initializes the action with a function or function and its target
     * @param {function} selector
     * @param {object|Null} selectorTarget
     * @param {*|Null} [data] data for function, it accepts all data types.
     * @return {Boolean}
     */
    public initWithFunction(selector: CallFuncCallback, selectorTarget?: any, data?: any): boolean;

    /**
     * execute the function.
     */
    public execute(): void;

    /**
     * Get selectorTarget.
     * @return {object}
     */
    public getTargetCallback(): CallFuncCallback;

    /**
     * Set selectorTarget.
     * @param {object} sel
     */
    public setTargetCallback(sel: CallFuncCallback): void;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @return {CallFunc}
     */
    public clone(): CallFunc;
  }

  /**
   * Creates the action with the callback
   * @function
   * @param {function} selector
   * @param {object|null} [selectorTarget]
   * @param {*|null} [data] data for function, it accepts all data types.
   * @return {CallFunc}
   * @example
   * // example
   * // CallFunc without data
   * var finish = callFunc(this.removeSprite, this);
   *
   * // CallFunc with data
   * var finish = callFunc(this.removeFromParentAndCleanup, this._grossini,  true);
   */
  export function callFunc(selector: CallFuncCallback, selectorTarget?: any, data?: any): CallFunc;

  // +--------------------------------------------------------------------------------
  // + File: cocos2d/core/base-nodes/CCActionInterval.js
  // +--------------------------------------------------------------------------------
  /**
   * <p> An interval action is an action that takes place within a certain period of time. <br/>
   * It has an start time, and a finish time. The finish time is the parameter<br/>
   * duration plus the start time.</p>
   *
   * <p>These CCActionInterval actions have some interesting properties, like:<br/>
   * - They can run normally (default)  <br/>
   * - They can run reversed with the reverse method   <br/>
   * - They can run with the time altered with the Accelerate, AccelDeccel and Speed actions. </p>
   *
   * <p>For example, you can simulate a Ping Pong effect running the action normally and<br/>
   * then running it again in Reverse mode. </p>
   *
   * @class
   * @extends FiniteTimeAction
   * @param {Number} d duration in seconds
   * @example
   * var actionInterval = new ActionInterval(3);
   */
  export class ActionInterval extends FiniteTimeAction {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @param {Number} d duration in seconds
     */
    public ctor(d: number): void;
    public ctor(): void;

    /**
     * How many seconds had elapsed since the actions started to run.
     * @return {Number}
     */
    public getElapsed(): number;

    /**
     * Initializes the action.
     * @param {Number} d duration in seconds
     * @return {Boolean}
     */
    public initWithDuration(d: number): boolean;

    /**
     * Returns a new clone of the action.
     * @returns {ActionInterval}
     */
    public clone(): ActionInterval;

    /**
     * Implementation of ease motion.
     *
     * @example
     * //example
     * action.easeing(easeIn(3.0));
     * @param {Object} easeObj
     * @returns {ActionInterval}
     */
    // TODO: Shouldn't this parameter type be ActionEase instead of any?
    public easing(easeObj: any): ActionInterval;

    /**
     * returns a reversed action. <br />
     * Will be overwrite.
     *
     * @return {null}
     */
    public reverse(): ActionInterval;

    /**
     * Set amplitude rate.
     * @warning It should be overridden in subclass.
     * @param {Number} amp
     */
    public setAmplitudeRate(amp: number): void;

    /**
     * Get amplitude rate.
     * @warning It should be overridden in subclass.
     * @return {Number} 0
     */
    public getAmplitudeRate(): number;

    /**
     * Changes the speed of an action, making it take longer (speed>1)
     * or less (speed<1) time. <br/>
     * Useful to simulate 'slow motion' or 'fast forward' effect.
     *
     * @param speed
     * @returns {Action}
     */
    public speed(speed: number): ActionInterval;

    /**
     * Get this action speed.
     * @return {Number}
     */
    public getSpeed(): number;

    /**
     * Set this action speed.
     * @param {Number} speed
     * @returns {ActionInterval}
     */
    public setSpeed(speed: number): ActionInterval;

    /**
     * Repeats an action a number of times.
     * To repeat an action forever use the CCRepeatForever action.
     * @param times
     * @returns {ActionInterval}
     */
    public repeat(times: number): ActionInterval;

    /**
     * Repeats an action for ever.  <br/>
     * To repeat the an action for a limited number of times use the Repeat action. <br/>
     * @returns {ActionInterval}
     */
    public repeatForever(): ActionInterval;
  }

  /**
   * An interval action is an action that takes place within a certain period of time.
   * @function
   * @param {Number} d duration in seconds
   * @return {ActionInterval}
   * @example
   * // example
   * var actionInterval = actionInterval(3);
   */
  export function actionInterval(d: number): ActionInterval;

  /**
   * Runs actions sequentially, one after another.
   * @class
   * @extends ActionInterval
   * @param {Array|FiniteTimeAction} tempArray
   * @example
   * // create sequence with actions
   * var seq = new Sequence(act1, act2);
   *
   * // create sequence with array
   * var seq = new Sequence(actArray);
   */
  export class Sequence extends ActionInterval {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
     * Create an array of sequenceable actions.
     * @param {Array|FiniteTimeAction} tempArray
     */
    public ctor(actions: FiniteTimeAction[]): void;
    public ctor(...actions: FiniteTimeAction[]): void;
    public ctor(): void;

    /**
     * Initializes the action <br/>
     * @param {FiniteTimeAction} actionOne
     * @param {FiniteTimeAction} actionTwo
     * @return {Boolean}
     */
    public initWithTwoActions(actionOne: FiniteTimeAction, actionTwo: FiniteTimeAction): boolean;

    /**
     * returns a new clone of the action
     * @returns {Sequence}
     */
    public clone(): Sequence;

    /**
     * Returns a reversed action.
     * @return {Sequence}
     */
    public reverse(): Sequence;
  }

  /**
   *
   *
   * helper constructor to create an array of sequenceable actions
   * @function
   * @param {Array|FiniteTimeAction} tempArray  Notice: parameters should not be ending with null in Javascript
   * @return {Sequence}
   * @example
   * // create sequence with array
   * var seq = sequence(actArray);
   * todo: It should be use new
   */
  export function sequence(actions: FiniteTimeAction[]): Sequence;
  /**
   *
   *
   * helper constructor to create an array of sequenceable actions
   * @function
   * @param {Array|FiniteTimeAction} tempArray  Notice: parameters should not be ending with null in Javascript
   * @return {Sequence}
   * @example
   * // example
   * // create sequence with actions
   * var seq = sequence(act1, act2);
   */
  export function sequence(...actions: FiniteTimeAction[]): Sequence;

  /**
   * Repeats an action a number of times.
   * To repeat an action forever use the CCRepeatForever action.
   * @class
   * @extends ActionInterval
   * @param {FiniteTimeAction} action
   * @param {Number} times
   * @example
   * var rep = new Repeat(sequence(jump2, jump1), 5);
   */
  export class Repeat extends ActionInterval {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
     * Creates a Repeat action. Times is an unsigned integer between 1 and pow(2,30).
     * @param {FiniteTimeAction} action
     * @param {Number} times
     */
    public ctor(action: FiniteTimeAction, times: number): void;
    public ctor(): void;

    /**
     * @param {FiniteTimeAction} action
     * @param {Number} times
     * @return {Boolean}
     */
    public initWithAction(action: FiniteTimeAction, times: number): boolean;

    /**
     * returns a new clone of the action
     * @returns {Repeat}
     */
    public clone(): Repeat;

    /**
     * returns a reversed action.
     * @return {Repeat}
     */
    public reverse(): Repeat;

    /**
     * Set inner Action.
     * @param {FiniteTimeAction} action
     */
    public setInnerAction(action: FiniteTimeAction): void;

    /**
     * Get inner Action.
     * @return {FiniteTimeAction}
     */
    public getInnerAction(): FiniteTimeAction;

    /** creates a CCRepeat action. Times is an unsigned integer between 1 and pow(2,30)
     * @param {cc.FiniteTimeAction} action
     * @param {Number} times
     * @return {cc.Repeat}
     * @example
     * // example
     * var rep = cc.Repeat.create(cc.Sequence.create(jump2, jump1), 5);
     */
    static create(action: FiniteTimeAction, times: number): Repeat;
  }

  /**
   * Creates a Repeat action. Times is an unsigned integer between 1 and pow(2,30)
   * @function
   * @param {FiniteTimeAction} action
   * @param {Number} times
   * @return {Repeat}
   * @example
   * // example
   * var rep = repeat(sequence(jump2, jump1), 5);
   */
  export function repeat(action: FiniteTimeAction, times: number): Repeat;

  /**  Repeats an action for ever.  <br/>
   * To repeat the an action for a limited number of times use the Repeat action. <br/>
   * @warning This action can't be Sequenceable because it is not an IntervalAction
   * @class
   * @extends ActionInterval
   * @param {FiniteTimeAction} action
   * @example
   * var rep = new RepeatForever(sequence(jump2, jump1), 5);
   */
  export class RepeatForever extends ActionInterval {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
     * Create a acton which repeat forever.
     * @param {FiniteTimeAction} action
     */
    public ctor(action: FiniteTimeAction): void;
    public ctor(): void;

    /**
     * @param {ActionInterval} action
     * @return {Boolean}
     */
    public initWithAction(action: FiniteTimeAction): boolean;

    /**
     * returns a new clone of the action
     * @returns {RepeatForever}
     */
    public clone(): RepeatForever;

    /**
     * Returns a reversed action.
     * @return {RepeatForever}
     */
    public reverse(): RepeatForever;

    /**
     * Set inner action.
     * @param {ActionInterval} action
     */
    public setInnerAction(action: ActionInterval): void;

    /**
     * Get inner action.
     * @return {ActionInterval}
     */
    public getInnerAction(): ActionInterval;

    /**
     * Repeat the acton forever
     * @param action
     * @return {cc.RepeatForever}
     * @example
     * // example
     * var repeat = cc.RepeatForever.create(cc.RotateBy.create(1.0, 360));
     */
    static create(action: FiniteTimeAction): RepeatForever;
  }

  /**
   * Create a acton which repeat forever
   * @function
   * @param {FiniteTimeAction} action
   * @return {RepeatForever}
   * @example
   * // example
   * var repeat = repeatForever(rotateBy(1.0, 360));
   */
  export function repeatForever(action: FiniteTimeAction): RepeatForever;

  /** Spawn a new action immediately
   * @class
   * @extends ActionInterval
   */
  export class Spawn extends ActionInterval {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @param {Array|FiniteTimeAction} tempArray
     */
    public ctor(tempArray: FiniteTimeAction[]): void;
    public ctor(): void;

    /** initializes the Spawn action with the 2 actions to spawn
     * @param {FiniteTimeAction} action1
     * @param {FiniteTimeAction} action2
     * @return {Boolean}
     */
    public initWithTwoActions(action1: FiniteTimeAction, action2: FiniteTimeAction): boolean;

    /**
     * returns a new clone of the action
     * @returns {Spawn}
     */
    public clone(): Spawn;

    /**
     * Returns a reversed action.
     * @return {Spawn}
     */
    public reverse(): Spawn;

    /**
     * @param {Array|cc.FiniteTimeAction}tempArray
     * @return {cc.FiniteTimeAction}
     * @example
     * // example
     * var action = cc.Spawn.create(cc.JumpBy.create(2, cc.p(300, 0), 50, 4), cc.RotateBy.create(2, 720));
     */
    static create(...rest: FiniteTimeAction[]): Spawn;
  }

  /**
   * Create a spawn action which runs several actions in parallel.
   * @function
   * @param {Array|FiniteTimeAction}tempArray
   * @return {FiniteTimeAction}
   * @example
   * // example
   * var action = spawn(jumpBy(2, p(300, 0), 50, 4), rotateBy(2, 720));
   * todo:It should be the direct use new
   */
  export function spawn(tempArray: FiniteTimeAction[]): FiniteTimeAction;
  export function spawn(...tempArray: FiniteTimeAction[]): FiniteTimeAction;

  /**
   * Rotates a Node object to a certain angle by modifying it's.
   * rotation attribute. <br/>
   * The direction will be decided by the shortest angle.
   * @class
   * @extends ActionInterval
   * @param {Number} duration duration in seconds
   * @param {Number} deltaAngleX deltaAngleX in degrees.
   * @param {Number} [deltaAngleY] deltaAngleY in degrees.
   * @example
   * var rotateTo = new RotateTo(2, 61.0);
   */
  export class RotateTo extends ActionInterval {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
     * Creates a RotateTo action with x and y rotation angles.
     * @param {Number} duration duration in seconds
     * @param {Number} deltaAngleX deltaAngleX in degrees.
     * @param {Number} [deltaAngleY] deltaAngleY in degrees.
     */
    public ctor(duration: number, deltaAngleX: number, deltaAngleY: number): void;
    public ctor(): void;

    /**
     * Initializes the action.
     * @param {Number} duration
     * @param {Number} deltaAngleX
     * @param {Number} deltaAngleY
     * @return {Boolean}
     */
    public initWithDuration(duration: number, deltaAngleX: number, deltaAngleY: number): boolean;
    public initWithDuration(duration: number): boolean;

    /**
     * returns a new clone of the action
     * @returns {RotateTo}
     */
    public clone(): RotateTo;

    /**
     * RotateTo reverse not implemented.
     * Will be overridden.
     */
    public reverse(): RotateTo;

    /**
     * creates the action with separate rotation angles
     * @param {Number} duration duration in seconds
     * @param {Number} deltaAngleX deltaAngleX in degrees.
     * @param {Number} deltaAngleY deltaAngleY in degrees.
     * @return {cc.RotateTo}
     * @example
     * // example
     * var rotateTo = cc.RotateTo.create(2, 61.0);
     */
    static create(duration: number, deltaAngleX: number, deltaAngleY?: number): RotateTo;
  }

  /**
   * Creates a RotateTo action with separate rotation angles.
   * To specify the angle of rotation.
   * @function
   * @param {Number} duration duration in seconds
   * @param {Number} deltaAngleX deltaAngleX in degrees.
   * @param {Number} [deltaAngleY] deltaAngleY in degrees.
   * @return {RotateTo}
   * @example
   * // example
   * var rotateTo = rotateTo(2, 61.0);
   */
  export function rotateTo(duration: number, deltaAngleX: number, deltaAngleY?: number): RotateTo;

  /**
   * Rotates a Node object clockwise a number of degrees by modifying it's rotation attribute.
   * Relative to its properties to modify.
   * @class
   * @extends  ActionInterval
   * @param {Number} duration duration in seconds
   * @param {Number} deltaAngleX deltaAngleX in degrees
   * @param {Number} [deltaAngleY] deltaAngleY in degrees
   * @example
   * var actionBy = new RotateBy(2, 360);
   */
  export class RotateBy extends ActionInterval {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @param {Number} duration duration in seconds
     * @param {Number} deltaAngleX deltaAngleX in degrees
     * @param {Number} [deltaAngleY] deltaAngleY in degrees
     */
    public ctor(duration: number, deltaAngleX: number, deltaAngleY: number): void;
    public ctor(): void;

    /**
     * Initializes the action.
     * @param {Number} duration duration in seconds
     * @param {Number} deltaAngleX deltaAngleX in degrees
     * @param {Number} [deltaAngleY=] deltaAngleY in degrees
     * @return {Boolean}
     */
    public initWithDuration(duration: number, deltaAngleX: number, deltaAngleY: number): boolean;
    public initWithDuration(duration: number): boolean;

    /**
     * returns a new clone of the action
     * @returns {RotateBy}
     */
    public clone(): RotateBy;

    /**
     * Returns a reversed action.
     * @return {RotateBy}
     */
    public reverse(): RotateBy;

    /**
     * @param {Number} duration druation in seconds
     * @param {Number} deltaAngleX deltaAngleX in degrees
     * @param {Number} deltaAngleY deltaAngleY in degrees
     * @return {cc.RotateBy}
     * @example
     * // example
     * var actionBy = cc.RotateBy.create(2, 360);
     */
    static create(duration: number, deltaAngleX: number, deltaAngleY: number): RotateBy;
  }

  /**
   * Rotates a Node object clockwise a number of degrees by modifying it's rotation attribute.
   * Relative to its properties to modify.
   * @function
   * @param {Number} duration duration in seconds
   * @param {Number} deltaAngleX deltaAngleX in degrees
   * @param {Number} [deltaAngleY] deltaAngleY in degrees
   * @return {RotateBy}
   * @example
   * // example
   * var actionBy = rotateBy(2, 360);
   */
  export function rotateBy(duration: number, deltaAngleX: number, deltaAngleY: number): RotateBy;

  /**
   * <p>
   *     Moves a CCNode object x,y pixels by modifying it's position attribute.                                  <br/>
   *     x and y are relative to the position of the object.                                                     <br/>
   *     Several CCMoveBy actions can be concurrently called, and the resulting                                  <br/>
   *     movement will be the sum of individual movements.
   * </p>
   * @class
   * @extends ActionInterval
   * @param {Number} duration duration in seconds
   * @param {Point|Number} deltaPos
   * @param {Number} [deltaY]
   * @example
   * var actionTo = moveBy(2, p(windowSize.width - 40, windowSize.height - 40));
   */
  export class MoveBy extends ActionInterval {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @param {Number} duration duration in seconds
     * @param {Point|Number} deltaPos
     * @param {Number} [deltaY]
     */
    public ctor(duration: number, deltaPos: number | Point, deltaY?: number): void;
    public ctor(): void;

    /**
     * Initializes the action.
     * @param {Number} duration duration in seconds
     * @param {Point} position
     * @param {Number} [y]
     * @return {Boolean}
     */
    public initWithDuration(duration: number, position: number | Point, y?: number): boolean;
    public initWithDuration(duration: number): boolean;

    /**
     * returns a new clone of the action
     * @returns {MoveBy}
     */
    public clone(): MoveBy;

    /**
     * MoveTo reverse is not implemented
     * @return {MoveBy}
     */
    public reverse(): MoveBy;

    /**
     * @param {Number} duration duration in seconds
     * @param {cc.Point} position
     * @return {cc.MoveBy}
     * @example
     * // example
     * var actionBy = cc.MoveBy.create(2, cc.p(80, 80));
     */
    static create(duration: number, position: Point): MoveBy;
  }

  /**
   * Create the action.
   * Relative to its coordinate moves a certain distance.
   * @function
   * @param {Number} duration duration in seconds
   * @param {Point|Number} deltaPos
   * @param {Number} deltaY
   * @return {MoveBy}
   * @example
   * // example
   * var actionTo = moveBy(2, p(windowSize.width - 40, windowSize.height - 40));
   */
  export function moveBy(duration: number, deltaPos: number | Point, deltaY?: number): MoveBy;

  /**
   * Moves a CCNode object to the position x,y. x and y are absolute coordinates by modifying it's position attribute. <br/>
   * Several CCMoveTo actions can be concurrently called, and the resulting                                            <br/>
   * movement will be the sum of individual movements.
   * @class
   * @extends MoveBy
   * @param {Number} duration duration in seconds
   * @param {Point|Number} position
   * @param {Number} y
   * @example
   * var actionBy = new MoveTo(2, p(80, 80));
   */
  export class MoveTo extends MoveBy {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @param {Number} duration duration in seconds
     * @param {Point|Number} position
     * @param {Number} y
     */
    public ctor(duration: number, position: number | Point, y: number): void;
    public ctor(): void;

    /**
     * Initializes the action.
     * @param {Number} duration  duration in seconds
     * @param {Point} position
     * @param {Number} y
     * @return {Boolean}
     */
    public initWithDuration(duration: number, position: number | Point, y: number): boolean;
    public initWithDuration(duration: number): boolean;

    /**
     * returns a new clone of the action
     * @returns {MoveTo}
     */
    public clone(): MoveTo;

    /**
     * @param {Number} duration duration in seconds
     * @param {cc.Point} position
     * @return {cc.MoveTo}
     * @example
     * // example
     * var actionTo = cc.MoveTo.create(2, cc.p(windowSize.width - 40, windowSize.height - 40));
     */
    static create(duration: number, position: Point): MoveTo;
  }

  /**
   * Create new action.
   * Moving to the specified coordinates.
   * @function
   * @param {Number} duration duration in seconds
   * @param {Point} position
   * @param {Number} y
   * @return {MoveBy}
   * @example
   * // example
   * var actionBy = moveTo(2, p(80, 80));
   */
  export function moveTo(duration: number, position: number | Point, y?: number): MoveTo;

  /**
   * Skews a Node object to given angles by modifying it's skewX and skewY attributes
   * @class
   * @extends ActionInterval
   * @param {Number} t time in seconds
   * @param {Number} sx
   * @param {Number} sy
   * @example
   * var actionTo = new SkewTo(2, 37.2, -37.2);
   */
  export class SkewTo extends ActionInterval {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @param {Number} t time in seconds
     * @param {Number} sx
     * @param {Number} sy
     */
    public ctor(t: number, sx: number, sy: number): void;
    public ctor(): void;

    /**
     * Initializes the action.
     * @param {Number} t time in seconds
     * @param {Number} sx
     * @param {Number} sy
     * @return {Boolean}
     */
    public initWithDuration(t: number, sx: number, sy: number): boolean;
    public initWithDuration(duration: number): boolean;

    /**
     * returns a new clone of the action
     * @returns {SkewTo}
     */
    public clone(): SkewTo;

    /**
     * Create new action.
     * Skews a Node object to given angles by modifying it's skewX and skewY attributes.
     * Changes to the specified value.
     * @param {Number} t time in seconds
     * @param {Number} sx
     * @param {Number} sy
     * @return {cc.SkewTo}
     * @example
     * // example
     * var actionTo = cc.SkewTo.create(2, 37.2, -37.2);
     */
    static create(t: number, sx: number, sy: number): SkewTo;
  }

  /**
   * Create new action.
   * Skews a Node object to given angles by modifying it's skewX and skewY attributes.
   * Changes to the specified value.
   * @function
   * @param {Number} t time in seconds
   * @param {Number} sx
   * @param {Number} sy
   * @return {SkewTo}
   * @example
   * // example
   * var actionTo = skewTo(2, 37.2, -37.2);
   */
  export function skewTo(t: number, sx: number, sy: number): SkewTo;

  /**
   * Skews a Node object by skewX and skewY degrees.
   * Relative to its attribute modification.
   * @class
   * @extends SkewTo
   * @param {Number} t time in seconds
   * @param {Number} sx  skew in degrees for X axis
   * @param {Number} sy  skew in degrees for Y axis
   */
  export class SkewBy extends SkewTo {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @param {Number} t time in seconds
     * @param {Number} sx  skew in degrees for X axis
     * @param {Number} sy  skew in degrees for Y axis
     */
    public ctor(t: number, sx: number, sy: number): void;
    public ctor(): void;

    /**
     * Initializes the action.
     * @param {Number} t time in seconds
     * @param {Number} sx  skew in degrees for X axis
     * @param {Number} sy  skew in degrees for Y axis
     * @return {Boolean}
     */
    public initWithDuration(t: number, sx: number, sy: number): boolean;
    public initWithDuration(duration: number): boolean;

    /**
     * returns a new clone of the action
     * @returns {SkewBy}
     */
    public clone(): SkewBy;

    /**
     * Returns a reversed action.
     * @return {SkewBy}
     */
    public reverse(): SkewBy;

    /**
     * Skews a Node object by skewX and skewY degrees. <br />
     * Relative to its attribute modification.
     * @param {Number} t time in seconds
     * @param {Number} sx sx skew in degrees for X axis
     * @param {Number} sy sy skew in degrees for Y axis
     * @return {cc.SkewBy}
     * @example
     * // example
     * var actionBy = cc.SkewBy.create(2, 0, -90);
     */
    static create(t: number, sx: number, sy: number): SkewBy;
  }

  /**
   * Skews a Node object by skewX and skewY degrees. <br />
   * Relative to its attribute modification.
   * @function
   * @param {Number} t time in seconds
   * @param {Number} sx sx skew in degrees for X axis
   * @param {Number} sy sy skew in degrees for Y axis
   * @return {SkewBy}
   * @example
   * // example
   * var actionBy = skewBy(2, 0, -90);
   */
  export function skewBy(t: number, sx: number, sy: number): SkewBy;

  /**
   * Moves a Node object simulating a parabolic jump movement by modifying it's position attribute.
   * Relative to its movement.
   * @class
   * @extends ActionInterval
   * @param {Number} duration
   * @param {Point|Number} position
   * @param {Number} [y]
   * @param {Number} height
   * @param {Number} jumps
   * @example
   * var actionBy = new JumpBy(2, p(300, 0), 50, 4);
   * var actionBy = new JumpBy(2, 300, 0, 50, 4);
   */
  export class JumpBy extends ActionInterval {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @param {Number} duration
     * @param {Point|Number} position
     * @param {Number} [y]
     * @param {Number} height
     * @param {Number} jumps
     */
    public ctor(
      duration: number,
      position: number | Point,
      y?: number,
      height?: number,
      jumps?: number
    ): void;
    public ctor(): void;

    /**
     * Initializes the action.
     * @param {Number} duration
     * @param {Point|Number} position
     * @param {Number} [y]
     * @param {Number} height
     * @param {Number} jumps
     * @return {Boolean}
     * @example
     * actionBy.initWithDuration(2, p(300, 0), 50, 4);
     * actionBy.initWithDuration(2, 300, 0, 50, 4);
     */
    public initWithDuration(
      duration: number,
      position: number | Point,
      y?: number,
      height?: number,
      jumps?: number
    ): boolean;
    public initWithDuration(duration: number): boolean;

    /**
     * returns a new clone of the action
     * @returns {JumpBy}
     */
    public clone(): JumpBy;

    /**
     * Returns a reversed action.
     * @return {JumpBy}
     */
    public reverse(): JumpBy;

    /**
     * Moves a Node object simulating a parabolic jump movement by modifying it's position attribute.
     * Relative to its movement.
     * @param {Number} duration
     * @param {cc.Point} position
     * @param {Number} height
     * @param {Number} jumps
     * @return {cc.JumpBy}
     * @example
     * // example
     * var actionBy = cc.JumpBy.create(2, cc.p(300, 0), 50, 4);
     */
    static create(duration: number, position: Point, height: number, jumps: number): JumpBy;
  }

  /**
   * Moves a Node object simulating a parabolic jump movement by modifying it's position attribute.
   * Relative to its movement.
   * @function
   * @param {Number} duration
   * @param {Point|Number} position
   * @param {Number} [y]
   * @param {Number} height
   * @param {Number} jumps
   * @return {JumpBy}
   * @example
   * // example
   * var actionBy = jumpBy(2, p(300, 0), 50, 4);
   * var actionBy = jumpBy(2, 300, 0, 50, 4);
   */
  export function jumpBy(
    duration: number,
    position: number | Point,
    y?: number,
    height?: number,
    jumps?: number
  ): JumpBy;

  /**
   * Moves a Node object to a parabolic position simulating a jump movement by modifying it's position attribute. <br />
   * Jump to the specified location.
   * @class
   * @extends JumpBy
   * @param {Number} duration
   * @param {Point|Number} position
   * @param {Number} [y]
   * @param {Number} height
   * @param {Number} jumps
   * @example
   * var actionTo = new JumpTo(2, p(300, 0), 50, 4);
   * var actionTo = new JumpTo(2, 300, 0, 50, 4);
   */
  export class JumpTo extends JumpBy {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @param {Number} duration
     * @param {Point|Number} position
     * @param {Number} [y]
     * @param {Number} height
     * @param {Number} jumps
     */
    public ctor(
      duration: number,
      position: number | Point,
      y?: number,
      height?: number,
      jumps?: number
    ): void;
    public ctor(): void;

    /**
     * Initializes the action.
     * @param {Number} duration
     * @param {Point|Number} position
     * @param {Number} [y]
     * @param {Number} height
     * @param {Number} jumps
     * @return {Boolean}
     * @example
     * actionTo.initWithDuration(2, p(300, 0), 50, 4);
     * actionTo.initWithDuration(2, 300, 0, 50, 4);
     */
    public initWithDuration(
      duration: number,
      position: number | Point,
      y?: number,
      height?: number,
      jumps?: number
    ): boolean;
    public initWithDuration(duration: number): boolean;

    /**
     * returns a new clone of the action
     * @returns {JumpTo}
     */
    public clone(): JumpTo;

    /**
     * @param {Number} duration
     * @param {cc.Point} position
     * @param {Number} height
     * @param {Number} jumps
     * @return {cc.JumpTo}
     * @example
     * // example
     * var actionTo = cc.JumpTo.create(2, cc.p(300, 300), 50, 4);
     */
    static create(duration: number, position: Point, height: number, jumps: number): JumpTo;
  }

  /**
   * Moves a Node object to a parabolic position simulating a jump movement by modifying it's position attribute. <br />
   * Jump to the specified location.
   * @function
   * @param {Number} duration
   * @param {Point|Number} position
   * @param {Number} [y]
   * @param {Number} height
   * @param {Number} jumps
   * @return {JumpTo}
   * @example
   * // example
   * var actionTo = jumpTo(2, p(300, 300), 50, 4);
   * var actionTo = jumpTo(2, 300, 300, 50, 4);
   */
  export function jumpTo(
    duration: number,
    position: number | Point,
    y?: number,
    height?: number,
    jumps?: number
  ): JumpTo;

  /**
   * @function
   * @param {Number} a
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   * @param {Number} t
   * @return {Number}
   */
  export function bezierAt(a: number, b: number, c: number, d: number, t: number): number;

  /** An action that moves the target with a cubic Bezier curve by a certain distance.
   * Relative to its movement.
   * @class
   * @extends ActionInterval
   * @param {Number} t time in seconds
   * @param {Array} c Array of points
   * @example
   * var bezier = [p(0, windowSize.height / 2), p(300, -windowSize.height / 2), p(300, 100)];
   * var bezierForward = new BezierBy(3, bezier);
   */
  export class BezierBy extends ActionInterval {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @param {Number} duration time in seconds
     * @param {Array} c Array of points
     */
    public ctor(duration: number, c: Point[]): void;
    public ctor(): void;

    /**
     * Initializes the action.
     * @param {Number} duration time in seconds
     * @param {Array} c Array of points
     * @return {Boolean}
     */
    public initWithDuration(duration: number, c: Point[]): boolean;
    public initWithDuration(duration: number): boolean;

    /**
     * returns a new clone of the action
     * @returns {BezierBy}
     */
    public clone(): BezierBy;

    /**
     * Returns a reversed action.
     * @return {BezierBy}
     */
    public reverse(): BezierBy;

    /**
     * An action that moves the target with a cubic Bezier curve by a certain distance.
     * Relative to its movement.
     * @function
     * @param {Number} duration time in seconds
     * @param {Array} c Array of points
     * @return {BezierBy}
     * // example
     * var bezier = [cc.p(0, windowSize.height / 2), cc.p(300, -windowSize.height / 2), cc.p(300, 100)];
     * var bezierForward = cc.BezierBy.create(3, bezier);
     *
     */
    static create(duration: number, c: Point[]): BezierBy;
  }

  /**
   * An action that moves the target with a cubic Bezier curve by a certain distance.
   * Relative to its movement.
   * @function
   * @param {Number} duration time in seconds
   * @param {Array} c Array of points
   * @return {BezierBy}
   * @example
   * // example
   * var bezier = [p(0, windowSize.height / 2), p(300, -windowSize.height / 2), p(300, 100)];
   * var bezierForward = bezierBy(3, bezier);
   */
  export function bezierBy(duration: number, c: Point[]): BezierBy;

  /** An action that moves the target with a cubic Bezier curve to a destination point.
   * @class
   * @extends BezierBy
   * @param {Number} t
   * @param {Array} c array of points
   * @example
   * var bezier = [p(0, windowSize.height / 2), p(300, -windowSize.height / 2), p(300, 100)];
   * var bezierTo = new BezierTo(2, bezier);
   */
  export class BezierTo extends BezierBy {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @param {Number} duration
     * @param {Array} c array of points
     * var bezierTo = new BezierTo(2, bezier);
     */
    public ctor(duration: number, c: Point[]): void;
    public ctor(): void;

    /**
     * Initializes the action.
     * @param {Number} duration time in seconds
     * @param {Array} c Array of points
     * @return {Boolean}
     */
    public initWithDuration(duration: number, c: Point[]): boolean;
    public initWithDuration(duration: number): boolean;

    /**
     * returns a new clone of the action
     * @returns {BezierTo}
     */
    public clone(): BezierTo;

    /**
     * @param {Number} duration
     * @param {Array} c array of points
     * @return {cc.BezierTo}
     * @example
     * // example
     * var bezier = [cc.p(0, windowSize.height / 2), cc.p(300, -windowSize.height / 2), cc.p(300, 100)];
     * var bezierTo = cc.BezierTo.create(2, bezier);
     */
    static create(duration: number, c: Point[]): BezierTo;
  }

  /**
   * An action that moves the target with a cubic Bezier curve to a destination point.
   * @function
   * @param {Number} duration
   * @param {Array} c array of points
   * @return {BezierTo}
   * @example
   * // example
   * var bezier = [p(0, windowSize.height / 2), p(300, -windowSize.height / 2), p(300, 100)];
   * var bezierTo = bezierTo(2, bezier);
   */
  export function bezierTo(duration: number, c: Point[]): BezierTo;

  /** Scales a Node object to a zoom factor by modifying it's scale attribute.
   * @warning This action doesn't support "reverse"
   * @class
   * @extends ActionInterval
   * @param {Number} duration
   * @param {Number} sx  scale parameter in X
   * @param {Number} [sy] scale parameter in Y, if Null equal to sx
   * @example
   * // It scales to 0.5 in both X and Y.
   * var actionTo = new ScaleTo(2, 0.5);
   *
   * // It scales to 0.5 in x and 2 in Y
   * var actionTo = new ScaleTo(2, 0.5, 2);
   */
  export class ScaleTo extends ActionInterval {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @param {Number} duration
     * @param {Number} sx  scale parameter in X
     * @param {Number} [sy] scale parameter in Y, if Null equal to sx
     */
    public ctor(duration: number, sx: number, sy?: number): void;
    public ctor(): void;

    /**
     * Initializes the action.
     * @param {Number} duration
     * @param {Number} sx
     * @param {Number} [sy=]
     * @return {Boolean}
     */
    public initWithDuration(duration: number, sx: number, sy?: number): boolean;
    public initWithDuration(duration: number): boolean;

    /**
     * returns a new clone of the action
     * @returns {ScaleTo}
     */
    public clone(): ScaleTo;

    /**
     * Scales a Node object to a zoom factor by modifying it's scale attribute.
     * @function
     * @param {Number} duration
     * @param {Number} sx  scale parameter in X
     * @param {Number} [sy] scale parameter in Y, if Null equal to sx
     * @return {ScaleTo}
     * @example
     * // example
     * // It scales to 0.5 in both X and Y.
     * var actionTo = scaleTo(2, 0.5);
     *
     * // It scales to 0.5 in x and 2 in Y
     * var actionTo = scaleTo(2, 0.5, 2);
     */
    static create(duration: number, sx: number, sy?: number): ScaleTo;
  }

  /**
   * Scales a Node object to a zoom factor by modifying it's scale attribute.
   * @function
   * @param {Number} duration
   * @param {Number} sx  scale parameter in X
   * @param {Number} [sy] scale parameter in Y, if Null equal to sx
   * @return {ScaleTo}
   * @example
   * // example
   * // It scales to 0.5 in both X and Y.
   * var actionTo = scaleTo(2, 0.5);
   *
   * // It scales to 0.5 in x and 2 in Y
   * var actionTo = scaleTo(2, 0.5, 2);
   */
  export function scaleTo(duration: number, sx: number, sy?: number): ScaleTo;

  /** Scales a Node object a zoom factor by modifying it's scale attribute.
   * Relative to its changes.
   * @class
   * @extends ScaleTo
   */
  export class ScaleBy extends ScaleTo {
    /**
     * Returns a reversed action.
     * @return {ScaleBy}
     */
    public reverse(): ScaleBy;

    /**
     * returns a new clone of the action
     * @returns {ScaleBy}
     */
    public clone(): ScaleBy;

    /**
     * Scales a Node object a zoom factor by modifying it's scale attribute.
     * Relative to its changes.
     * @function
     * @param {Number} duration duration in seconds
     * @param {Number} sx sx  scale parameter in X
     * @param {Number|Null} [sy=] sy scale parameter in Y, if Null equal to sx
     * @return {ScaleBy}
     * @example
     * // example without sy, it scales by 2 both in X and Y
     * var actionBy = scaleBy(2, 2);
     *
     * //example with sy, it scales by 0.25 in X and 4.5 in Y
     * var actionBy2 = scaleBy(2, 0.25, 4.5);
     */
    static create(duration: number, sx: number, sy?: number): ScaleBy;
  }

  /**
   * Scales a Node object a zoom factor by modifying it's scale attribute.
   * Relative to its changes.
   * @function
   * @param {Number} duration duration in seconds
   * @param {Number} sx sx  scale parameter in X
   * @param {Number|Null} [sy=] sy scale parameter in Y, if Null equal to sx
   * @return {ScaleBy}
   * @example
   * // example without sy, it scales by 2 both in X and Y
   * var actionBy = scaleBy(2, 2);
   *
   * //example with sy, it scales by 0.25 in X and 4.5 in Y
   * var actionBy2 = scaleBy(2, 0.25, 4.5);
   */
  export function scaleBy(duration: number, sx: number, sy?: number): ScaleBy;

  /** Blinks a Node object by modifying it's visible attribute
   * @class
   * @extends ActionInterval
   * @param {Number} duration  duration in seconds
   * @param {Number} blinks  blinks in times
   * @example
   * var action = new Blink(2, 10);
   */
  export class Blink extends ActionInterval {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @param {Number} duration  duration in seconds
     * @param {Number} blinks  blinks in times
     */
    public ctor(duration: number, blinks: number): void;
    public ctor(): void;

    /**
     * Initializes the action.
     * @param {Number} duration duration in seconds
     * @param {Number} blinks blinks in times
     * @return {Boolean}
     */
    public initWithDuration(duration: number, blinks: number): boolean;
    public initWithDuration(duration: number): boolean;

    /**
     * returns a new clone of the action
     * @returns {Blink}
     */
    public clone(): Blink;

    /**
     * Returns a reversed action.
     * @return {Blink}
     */
    public reverse(): Blink;

    /**
     * Blinks a Node object by modifying it's visible attribute.
     * @function
     * @param {Number} duration  duration in seconds
     * @param blinks blinks in times
     * @return {Blink}
     * @example
     * // example
     * var action = blink(2, 10);
     */
    static create(duration: number, blinks: number): Blink;
  }

  /**
   * Blinks a Node object by modifying it's visible attribute.
   * @function
   * @param {Number} duration  duration in seconds
   * @param blinks blinks in times
   * @return {Blink}
   * @example
   * // example
   * var action = blink(2, 10);
   */
  export function blink(duration: number, blinks: number): Blink;

  /** Fades an object that implements the RGBAProtocol protocol. It modifies the opacity from the current value to a custom one.
   * @warning This action doesn't support "reverse"
   * @class
   * @extends ActionInterval
   * @param {Number} duration
   * @param {Number} opacity 0-255, 0 is transparent
   * @example
   * var action = new FadeTo(1.0, 0);
   */
  export class FadeTo extends ActionInterval {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @param {Number} duration
     * @param {Number} opacity 0-255, 0 is transparent
     */
    public ctor(duration: number, opacity: number): void;
    public ctor(): void;

    /**
     * Initializes the action.
     * @param {Number} duration  duration in seconds
     * @param {Number} opacity
     * @return {Boolean}
     */
    public initWithDuration(duration: number, opacity: number): boolean;
    public initWithDuration(duration: number): boolean;

    /**
     * returns a new clone of the action
     * @returns {FadeTo}
     */
    public clone(): FadeTo;

    static create(duration: number, opacity: number): FadeTo;
  }

  /**
   * Fades an object that implements the RGBAProtocol protocol. It modifies the opacity from the current value to a custom one.
   * @function
   * @param {Number} duration
   * @param {Number} opacity 0-255, 0 is transparent
   * @return {FadeTo}
   * @example
   * // example
   * var action = fadeTo(1.0, 0);
   */
  export function fadeTo(duration: number, opacity: number): FadeTo;

  /** Fades In an object that implements the RGBAProtocol protocol. It modifies the opacity from 0 to 255.<br/>
   * The "reverse" of this action is FadeOut
   * @class
   * @extends FadeTo
   * @param {Number} duration duration in seconds
   */
  export class FadeIn extends FadeTo {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @param {Number} duration duration in seconds
     */
    public ctor(duration: number): void;
    public ctor(): void;

    /**
     * Returns a reversed action.
     * @return {FadeOut}
     */
    public reverse(): FadeOut;

    /**
     * returns a new clone of the action
     * @returns {FadeIn}
     */
    public clone(): FadeIn;

    static create(duration: number): FadeIn;
  }

  /**
   * Fades In an object that implements the RGBAProtocol protocol. It modifies the opacity from 0 to 255.
   * @function
   * @param {Number} duration duration in seconds
   * @return {FadeIn}
   * @example
   * //example
   * var action = fadeIn(1.0);
   */
  export function fadeIn(duration: number): FadeIn;

  /** Fades Out an object that implements the RGBAProtocol protocol. It modifies the opacity from 255 to 0.
   * The "reverse" of this action is FadeIn
   * @class
   * @extends FadeTo
   * @param {Number} duration duration in seconds
   */
  export class FadeOut extends FadeTo {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @param {Number} duration duration in seconds
     */
    public ctor(duration: number): void;
    public ctor(): void;

    /**
     * Returns a reversed action.
     * @return {FadeIn}
     */
    public reverse(): FadeIn;

    /**
     * returns a new clone of the action
     * @returns {FadeOut}
     */
    public clone(): FadeOut;

    /**
     * Fades Out an object that implements the RGBAProtocol protocol. It modifies the opacity from 255 to 0.
     * @function
     * @param {Number} duration  duration in seconds
     * @return {FadeOut}
     * @example
     * // example
     * var action = fadeOut(1.0);
     */
    static create(duration: number): FadeOut;
  }

  /**
   * Fades Out an object that implements the RGBAProtocol protocol. It modifies the opacity from 255 to 0.
   * @function
   * @param {Number} duration  duration in seconds
   * @return {FadeOut}
   * @example
   * // example
   * var action = fadeOut(1.0);
   */
  export function fadeOut(duration: number): FadeOut;

  /** Tints a Node that implements the NodeRGB protocol from current tint to a custom one.
   * @warning This action doesn't support "reverse"
   * @class
   * @extends ActionInterval
   * @param {Number} duration
   * @param {Number} red 0-255
   * @param {Number} green  0-255
   * @param {Number} blue 0-255
   * @example
   * var action = new TintTo(2, 255, 0, 255);
   */
  export class TintTo extends ActionInterval {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @param {Number} duration
     * @param {Number} red 0-255
     * @param {Number} green  0-255
     * @param {Number} blue 0-255
     */
    public ctor(duration: number, red: number, green: number, blue: number): void;
    public ctor(): void;

    /**
     * Initializes the action.
     * @param {Number} duration
     * @param {Number} red 0-255
     * @param {Number} green 0-255
     * @param {Number} blue 0-255
     * @return {Boolean}
     */
    public initWithDuration(duration: number, red: number, green: number, blue: number): boolean;
    public initWithDuration(duration: number): boolean;

    /**
     * returns a new clone of the action
     * @returns {TintTo}
     */
    public clone(): TintTo;

    /**
     * Tints a Node that implements the NodeRGB protocol from current tint to a custom one.
     * @function
     * @param {Number} duration
     * @param {Number} red 0-255
     * @param {Number} green  0-255
     * @param {Number} blue 0-255
     * @return {TintTo}
     * @example
     * // example
     * var action = tintTo(2, 255, 0, 255);
     */
    static create(duration: number, red: number, green: number, blue: number): TintTo;
  }

  /**
   * Tints a Node that implements the NodeRGB protocol from current tint to a custom one.
   * @function
   * @param {Number} duration
   * @param {Number} red 0-255
   * @param {Number} green  0-255
   * @param {Number} blue 0-255
   * @return {TintTo}
   * @example
   * // example
   * var action = tintTo(2, 255, 0, 255);
   */
  export function tintTo(duration: number, red: number, green: number, blue: number): TintTo;

  /**  Tints a Node that implements the NodeRGB protocol from current tint to a custom one.
   * Relative to their own color change.
   * @class
   * @extends ActionInterval
   * @param {Number} duration  duration in seconds
   * @param {Number} deltaRed
   * @param {Number} deltaGreen
   * @param {Number} deltaBlue
   * @example
   * var action = new TintBy(2, -127, -255, -127);
   */
  export class TintBy extends ActionInterval {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @param {Number} duration  duration in seconds
     * @param {Number} deltaRed
     * @param {Number} deltaGreen
     * @param {Number} deltaBlue
     */
    public ctor(duration: number, deltaRed: number, deltaGreen: number, deltaBlue: number): void;
    public ctor(): void;

    /**
     * Initializes the action.
     * @param {Number} duration
     * @param {Number} deltaRed 0-255
     * @param {Number} deltaGreen 0-255
     * @param {Number} deltaBlue 0-255
     * @return {Boolean}
     */
    public initWithDuration(
      duration: number,
      deltaRed: number,
      deltaGreen: number,
      deltaBlue: number
    ): boolean;
    public initWithDuration(duration: number): boolean;

    /**
     * returns a new clone of the action
     * @returns {TintBy}
     */
    public clone(): TintBy;

    /**
     * Returns a reversed action.
     * @return {TintBy}
     */
    public reverse(): TintBy;

    /**
     * Tints a Node that implements the NodeRGB protocol from current tint to a custom one.
     * Relative to their own color change.
     * @function
     * @param {Number} duration  duration in seconds
     * @param {Number} deltaRed
     * @param {Number} deltaGreen
     * @param {Number} deltaBlue
     * @return {TintBy}
     * @example
     * // example
     * var action = tintBy(2, -127, -255, -127);
     */
    static create(
      duration: number,
      deltaRed: number,
      deltaGreen: number,
      deltaBlue: number
    ): TintBy;
  }

  /**
   * Tints a Node that implements the NodeRGB protocol from current tint to a custom one.
   * Relative to their own color change.
   * @function
   * @param {Number} duration  duration in seconds
   * @param {Number} deltaRed
   * @param {Number} deltaGreen
   * @param {Number} deltaBlue
   * @return {TintBy}
   * @example
   * // example
   * var action = tintBy(2, -127, -255, -127);
   */
  export function tintBy(
    duration: number,
    deltaRed: number,
    deltaGreen: number,
    deltaBlue: number
  ): TintBy;

  /** Delays the action a certain amount of seconds
   * @class
   * @extends ActionInterval
   */
  export class DelayTime extends ActionInterval {
    /**
     * Returns a reversed action.
     * @return {DelayTime}
     */
    public reverse(): DelayTime;

    /**
     * returns a new clone of the action
     * @returns {DelayTime}
     */
    public clone(): DelayTime;

    /**
     * Delays the action a certain amount of seconds
     * @function
     * @param {Number} d duration in seconds
     * @return {DelayTime}
     * @example
     * // example
     * var delay = delayTime(1);
     */
    static create(d: number): DelayTime;
  }

  /**
   * Delays the action a certain amount of seconds
   * @function
   * @param {Number} d duration in seconds
   * @return {DelayTime}
   * @example
   * // example
   * var delay = delayTime(1);
   */
  export function delayTime(d: number): DelayTime;

  /**
   * <p>
   * Executes an action in reverse order, from time=duration to time=0                                     <br/>
   * @warning Use this action carefully. This action is not sequenceable.                                 <br/>
   * Use it as the default "reversed" method of your own actions, but using it outside the "reversed"      <br/>
   * scope is not recommended.
   * </p>
   * @class
   * @extends ActionInterval
   * @param {FiniteTimeAction} action
   * @example
   *  var reverse = new ReverseTime(this);
   */
  export class ReverseTime extends ActionInterval {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @param {FiniteTimeAction} action
     */
    public ctor(action: FiniteTimeAction): void;
    public ctor(): void;

    /**
     * @param {FiniteTimeAction} action
     * @return {Boolean}
     */
    public initWithAction(action: FiniteTimeAction): boolean;

    /**
     * returns a new clone of the action
     * @returns {ReverseTime}
     */
    public clone(): ReverseTime;

    /**
     * Returns a reversed action.
     * @return {ActionInterval}
     */
    public reverse(): ReverseTime;

    /**
     * Executes an action in reverse order, from time=duration to time=0.
     * @function
     * @param {FiniteTimeAction} action
     * @return {ReverseTime}
     * @example
     * // example
     *  var reverse = reverseTime(this);
     */
    static create(action: FiniteTimeAction): ReverseTime;
  }

  /**
   * Executes an action in reverse order, from time=duration to time=0.
   * @function
   * @param {FiniteTimeAction} action
   * @return {ReverseTime}
   * @example
   * // example
   *  var reverse = reverseTime(this);
   */
  export function reverseTime(action: FiniteTimeAction): ReverseTime;

  /**  Animates a sprite given the name of an Animation
   * @class
   * @extends ActionInterval
   * @param {Animation} animation
   * @example
   * // create the animation with animation
   * var anim = new Animate(dance_grey);
   */
  export class Animate extends ActionInterval {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
     * create the animate with animation.
     * @param {Animation} animation
     */
    public ctor(animation: Animation): void;
    public ctor(): void;

    /**
     * @return {Animation}
     */
    public getAnimation(): Animation;

    /**
     * @param {Animation} animation
     */
    public setAnimation(animation: Animation): void;

    /**
     * Gets the index of sprite frame currently displayed.
     * @return {Number}
     */
    public getCurrentFrameIndex(): number;

    /**
     * @param {Animation} animation
     * @return {Boolean}
     */
    public initWithAnimation(animation: Animation): boolean;

    /**
     * returns a new clone of the action
     * @returns {Animate}
     */
    public clone(): Animate;

    /**
     * Returns a reversed action.
     * @return {Animate}
     */
    public reverse(): Animate;

    /**
     * create the animate with animation
     * @function
     * @param {Animation} animation
     * @return {Animate}
     * @example
     * // example
     * // create the animation with animation
     * var anim = animate(dance_grey);
     */
    static create(animation: Animation): Animate;
  }

  /**
   * create the animate with animation
   * @function
   * @param {Animation} animation
   * @return {Animate}
   * @example
   * // example
   * // create the animation with animation
   * var anim = animate(dance_grey);
   */
  export function animate(animation: Animation): Animate;

  /**
   * <p>
   *     Overrides the target of an action so that it always runs on the target<br/>
   *     specified at action creation rather than the one specified by runAction.
   * </p>
   * @class
   * @extends ActionInterval
   * @param {Node} target
   * @param {FiniteTimeAction} action
   */
  export class TargetedAction extends ActionInterval {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
     * Create an action with the specified action and forced target.
     * @param {Node} target
     * @param {FiniteTimeAction} action
     */
    public ctor(target: Node, action: FiniteTimeAction): void;
    public ctor(): void;

    /**
     * Init an action with the specified action and forced target
     * @param {Node} target
     * @param {FiniteTimeAction} action
     * @return {Boolean}
     */
    public initWithTarget(target: Node, action: FiniteTimeAction): boolean;

    /**
     * returns a new clone of the action
     * @returns {TargetedAction}
     */
    public clone(): TargetedAction;

    /**
     * return the target that the action will be forced to run with
     * @return {Node}
     */
    public getForcedTarget(): Node;

    /**
     * set the target that the action will be forced to run with
     * @param {Node} forcedTarget
     */
    public setForcedTarget(forcedTarget: Node): void;
  }

  /**
   * Create an action with the specified action and forced target
   * @function
   * @param {Node} target
   * @param {FiniteTimeAction} action
   * @return {TargetedAction}
   */
  export function targetedAction(target: Node, action: FiniteTimeAction): TargetedAction;

  // +--------------------------------------------------------------------------------
  // + File: cocos2d/core/base-nodes/CCActionTween.js
  // +--------------------------------------------------------------------------------
  /**
   *
   * @class
   * @extends Class
   */
  export class ActionTweenDelegate extends Class {
    /**
     * Update Tween Action.
     * @param value
     * @param key
     */
    public updateTweenAction(value: any, key: string): void;
  }

  /**
   * ActionTween
   * ActionTween is an action that lets you update any property of an object.
   *
   * @class
   * @extends ActionInterval
   * @example
   * //For example, if you want to modify the "width" property of a target from 200 to 300 in 2 seconds, then:
   *  var modifyWidth = actionTween(2,"width",200,300)
   *  target.runAction(modifyWidth);
   *
   * //Another example: ScaleTo action could be rewriten using PropertyAction:
   * // scaleA and scaleB are equivalents
   * var scaleA = scaleTo(2,3);
   * var scaleB = actionTween(2,"scale",1,3);
   * @param {Number} duration
   * @param {String} key
   * @param {Number} from
   * @param {Number} to
   */
  export class ActionTween extends ActionInterval {
    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
     * Creates an initializes the action with the property name (key), and the from and to parameters.
     * @param {Number} duration
     * @param {String} key
     * @param {Number} from
     * @param {Number} to
     */
    // TODO: Not all of these parameters are required, figure out how this is supposed to be defined
    public ctor(duration: number, key: string, from: number, to: number): void;
    public ctor(): void;

    /**
     * initializes the action with the property name (key), and the from and to parameters.
     * @param {Number} duration
     * @param {String} key
     * @param {Number} from
     * @param {Number} to
     * @return {Boolean}
     */
    public initWithDuration(duration: number, key: string, from: number, to: number): boolean;
    public initWithDuration(duration: number): boolean;

    /**
     * Start this tween with target.
     * @param {ActionTweenDelegate} target
     */
    public startWithTarget(target: ActionTweenDelegate | Node): void;

    /**
     * returns a reversed action.
     * @return {ActionTween}
     */
    public reverse(): ActionTween;

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @return {ActionTween}
     */
    public clone(): ActionTween;
  }

  /**
   * Creates an initializes the action with the property name (key), and the from and to parameters.
   * @function
   * @param {Number} duration
   * @param {String} key
   * @param {Number} from
   * @param {Number} to
   * @return {ActionTween}
   */
  export function actionTween(duration: number, key: string, from: number, to: number): ActionTween;

  /**
   * Audio support in the browser
   *
   * MULTI_CHANNEL        : Multiple audio while playing - If it doesn't, you can only play background music
   * WEB_AUDIO            : Support for WebAudio - Support W3C WebAudio standards, all of the audio can be played
   * AUTOPLAY             : Supports auto-play audio - if Don‘t support it, On a touch detecting background music canvas, and then replay
   * REPLAY_AFTER_TOUCH   : The first music will fail, must be replay after touchstart
   * USE_EMPTIED_EVENT    : Whether to use the emptied event to replace load callback
   * DELAY_CREATE_CTX     : delay created the context object - only webAudio
   * NEED_MANUAL_LOOP     : WebAudio loop attribute failure, need to manually perform loop
   *
   * May be modifications for a few browser version
   */

  /**
   * Encapsulate DOM and webAudio
   */
  export class Audio extends Class {
    public volume: number;
    public loop: boolean;
    public src: any;

    // TODO: Figure out what type context is supposed to be
    public constructor(context: any, volume: number, url: string);

    public ctor(context: any, volume: number, url: string): void;
    public ctor(): void;

    // TODO: Figure out what type buffer is supposed to be
    public setBuffer(buffer: any): void;

    // TODO: Figure out what type element is supposed to be
    public setElement(element: any): void;

    public play(offset: number, loop: boolean): void;

    public getPlaying(): boolean;

    public stop(): void;

    public pause(): void;

    public resume(): void;

    public setVolume(volume: number): void;

    public getVolume(): number;

    public cloneNode(): Audio;
  }

  /**
   * audioEngine is the singleton object, it provide simple audio APIs.
   * @namespace
   */
  export namespace audioEngine {
    /**
     * Indicates whether any background music can be played or not.
     * @returns {boolean} true if the background music is playing, otherwise false
     */
    export function willPlayMusic(): boolean;

    /**
     * Play music.
     * @param {String} url The path of the music file without filename extension.
     * @param {Boolean} loop Whether the music loop or not.
     * @example
     * //example
     * audioEngine.playMusic(path, false);
     */
    export function playMusic(url: string, loop: boolean): void;

    /**
     * Stop playing music.
     * @param {Boolean} [releaseData] If release the music data or not.As default value is false.
     * @example
     * //example
     * audioEngine.stopMusic();
     */
    export function stopMusic(releaseData?: boolean): void;

    /**
     * Pause playing music.
     * @example
     * //example
     * audioEngine.pauseMusic();
     */
    export function pauseMusic(): void;

    /**
     * Resume playing music.
     * @example
     * //example
     * audioEngine.resumeMusic();
     */
    export function resumeMusic(): void;

    /**
     * Rewind playing music.
     * @example
     * //example
     * audioEngine.rewindMusic();
     */
    export function rewindMusic(): void;

    /**
     * The volume of the music max value is 1.0,the min value is 0.0 .
     * @return {Number}
     * @example
     * //example
     * var volume = audioEngine.getMusicVolume();
     */
    export function getMusicVolume(): number;

    /**
     * Set the volume of music.
     * @param {Number} volume Volume must be in 0.0~1.0 .
     * @example
     * //example
     * audioEngine.setMusicVolume(0.5);
     */
    export function setMusicVolume(volume: number): void;

    /**
     * Whether the music is playing.
     * @return {Boolean} If is playing return true,or return false.
     * @example
     * //example
     *  if (audioEngine.isMusicPlaying()) {
     *      log("music is playing");
     *  }
     *  else {
     *      log("music is not playing");
     *  }
     */
    export function isMusicPlaying(): boolean;

    /**
     * Play sound effect.
     * @param {String} url The path of the sound effect with filename extension.
     * @param {Boolean} loop Whether to loop the effect playing, default value is false
     * @return {Number|null} the audio id
     * @example
     * //example
     * var soundId = audioEngine.playEffect(path);
     */
    export function playEffect(url: string, loop: boolean): void;

    /**
     * Set the volume of sound effects.
     * @param {Number} volume Volume must be in 0.0~1.0 .
     * @example
     * //example
     * audioEngine.setEffectsVolume(0.5);
     */
    export function setEffectsVolume(volume: number): void;

    /**
     * The volume of the effects max value is 1.0,the min value is 0.0 .
     * @return {Number}
     * @example
     * //example
     * var effectVolume = audioEngine.getEffectsVolume();
     */
    export function getEffectsVolume(): number;

    /**
     * Pause playing sound effect.
     * @param {Audio} audio The return value of function playEffect.
     * @example
     * //example
     * audioEngine.pauseEffect(audioID);
     */
    export function pauseEffect(audio: Audio): void;

    /**
     * Pause all playing sound effect.
     * @example
     * //example
     * audioEngine.pauseAllEffects();
     */
    export function pauseAllEffects(): void;

    /**
     * Resume playing sound effect.
     * @param {Audio} audio The return value of function playEffect.
     * @audioID
     * //example
     * audioEngine.resumeEffect(audioID);
     */
    export function resumeEffect(audio: Audio): void;

    /**
     * Resume all playing sound effect
     * @example
     * //example
     * audioEngine.resumeAllEffects();
     */
    export function resumeAllEffects(): void;

    /**
     * Stop playing sound effect.
     * @param {Audio} audio The return value of function playEffect.
     * @example
     * //example
     * audioEngine.stopEffect(audioID);
     */
    export function stopEffect(audio: Audio): void;

    /**
     * Stop all playing sound effects.
     * @example
     * //example
     * audioEngine.stopAllEffects();
     */
    export function stopAllEffects(): void;

    /**
     * Unload the preloaded effect from internal buffer
     * @param {String} url
     * @example
     * //example
     * audioEngine.unloadEffect(EFFECT_FILE);
     */
    export function unloadEffect(url: string): void;

    /**
     * End music and effects.
     */
    export function end(): void;
  }

  // +--------------------------------------------------------------------------------
  // + File: cocos2d/core/base-nodes/CCNode.js
  // +--------------------------------------------------------------------------------

  // Class Definitions
  /**
   * Node is the root class of all node. Anything that gets drawn or contains things that get drawn is a Node.
   * The most popular Nodes are: Scene, Layer, Sprite, Menu.
   *
   * The main features of a Node are:
   * - They can contain other Node nodes (addChild, getChildByTag, removeChild, etc)
   * - They can schedule periodic callback (schedule, unschedule, etc)
   * - They can execute actions (runAction, stopAction, etc)
   *
   * Some Node nodes provide extra functionality for them or their children.
   *
   * Subclassing a Node usually means (one/all) of:
   * - overriding constructor function "ctor" to initialize resources and schedule callbacks
   * - create callbacks to handle the advancement of time
   *
   * Features of Node:
   * - position
   * - scale (x, y)
   * - rotation (in degrees, clockwise)
   * - anchor point
   * - size
   * - color
   * - opacity
   * - visible
   * - z-order
   * - WebGL z position
   *
   *  Default values:
   * - rotation: 0
   * - position: (x=0,y=0)
   * - scale: (x=1,y=1)
   * - contentSize: (x=0,y=0)
   * - anchorPoint: (x=0,y=0)
   * - color: (r=255,g=255,b=255)
   * - opacity: 255
   *
   *  Limitations:
   * - A Node is a "void" object. It doesn't have a texture
   *
   * Order in transformations with grid disabled
   * -# The node will be translated (position)
   * -# The node will be rotated (rotation)
   * -# The node will be scaled (scale)
   *
   * Order in transformations with grid enabled
   * -# The node will be translated (position)
   * -# The node will be rotated (rotation)
   * -# The node will be scaled (scale)
   * -# The grid will capture the screen
   * -# The node will be moved according to the camera values (camera)
   * -# The grid will render the captured screen
   *
   * @class
   * @extends Class
   *
   * @property {Number}               x                   - x axis position of node
   * @property {Number}               y                   - y axis position of node
   * @property {Number}               width               - Width of node
   * @property {Number}               height              - Height of node
   * @property {Number}               anchorX             - Anchor point's position on x axis
   * @property {Number}               anchorY             - Anchor point's position on y axis
   * @property {Boolean}              ignoreAnchor        - Indicate whether ignore the anchor point property for positioning
   * @property {Number}               skewX               - Skew x
   * @property {Number}               skewY               - Skew y
   * @property {Number}               zIndex              - Z order in depth which stands for the drawing order
   * @property {Number}               vertexZ             - WebGL Z vertex of this node, z order works OK if all the nodes uses the same openGL Z vertex
   * @property {Number}               rotation            - Rotation of node
   * @property {Number}               rotationX           - Rotation on x axis
   * @property {Number}               rotationY           - Rotation on y axis
   * @property {Number}               scale               - Scale of node
   * @property {Number}               scaleX              - Scale on x axis
   * @property {Number}               scaleY              - Scale on y axis
   * @property {Boolean}              visible             - Indicate whether node is visible or not
   * @property {Color}             color               - Color of node, default value is white: (255, 255, 255)
   * @property {Boolean}              cascadeColor        - Indicate whether node's color value affect its child nodes, default value is false
   * @property {Number}               opacity             - Opacity of node, default value is 255
   * @property {Boolean}              opacityModifyRGB    - Indicate whether opacity affect the color value, default value is false
   * @property {Boolean}              cascadeOpacity      - Indicate whether node's opacity value affect its child nodes, default value is false
   * @property {Array}                children            - <@readonly> All children nodes
   * @property {Number}               childrenCount       - <@readonly> Number of children
   * @property {Node}              parent              - Parent node
   * @property {Boolean}              running             - <@readonly> Indicate whether node is running or not
   * @property {Number}               tag                 - Tag of node
   * @property {Object}               userData            - Custom user data
   * @property {Object}               userObject          - User assigned CCObject, similar to userData, but instead of holding a void* it holds an id
   * @property {Number}               arrivalOrder        - The arrival order, indicates which children is added previously
   * @property {ActionManager}     actionManager       - The CCActionManager object that is used by all actions.
   * @property {Scheduler}         scheduler           - Scheduler used to schedule all "updates" and timers.
   * @property {GridBase}          grid                - grid object that is used when applying effects
   * @property {GLProgram}         shaderProgram       - The shader program currently used for this node
   * @property {Number}               glServerState       - The state of OpenGL server side
   */
  export class Node extends Class {
    // TODO: Properly declare these things below, they are unknown or as-yet undeclared types:
    //public grid:GridBase;
    //public shaderProgram:GLProgram;

    public actionManager: ActionManager;
    public anchorX: number;
    public anchorY: number;
    public arrivalOrder: number;

    public cascadeColor: boolean;
    public cascadeOpacity: boolean;
    public children: Node[];
    public childrenCount: number;
    public color: Color;
    public glServerState: number;
    public height: number;
    public ignoreAnchor: boolean;
    public opacity: number;
    public opacityModifyRGB: boolean;
    public parent: Node;
    public rotation: number;
    public rotationX: number;
    public rotationY: number;
    public running: boolean;
    public scale: number;
    public scaleX: number;
    public scaleY: number;
    public scheduler: Scheduler;
    public skewX: number;
    public skewY: number;
    public tag: number;
    public userData: any;
    public userObject: Class; // <-- is this return type of Class correct?!? Not sure ...
    public vertexZ: number;
    public width: number;
    public x: number;
    public y: number;
    public visible: boolean;
    public zIndex: number;

    //public RenderCmd: CLass;

    public constructor();

    /**
     * Initializes the instance of Node
     * @function
     * @returns {boolean} Whether the initialization was successful.
     */
    public init(): boolean;

    /** "add" logic MUST only be in this method
     *
     * If the child is added to a 'running' node, then 'onEnter' and 'onEnterTransitionDidFinish' will be called immediately.
     * @function
     * @param {Node} child  A child node
     * @param {number} [localZOrder]  Z order for drawing priority. Please refer to setZOrder(int)
     * @param {number|string} [tag]  An integer or a name to identify the node easily. Please refer to setTag(int) and setName(string)
     */
    public addChild(child: Node, localZOrder?: number, tag?: number | string): void;

    /**
     * Adds a component to the node's component container.
     * @function
     * @param {Component} component
     *
     * TODO: Uncomment once Component is defined.
     */

    //addComponent(component:Component):void;

    /**
     * Returns a "local" axis aligned bounding box of the node.
     * @deprecated since v3.0, please use getBoundingBox instead
     * @return {Rect}
     */
    public boundingBox(): Rect;

    /**
     * Stops all running actions and schedulers
     * @function
     */
    public cleanup(): void;

    /**
     * Converts a Point to node (local) space coordinates. The result is in Points.
     * @function
     * @param {Point} worldPoint
     * @return {Point}
     */
    public convertToNodeSpace(worldPoint: Point): Point;

    /**
     * Converts a Point to node (local) space coordinates. The result is in Points.
     * treating the returned/received node point as anchor relative.
     * @function
     * @param {Point} worldPoint
     * @return {Point}
     */
    public convertToNodeSpaceAR(worldPoint: Point): Point;

    /** convenience methods which take a Touch instead of Point
     * @function
     * @param {Touch} touch The touch object
     * @return {Point}
     */
    public convertTouchToNodeSpace(touch: Touch): Point;

    /**
     * converts a Touch (world coordinates) into a local coordinate. This method is AR (Anchor Relative).
     * @function
     * @param {Touch} touch The touch object
     * @return {Point}
     */
    public convertTouchToNodeSpaceAR(touch: Touch): Point;

    /**
     * Converts a Point to world space coordinates. The result is in Points.
     * @function
     * @param {Point} nodePoint
     * @return {Point}
     */
    public convertToWorldSpace(nodePoint: Point): Point;

    /**
     * Converts a local Point to world space coordinates.The result is in Points.
     * treating the returned/received node point as anchor relative.
     * @function
     * @param {Point} nodePoint
     * @return {Point}
     */
    public convertToWorldSpaceAR(nodePoint: Point): Point;

    public doEnumerate(name: string, callback: (arg: Node) => boolean): void;

    /**
     * TODO: Fill this out with an explanation of this method's purpose/functionality.
     *
     * @function
     * @param {Node} node ???
     * @param {string} name ???
     * @param {function} callback ???
     */
    public doEnumerateRecursive(node: Node, name: string, callback: (arg: Node) => boolean): void;

    /**
     * Render function using the canvas 2d context or WebGL context, internal usage only, please do not call this function
     * @function
     * @param {CanvasRenderingContext2D} ctx The render context
     */
    public draw(ctx: CanvasRenderingContext2D): void;

    /**
     * Render function using the canvas 2d context or WebGL context, internal usage only, please do not call this function
     * @function
     * @param {WebGLRenderingContext} ctx The render context
     */
    public draw(ctx: WebGLRenderingContext): void;

    /** Search the children of the receiving node to perform processing for nodes which share a name.
     *
     * @param name The name to search for, supports c++11 regular expression.
     * Search syntax options:
     * `//`: Can only be placed at the begin of the search string. This indicates that it will search recursively.
     * `..`: The search should move up to the node's parent. Can only be placed at the end of string.
     * `/` : When placed anywhere but the start of the search string, this indicates that the search should move to the node's children.
     *
     * @code
     * enumerateChildren("//MyName", ...): This searches the children recursively and matches any node with the name `MyName`.
     * enumerateChildren("[[:alnum:]]+", ...): This search string matches every node of its children.
     * enumerateChildren("A[[:digit:]]", ...): This searches the node's children and returns any child named `A0`, `A1`, ..., `A9`.
     * enumerateChildren("Abby/Normal", ...): This searches the node's grandchildren and returns any node whose name is `Normal`
     * and whose parent is named `Abby`.
     * enumerateChildren("//Abby/Normal", ...): This searches recursively and returns any node whose name is `Normal` and whose
     * parent is named `Abby`.
     * @endcode
     *
     * @warning Only support alpha or number for name, and not support unicode.
     *
     * @param callback A callback function to execute on nodes that match the `name` parameter. The function takes the following arguments:
     *  `node`
     *      A node that matches the name
     *  And returns a boolean result. Your callback can return `true` to terminate the enumeration.
     *
     */
    public enumerateChildren(name: string, callback: (arg: Node) => boolean): void;

    ///**
    // * Properties configuration function
    // * All properties in attrs will be set to the node,
    // * when the setter of the node is available,
    // * the property will be set via setter function.
    // *
    // * @function
    // * @param {Object} attrs Properties to be set to node
    // */
    //attr(attrs);

    /**
     * Returns an action from the running action list by its tag.
     * @function
     * @see Node#getTag and Node#setTag
     * @param {Number} tag
     * @return {Action} The action object with the given tag.
     */
    public getActionByTag(tag: number): Action;

    /**
     * Returns the CCActionManager object that is used by all actions.
     * (IMPORTANT: If you set a new ActionManager, then previously created actions are going to be removed.)
     * @function
     * @see Node#setActionManager
     * @return {ActionManager} A CCActionManager object.
     */
    public getActionManager(): ActionManager;

    /**
     *  Returns a copy of the anchor point.
     *  Anchor point is the point around which all transformations and positioning manipulations take place.
     *  It's like a pin in the node where it is "attached" to its parent.
     *  The anchorPoint is normalized, like a percentage. (0,0) means the bottom-left corner and (1,1) means the top-right corner.
     *  But you can use values higher than (1,1) and lower than (0,0) too.
     *  The default anchor point is (0.5,0.5), so it starts at the center of the node.
     * @function
     * @return {Point}  The anchor point of node.
     */
    public getAnchorPoint(): Point;

    /**
     * Returns a copy of the anchor point in absolute pixels.
     * you can only read it. If you wish to modify it, use setAnchorPoint
     * @see Node#getAnchorPoint
     * @function
     * @return {Point} The anchor point in absolute pixels.
     */
    public getAnchorPointInPoints(): Point;

    /**
     * Returns a "local" axis aligned bounding box of the node.
     * The returned box is relative only to its parent.
     * @function
     * @return {Rect} The calculated bounding box of the node
     */
    public getBoundingBox(): Rect;

    /**
     * Returns a "world" axis aligned bounding box of the node.
     * @function
     * @return {Rect}
     */
    public getBoundingBoxToWorld(): Rect;

    /**
     * Returns a camera object that lets you move the node using a gluLookAt
     * @function
     * @return {Camera} A CCCamera object that lets you move the node using a gluLookAt
     * @deprecated since v3.0, no alternative function
     * @example
     * var camera = node.getCamera();
     * camera.setEye(0, 0, 415/2);
     * camera.setCenter(0, 0, 0);
     *
     * TODO: Uncomment once Camera is defined.
     */

    //getCamera():Camera;

    /**
     * Returns a child from the container given its name
     * @function
     * @param {String} name A name to find the child node.
     * @return {Node} a CCNode object whose name equals to the input parameter
     */
    public getChildByName(name: string): Node;

    /**
     * Returns a child from the container given its tag
     * @function
     * @param {Number} tag An identifier to find the child node.
     * @return {Node} a CCNode object whose tag equals to the input parameter
     */
    public getChildByTag(tag: number): Node;

    /**
     * Returns an array of all children
     * Composing a "tree" structure is a very important feature of CCNode
     * @function
     * @return {Array} An array of children
     * @example
     *  //This sample code traverses all children nodes, and set their position to (0,0)
     *  var allChildren = parent.getChildren();
     *  for(var i = 0; i < allChildren.length; i++) {
     *      allChildren[i].setPosition(0, 0);
     *  }
     */
    public getChildren(): Node[];

    /**
     * Returns the amount of children.
     * @function
     * @return {Number} The amount of children.
     */
    public getChildrenCount(): number;

    /**
     * Returns the color of Node
     * @function
     * @returns {Color}
     */
    public getColor(): Color;

    /**
     * Returns a component identified by the name given.
     * @function
     * @param {String} name The name to search for
     * @return {Component} The component found
     *
     * TODO: Uncomment once Component is defined.
     */

    //getComponent(name:string):Component;

    /**
     * Returns a copy the untransformed size of the node.
     * The contentSize remains the same no matter the node is scaled or rotated.
     * All nodes has a size. Layer and Scene has the same size of the screen by default.
     * @function
     * @return {Size} The untransformed size of the node.
     */
    public getContentSize(): Size;

    /**
     * Returns the displayed color of Node,
     * the difference between displayed color and color is that displayed color is calculated based on color and parent node's color when cascade color enabled.
     * @function
     * @returns {Color}
     */
    public getDisplayedColor(): Color;

    /**
     * Returns the displayed opacity of Node,
     * the difference between displayed opacity and opacity is that displayed opacity is calculated based on opacity and parent node's opacity when cascade opacity enabled.
     * @function
     * @returns {number} displayed opacity
     */
    public getDisplayedOpacity(): number;

    /**
     * Return the Node's Global Z Order.
     * @function
     * @returns {number} The node's global Z order
     */
    public getGlobalZOrder(): number;

    /**
     * Returns the state of OpenGL server side.
     * @function
     * @return {Number} The state of OpenGL server side.
     * @deprecated since v3.0, no need anymore
     */
    public getGLServerState(): number;

    /**
     * Returns the local Z order of this node.
     * @function
     * @returns {Number} The local (relative to its siblings) Z order.
     */
    public getLocalZOrder(): number;

    /**
     * Returns a string that is used to identify the node.
     * @function
     * @returns {string} A string that identifies the node.
     */
    public getName(): string;

    /**
     * TODO: Fill this out with an explanation of the method's purpose/function.
     * @function
     * @param {Node} ancester An ancestor of the target node
     * @return {AffineTransform} The affine transform object
     */
    public getNodeToParentAffineTransform(ancestor: Node): AffineTransform;

    /**
     * Returns the matrix that transform the node's (local) space coordinates into the parent's space coordinates.
     * The matrix is in Pixels.
     * @function
     * @param {Node} ancester An ancestor of the target node
     * @return {AffineTransform} The affine transform object
     */
    public getNodeToParentTransform(ancestor: Node): AffineTransform;

    /**
     * Returns the world affine transform matrix. The matrix is in Pixels.
     * @function
     * @return {AffineTransform}
     */
    public getNodeToWorldTransform(): AffineTransform;

    /**
     * returns the normalized position
     * @returns {Point}
     */
    public getNormalizedPosition(): Point;

    /** Returns the numbers of actions that are running plus the ones that are schedule to run (actions in actionsToAdd and actions arrays).
     *    Composable actions are counted as 1 action. Example:
     *    If you are running 1 Sequence of 7 actions, it will return 1.
     *    If you are running 7 Sequences of 2 actions, it will return 7.
     * @function
     * @return {Number} The number of actions that are running plus the ones that are schedule to run
     */
    public getNumberOfRunningActions(): number;

    /**
     * Returns the opacity of Node
     * @function
     * @returns {number} opacity
     */
    public getOpacity(): number;

    /**
     * Returns the arrival order, indicates which children should be added previously.
     * @function
     * @return {Number} The arrival order.
     */
    public getOrderOfArrival(): number;

    /**
     * Returns a reference to the parent node
     * @function
     * @return {Node} A reference to the parent node
     */
    public getParent(): Node;

    /**
     * Returns the matrix that transform parent's space coordinates to the node's (local) space coordinates.
     * The matrix is in Pixels.
     * @function
     * @return {AffineTransform}
     */
    public getParentToNodeTransform(): AffineTransform;

    /**
     * Returns a copy of the position (x,y) of the node in cocos2d coordinates. (0,0) is the left-bottom corner.
     * @function
     * @return {Point} The position (x,y) of the node in OpenGL coordinates
     */
    public getPosition(): Point;

    /**
     * Returns the x axis position of the node in cocos2d coordinates.
     * @function
     * @return {Number}
     */
    public getPositionX(): number;

    /**
     * Returns the y axis position of the node in cocos2d coordinates.
     * @function
     * @return {Number}
     */
    public getPositionY(): number;

    /**
     * Returns the rotation (angle) of the node in degrees. 0 is the default rotation angle. Positive values rotate node clockwise.
     * @function
     * @return {Number} The rotation of the node in degrees.
     */
    public getRotation(): number;

    /**
     * Returns the X axis rotation (angle) which represent a horizontal rotational skew of the node in degrees.
     * 0 is the default rotation angle. Positive values rotate node clockwise
     * (support only in WebGL rendering mode)
     * @function
     * @return {Number} The X rotation in degrees.
     */
    public getRotationX(): number;

    /**
     * Returns the Y axis rotation (angle) which represent a vertical rotational skew of the node in degrees.
     * 0 is the default rotation angle. Positive values rotate node clockwise
     * (support only in WebGL rendering mode)
     * @function
     * @return {Number} The Y rotation in degrees.
     */
    public getRotationY(): number;

    /**
     * Returns the scale factor of the node.
     * @warning: Assertion will fail when _scaleX != _scaleY.
     * @function
     * @return {Number} The scale factor
     */
    public getScale(): number;

    /**
     * Returns the scale factor on X axis of this node
     * @function
     * @return {Number} The scale factor on X axis.
     */
    public getScaleX(): number;

    /**
     * Returns the scale factor on Y axis of this node
     * @function
     * @return {Number} The scale factor on Y axis.
     */
    public getScaleY(): number;

    /**
     *
     *   Returns the Scheduler object used to schedule all "updates" and timers.
     *
     * @function
     * @return {Scheduler} A CCScheduler object.
     */
    public getScheduler(): Scheduler;

    /**
     * Return the shader program currently used for this node
     * @function
     * @return {GLProgram} The shader program currently used for this node
     *
     * TODO: Uncomment once GLProgram is defined.
     */

    //getShaderProgram():GLProgram;

    /**
     * Returns the skew degrees in X
     * The X skew angle of the node in degrees.
     * This angle describes the shear distortion in the X direction.
     * Thus, it is the angle between the Y axis and the left edge of the shape
     * The default skewX angle is 0. Positive values distort the node in a CW direction.
     *
     * @function
     * @return {Number} The X skew angle of the node in degrees.
     */
    public getSkewX(): number;

    /**
     * Returns the skew degrees in Y
     * The Y skew angle of the node in degrees.
     * This angle describes the shear distortion in the Y direction.
     * Thus, it is the angle between the X axis and the bottom edge of the shape
     * The default skewY angle is 0. Positive values distort the node in a CCW direction.
     *
     * @function
     * @return {Number} The Y skew angle of the node in degrees.
     */
    public getSkewY(): number;

    /**
     * Returns a tag that is used to identify the node easily.
     * @function
     * @return {Number} An integer that identifies the node.
     * @example
     *  //You can set tags to node then identify them easily.
     * // set tags
     * node1.setTag(TAG_PLAYER);
     * node2.setTag(TAG_MONSTER);
     * node3.setTag(TAG_BOSS);
     * parent.addChild(node1);
     * parent.addChild(node2);
     * parent.addChild(node3);
     * // identify by tags
     * var allChildren = parent.getChildren();
     * for(var i = 0; i < allChildren.length; i++){
     *     switch(node.getTag()) {
     *         case TAG_PLAYER:
     *             break;
     *         case TAG_MONSTER:
     *             break;
     *         case TAG_BOSS:
     *             break;
     *     }
     * }
     */
    public getTag(): number;

    /**
     *
     *     Returns a custom user data pointer
     *     You can set everything in UserData pointer, a data block, a structure or an object.
     *
     * @function
     * @return {object}  A custom user data pointer
     */
    public getUserData(): any;

    /**
     * Returns a user assigned cocos2d object.
     * Similar to userData, but instead of holding all kinds of data it can only hold a cocos2d object
     * @function
     * @return {object} A user assigned CCObject
     */
    public getUserObject(): any;

    /**
     * Returns WebGL Z vertex of this node.
     * @function
     * @return {Number} WebGL Z vertex of this node
     */
    public getVertexZ(): number;

    /**
     * Returns the inverse world affine transform matrix. The matrix is in Pixels.
     * @function
     * @return {AffineTransform}
     */
    public getWorldToNodeTransform(): AffineTransform;

    /**
     * Returns z order of this node
     * @function
     * @return {Number}
     * @deprecated since 3.0, please use getLocalZOrder instead
     */
    public getZOrder(): number;

    /**
     *
     *     Sets whether the anchor point will be ignored when you position this node.
     *     When anchor point ignored, position will be calculated based on the origin point (0, 0) in parent's coordinates.
     *     This is an internal method, only used by CCLayer and CCScene. Don't call it outside framework.
     *     The default value is false, while in CCLayer and CCScene are true
     *
     * @function
     * @param {Boolean} newValue true if anchor point will be ignored when you position this node
     */
    public ignoreAnchorPointForPosition(newValue: boolean): boolean;

    /**
     * Returns whether node's color value affect its child nodes.
     * @function
     * @returns {boolean}
     */
    public isCascadeColorEnabled(): boolean;

    /**
     * Returns whether node's opacity value affect its child nodes.
     * @function
     * @returns {boolean}
     */
    public isCascadeOpacityEnabled(): boolean;

    /**
     * Returns whether the anchor point will be ignored when you position this node.
     * When anchor point ignored, position will be calculated based on the origin point (0, 0) in parent's coordinates.
     * @function
     * @see Node#ignoreAnchorPointForPosition
     * @return {Boolean} true if the anchor point will be ignored when you position this node.
     */
    public isIgnoreAnchorPointForPosition(): boolean;

    /**
     * Get whether color should be changed with the opacity value
     * @function
     * @return {Boolean}
     */
    public isOpacityModifyRGB(): boolean;

    /**
     *
     *     Returns whether or not the node accepts event callbacks.
     *     Running means the node accept event callbacks like onEnter(), onExit(), update()
     *
     * @function
     * @return {Boolean} Whether or not the node is running.
     */
    public isRunning(): boolean;

    /**
     * Returns if the node is visible
     * @function
     * @see Node#setVisible
     * @return {Boolean} true if the node is visible, false if the node is hidden.
     */
    public isVisible(): boolean;

    /**
     * Returns the matrix that transform the node's (local) space coordinates into the parent's space coordinates.
     * The matrix is in Pixels.
     * @function
     * @return {AffineTransform}
     * @deprecated since v3.0, please use getNodeToParentTransform instead
     */
    public nodeToParentTransform(): AffineTransform;

    /**
     * @function
     * @deprecated since v3.0, please use getNodeToWorldTransform instead
     */
    public nodeToWorldTransform(): AffineTransform;

    /**
     *
     *     Event callback that is invoked every time when CCNode enters the 'stage'.
     *     If the CCNode enters the 'stage' with a transition, this event is called when the transition starts.
     *     During onEnter you can't access a "sister/brother" node.
     *     If you override onEnter, you must call its parent's onEnter function with this._super().
     *
     * @function
     */
    public onEnter(): void;

    /**
     *
     *     Event callback that is invoked when the CCNode enters in the 'stage'.
     *     If the CCNode enters the 'stage' with a transition, this event is called when the transition finishes.
     *     If you override onEnterTransitionDidFinish, you shall call its parent's onEnterTransitionDidFinish with this._super()
     *
     * @function
     */
    public onEnterTransitionDidFinish(): void;

    /**
     *
     * callback that is called every time the Node leaves the 'stage'.
     * If the Node leaves the 'stage' with a transition, this callback is called when the transition finishes.
     * During onExit you can't access a sibling node.
     * If you override onExit, you shall call its parent's onExit with this._super().
     *
     * @function
     */
    public onExit(): void;

    /**
     * callback that is called every time the Node leaves the 'stage'.
     * If the Node leaves the 'stage' with a transition, this callback is called when the transition starts.
     * If you override onExitTransitionDidStart, you shall call its parent's onExitTransitionDidStart with this._super()
     * @function
     */
    public onExitTransitionDidStart(): void;

    /**
     * @function
     * @deprecated since v3.0, please use getParentToNodeTransform instead
     */
    public parentToNodeTransform(): AffineTransform;

    /**
     * Pauses all scheduled selectors and actions.
     * This method is called internally by onExit
     * @function
     */
    public pause(): void;

    /**
     * Pauses all scheduled selectors and actions.
     * This method is called internally by onExit
     * @deprecated since v3.0, please use pause instead
     * @function
     */
    public pauseSchedulerAndActions(): void;

    /**
     * Currently JavaScript Bindings (JSB), in some cases, needs to use retain and release. This is a bug in JSB,
     * and the ugly workaround is to use retain/release. So, these 2 methods were added to be compatible with JSB.
     * This is a hack, and should be removed once JSB fixes the retain/release bug
     * You will need to retain an object if you created an engine object and haven't added it into the scene graph during the same frame.
     * Otherwise, JSB's native autorelease pool will consider this object a useless one and release it directly,
     * when you want to use it later, a "Invalid Native Object" error will be raised.
     * The retain function can increase a reference count for the native object to avoid it being released,
     * you need to manually invoke release function when you think this object is no longer needed, otherwise, there will be memory learks.
     * retain and release function call should be paired in developer's game code.
     * @function
     * @see Node#retain
     */
    public release(): void;

    /**
     * Removes all children from the container and do a cleanup all running actions depending on the cleanup parameter.
     * If the cleanup parameter is not passed, it will force a cleanup.
     * @function
     * @param {Boolean} [cleanup=true] true if all running actions on all children nodes should be cleanup, false otherwise.
     */
    public removeAllChildren(cleanup?: boolean): void;

    /**
     * TODO: This method makes no sense. How is it any different than just calling Node::removeAllChildren()?
     *       I'm guessing this is a bug, and that this method should take no params,
     *       and call Node::removeAllChildren(true).
     * Removes all children from the container and do a cleanup all running actions depending on the cleanup parameter.
     * @param {Boolean} [cleanup=true]
     */
    public removeAllChildrenWithCleanup(cleanup?: boolean): void;

    /**
     * Removes all components of Node, it called when Node is exiting from stage.
     * @function
     */
    public removeAllComponents(): void;

    /** Removes a child from the container. It will also cleanup all running actions depending on the cleanup parameter.
     * If the cleanup parameter is not passed, it will force a cleanup.
     *  "remove" logic MUST only be on this method
     * If a class wants to extend the 'removeChild' behavior it only needs
     * to override this method
     * @function
     * @param {Node} child  The child node which will be removed.
     * @param {Boolean} [cleanup=true]  true if all running actions and callbacks on the child node will be cleanup, false otherwise.
     */
    public removeChild(child: Node, cleanup?: boolean): void;

    /**
     * Removes a child from the container by tag value. It will also cleanup all running actions depending on the cleanup parameter.
     * If the cleanup parameter is not passed, it will force a cleanup.
     * @function
     * @param {Number} tag An integer number that identifies a child node
     * @param {Boolean} [cleanup=true] true if all running actions and callbacks on the child node will be cleanup, false otherwise.
     * @see Node#removeChildByTag
     */
    public removeChildByTag(tag: number, cleanup?: boolean): void;

    /**
     * Removes a component identified by the given name or removes the component object given
     * @function
     * @param {Component} component
     *
     * TODO: Uncomment once Component is defined.
     */

    //removeComponent(component:Component):void;

    /**
     * Removes a component identified by the given name or removes the component object given
     * @function
     * @param {String} name
     */
    public removeComponent(name: string): void;

    /**
     * Remove itself from its parent node. If cleanup is true, then also remove all actions and callbacks.
     * If the cleanup parameter is not passed, it will force a cleanup.
     * If the node orphan, then nothing happens.
     * @function
     * @param {Boolean} [cleanup=true] true if all actions and callbacks on this node should be removed, false otherwise.
     * @see Node#removeFromParentAndCleanup
     */
    public removeFromParent(cleanup?: boolean): void;

    /**
     * Removes this node itself from its parent node.
     * If the node orphan, then nothing happens.
     * @deprecated since v3.0, please use removeFromParent() instead
     * @param {Boolean} [cleanup=true] true if all actions and callbacks on this node should be removed, false otherwise.
     */
    public removeFromParentAndCleanup(cleanup: boolean): void;

    /** Reorders a child according to a new z value.
     * The child MUST be already added.
     * @function
     * @param {Node} child An already added child node. It MUST be already added.
     * @param {Number} zOrder Z order for drawing priority. Please refer to setZOrder(int)
     */
    public reorderChild(child: Node, zOrder: number): void;

    /**
     * Resumes all scheduled selectors and actions.
     * This method is called internally by onEnter
     */
    public resume(): void;

    /**
     * Resumes all scheduled selectors and actions.
     * This method is called internally by onEnter
     * @function
     * @deprecated since v3.0, please use resume() instead
     */
    public resumeSchedulerAndActions(): void;

    /**
     * Currently JavaScript Bindings (JSB), in some cases, needs to use retain and release. This is a bug in JSB,
     * and the ugly workaround is to use retain/release. So, these 2 methods were added to be compatible with JSB.
     * This is a hack, and should be removed once JSB fixes the retain/release bug
     * You will need to retain an object if you created an engine object and haven't added it into the scene graph during the same frame.
     * Otherwise, JSB's native autorelease pool will consider this object a useless one and release it directly,
     * when you want to use it later, a "Invalid Native Object" error will be raised.
     * The retain function can increase a reference count for the native object to avoid it being released,
     * you need to manually invoke release function when you think this object is no longer needed, otherwise, there will be memory learks.
     * retain and release function call should be paired in developer's game code.
     * @function
     * @see Node#release
     */
    public retain(): void;

    /**
     * Executes an action, and returns the action that is executed.
     * The node becomes the action's target. Refer to Action's getTarget()
     * @function
     * @warning Starting from v0.8 actions don't retain their target anymore.
     * @param {Action} action
     * @return {Action} An Action pointer
     */
    public runAction<T>(action: T): T;

    /**
     *Sets the additional transform.
     *  The additional transform will be concatenated at the end of getNodeToParentTransform.
     *  It could be used to simulate `parent-child` relationship between two nodes (e.g. one is in BatchNode, another isn't).
     *
     *  @function
     *  @param {AffineTransform} xform  The additional transform
     *  @example
     * // create a batchNode
     * var batch = new SpriteBatchNode("Icon-114.png");
     * this.addChild(batch);
     *
     * // create two sprites, spriteA will be added to batchNode, they are using different textures.
     * var spriteA = new Sprite(batch->getTexture());
     * var spriteB = new Sprite("Icon-72.png");
     *
     * batch.addChild(spriteA);
     *
     * // We can't make spriteB as spriteA's child since they use different textures. So just add it to layer.
     * // But we want to simulate `parent-child` relationship for these two node.
     * this.addChild(spriteB);
     *
     * //position
     * spriteA.setPosition(ccp(200, 200));
     *
     * // Gets the spriteA's transform.
     * var t = spriteA.getNodeToParentTransform();
     *
     * // Sets the additional transform to spriteB, spriteB's position will based on its pseudo parent i.e. spriteA.
     * spriteB.setAdditionalTransform(t);
     *
     * //scale
     * spriteA.setScale(2);
     *
     * // Gets the spriteA's transform.
     * t = spriteA.getNodeToParentTransform();
     *
     * // Sets the additional transform to spriteB, spriteB's scale will based on its pseudo parent i.e. spriteA.
     * spriteB.setAdditionalTransform(t);
     *
     * //rotation
     * spriteA.setRotation(20);
     *
     * // Gets the spriteA's transform.
     * t = spriteA.getNodeToParentTransform();
     *
     * // Sets the additional transform to spriteB, spriteB's rotation will based on its pseudo parent i.e. spriteA.
     * spriteB.setAdditionalTransform(t);
     */
    public setAdditionalTransform(xform: AffineTransform): void;

    /**
     * Schedules a custom selector.
     * If the selector is already scheduled, then the interval parameter will be updated without scheduling it again.
     * @function
     * @param {function} callback A function wrapped as a selector
     * @param {Number} interval  default=0 Tick interval in seconds. 0 means tick every frame. If interval = 0, it's recommended to use scheduleUpdate() instead.
     * @param {Number} repeat   default = cc.REPEAT_FOREVER; The selector will be executed (repeat + 1) times, you can use kCCRepeatForever for tick infinitely.
     * @param {Number} delay   default = 0 The amount of time that the first tick will wait before execution.
     * @param {String} key default = this.__instanceId; The only string identifying the callback
     */
    public schedule(
      callback: (arg?: any) => void,
      interval?: number,
      repeat?: string | number,
      delay?: number,
      key?: String
    ): void;

    /**
     * Schedules a callback function that runs only once, with a delay of 0 or larger
     * @function
     * @see Node#schedule
     * @param {function} callback  A function wrapped as a selector
     * @param {Number} delay  The amount of time that the first tick will wait before execution.
     * @param {String} key The only string identifying the callback
     */
    public scheduleOnce(callback: (arg?: any) => void, delay: number, key?: string): void;

    /**
     * schedules the "update" method.
     * It will use the order number 0. This method will be called every frame.
     * Scheduled methods with a lower order value will be called before the ones that have a higher order value.
     * Only one "update" method could be scheduled per node.
     * @function
     */
    public scheduleUpdate(): void;

    /**
     *
     * schedules the "update" callback function with a custom priority.
     * This callback function will be called every frame.
     * Scheduled callback functions with a lower priority will be called before the ones that have a higher value.
     * Only one "update" callback function could be scheduled per node (You can't have 2 'update' callback functions).
     *
     * @function
     * @param {Number} priority
     */
    public scheduleUpdateWithPriority(priority: number): void;

    /**
     * Sets the ActionManager object that is used by all actions.
     * @function
     * @warning If you set a new CCActionManager, then previously created actions will be removed.
     * @param {ActionManager} actionManager A CCActionManager object that is used by all actions.
     */
    public setActionManager(actionManager: ActionManager): void;

    /**
     *
     *     Sets the anchor point in percent.
     *
     *     anchor point is the point around which all transformations and positioning manipulations take place.
     *     It's like a pin in the node where it is "attached" to its parent.
     *     The anchorPoint is normalized, like a percentage. (0,0) means the bottom-left corner and (1,1) means the top-right corner.
     *     But you can use values higher than (1,1) and lower than (0,0) too.
     *     The default anchor point is (0.5,0.5), so it starts at the center of the node.
     *
     * @function
     * @param {Point} point The anchor point of node or The x axis anchor of node.
     * @param {Number} [y] The y axis anchor of node.
     */
    public setAnchorPoint(point: Point | number, y?: number): void;

    /**
     * Enable or disable cascade color, if cascade enabled, child nodes' opacity will be the cascade value of parent color and its own color.
     * @param {boolean} cascadeColorEnabled
     */
    public setCascadeColorEnabled(cascadeColorEnabled: boolean): void;

    /**
     * Enable or disable cascade opacity, if cascade enabled, child nodes' opacity will be the multiplication of parent opacity and its own opacity.
     * @function
     * @param {boolean} cascadeOpacityEnabled
     */
    public setCascadeOpacityEnabled(cascadeOpacityEnabled: boolean): void;

    /**
     * Sets the color of Node.
     * When color doesn't include opacity value like color(128,128,128), this function only change the color.
     * When color include opacity like color(128,128,128,100), then this function will change the color and the opacity.
     * @function
     * @param {Color} color The new color given
     */
    public setColor(color: Color): void;

    /**
     *
     *     Sets the untransformed size of the node.
     *
     *     The contentSize remains the same no matter the node is scaled or rotated.
     *     All nodes has a size. Layer and Scene has the same size of the screen.
     *
     * @function
     * @param {Number} size The untransformed size's width of the node.
     * @param {Number} [height] The untransformed size's height of the node.
     */
    public setContentSize(size: Size | number, height?: number): void;

    /**
     * Defines the oder in which the nodes are renderer.
     * Nodes that have a Global Z Order lower, are renderer first.
     *
     * In case two or more nodes have the same Global Z Order, the oder is not guaranteed.
     * The only exception if the Nodes have a Global Z Order == 0. In that case, the Scene Graph order is used.
     *
     * By default, all nodes have a Global Z Order = 0. That means that by default, the Scene Graph order is used to render the nodes.
     *
     * Global Z Order is useful when you need to render nodes in an order different than the Scene Graph order.
     *
     * Limitations: Global Z Order can't be used used by Nodes that have SpriteBatchNode as one of their ancestors.
     * And if ClippingNode is one of the ancestors, then "global Z order" will be relative to the ClippingNode.
     * @function
     * @param {Number} globalZOrder
     */
    public setGlobalZOrder(globalZOrder: number): void;

    /**
     * Sets the state of OpenGL server side.
     * @function
     * @param {Number} state The state of OpenGL server side.
     * @deprecated since v3.0, no need anymore
     */
    public setGLServerState(state: number): void;

    /**
     *  LocalZOrder is the 'key' used to sort the node relative to its siblings.
     *
     * The Node's parent will sort all its children based ont the LocalZOrder value.
     * If two nodes have the same LocalZOrder, then the node that was added first to the children's array
     * will be in front of the other node in the array.
     *
     * Also, the Scene Graph is traversed using the "In-Order" tree traversal algorithm ( http://en.wikipedia.org/wiki/Tree_traversal#In-order )
     *
     * And Nodes that have LocalZOder values < 0 are the "left" subtree
     * While Nodes with LocalZOder >=0 are the "right" subtree.
     * @function
     * @param {Number} localZOrder
     */
    public setLocalZOrder(localZOrder: number): void;

    /**
     * Changes the name that is used to identify the node easily.
     * @function
     * @param {String} name
     */
    public setName(name: string): void;

    /**
     * TODO: Update this with an explanation of this method's purpose/functionality.
     */
    public setNodeDirty(): void;

    /**
     *
     * Sets the position (x,y) using values between 0 and 1.
     * The positions in pixels is calculated like the following:
     *   _position = _normalizedPosition * parent.getContentSize()
     *
     * @param {Point} pos
     */
    public setNormalizedPosition(pos: Point): void;

    /**
     *
     * Sets the position (x,y) using values between 0 and 1.
     * The positions in pixels is calculated like the following:
     *   _position = _normalizedPosition * parent.getContentSize()
     *
     * @param {Number} x
     * @param {Number} y
     */
    public setNormalizedPosition(x: number, y: number): void;

    /**
     * Sets the opacity of Node
     * @function
     * @param {Number} opacity
     */
    public setOpacity(opacity: number): void;

    /**
     * Set whether color should be changed with the opacity value,
     * useless in Node, but this function is override in some class to have such behavior.
     * @function
     * @param {Boolean} opacityValue
     */
    public setOpacityModifyRGB(opacityValue: boolean): void;

    /**
     *
     *     Sets the arrival order when this node has a same ZOrder with other children.
     *
     *     A node which called addChild subsequently will take a larger arrival order,
     *     If two children have the same Z order, the child with larger arrival order will be drawn later.
     *
     * @function
     * @warning This method is used internally for zOrder sorting, don't change this manually
     * @param {Number} order  The arrival order.
     */
    public setOrderOfArrival(order: number): void;

    /**
     * Sets the parent node
     * @param {Node} parent A reference to the parent node
     */
    public setParent(parent: Node): void;

    /**
     *
     *     Changes the position (x,y) of the node in cocos2d coordinates.
     *     The original point (0,0) is at the left-bottom corner of screen.
     *     Usually we use p(x,y) to compose CCPoint object.
     *     and Passing two numbers (x,y) is more efficient than passing CCPoint object.
     *
     * @function
     * @param {Point} point The position (x,y) of the node in coordinates or the X coordinate for position
     * @param {Number} [y] The Y coordinate for position
     * @example
     *    var size = winSize;
     *    node.setPosition(size.width/2, size.height/2);
     */
    public setPosition(point: Point | number, y?: number): void;
    public setPosition(...positionArr: number[]): void;

    /**
     * Sets the x axis position of the node in cocos2d coordinates.
     * @function
     * @param {Number} x The new position in x axis
     */
    public setPositionX(x: number): void;

    /**
     * Sets the y axis position of the node in cocos2d coordinates.
     * @function
     * @param {Number} y The new position in y axis
     */
    public setPositionY(y: number): void;

    /**
     *
     *     Sets the rotation (angle) of the node in degrees.
     *
     *      0 is the default rotation angle.
     *      Positive values rotate node clockwise, and negative values for anti-clockwise.
     *
     * @function
     * @param {Number} degrees The rotation of the node in degrees.
     */
    public setRotation(degrees: number): void;

    /**
     *
     *     Sets the X rotation (angle) of the node in degrees which performs a horizontal rotational skew.
     *     (support only in WebGL rendering mode)
     *     0 is the default rotation angle.
     *     Positive values rotate node clockwise, and negative values for anti-clockwise.
     *
     * @param {Number} degrees The X rotation in degrees which performs a horizontal rotational skew.
     */
    public setRotationX(degrees: number): void;

    /**
     *
     *    Sets the Y rotation (angle) of the node in degrees which performs a vertical rotational skew.
     *    (support only in WebGL rendering mode)
     *    0 is the default rotation angle.
     *    Positive values rotate node clockwise, and negative values for anti-clockwise.
     *
     * @param degrees The Y rotation in degrees.
     */
    public setRotationY(degrees: number): void;

    /**
     * Uniformly modifies both the X and Y scale values. 1.0 is the default scale factor.
     * @function
     * @param {Number} scale
     */
    public setScale(scale: number): void;

    /**
     * Sets the scale factor of the node. 1.0 is the default scale factor. This function can modify the X and Y scale at the same time.
     * @function
     * @param {Number} scaleX
     * @param {Number} scaleY
     */
    public setScale(scaleX: number, scaleY: number): void;

    /**
     *
     *     Changes the scale factor on X axis of this node
     *     The default value is 1.0 if you haven't changed it before
     *
     * @function
     * @param {Number} scale The scale factor on X axis.
     */
    public setScaleX(scale: number): void;

    /**
     *
     *     Changes the scale factor on Y axis of this node
     *     The Default value is 1.0 if you haven't changed it before.
     *
     * @function
     * @param {Number} scale The scale factor on Y axis.
     */
    public setScaleY(scale: number): void;

    /**
     *
     *   Sets a CCScheduler object that is used to schedule all "updates" and timers.
     *   IMPORTANT: If you set a new Scheduler, then previously created timers/update are going to be removed.
     *
     * @function
     * @warning If you set a new CCScheduler, then previously created timers/update are going to be removed.
     * @param scheduler A Scheduler object that is used to schedule all "update" and timers.
     */
    public setScheduler(scheduler: Scheduler): void;

    /**
     *
     *     Sets the shader program for this node
     *
     *     Since v2.0, each rendering node must set its shader program.
     *     It should be set in initialize phase.
     *
     * @function
     * @param {GLProgram} newShaderProgram The shader program which fetches from CCShaderCache.
     * @example
     * node.setGLProgram(shaderCache.programForKey(SHADER_POSITION_TEXTURECOLOR));
     *
     * TODO: Uncomment once GLProgram is defined.
     */

    //setShaderProgram(newShaderProgram:GLProgram):void;

    /**
     *
     * Changes the X skew angle of the node in degrees.
     *
     * This angle describes the shear distortion in the X direction.
     * Thus, it is the angle between the Y axis and the left edge of the shape
     * The default skewX angle is 0. Positive values distort the node in a CW direction.
     *
     * @function
     * @param {Number} angle The X skew angle of the node in degrees.
     */
    public setSkewX(angle: number): void;

    /**
     *
     * Changes the Y skew angle of the node in degrees.
     *
     * This angle describes the shear distortion in the Y direction.
     * Thus, it is the angle between the X axis and the bottom edge of the shape
     * The default skewY angle is 0. Positive values distort the node in a CCW direction.
     *
     * @function
     * @param {Number} angle The Y skew angle of the node in degrees.
     */
    public setSkewY(angle: number): void;

    /**
     * Changes the tag that is used to identify the node easily.
     * Please refer to getTag for the sample code.
     * @function
     * @see Node#getTag
     * @param {Number} tag A integer that identifies the node.
     */
    public setTag(tag: number): void;

    /**
     *
     *    Sets a custom user data reference
     *    You can set everything in UserData reference, a data block, a structure or an object, etc.
     *
     * @function
     * @warning Don't forget to release the memory manually in JSB, especially before you change this data pointer, and before this node is autoreleased.
     * @param {object} data A custom user data
     */
    public setUserData(data: any): void;

    /**
     *
     *      Sets a user assigned cocos2d object
     *      Similar to UserData, but instead of holding all kinds of data it can only hold a cocos2d object
     *      In JSB, the UserObject will be retained once in this method, and the previous UserObject (if existed) will be release.
     *      The UserObject will be released in CCNode's destruction.
     *
     * @param {object} obj A user cocos2d object
     */
    public setUserObject(obj: any): void;

    /**
     *
     *     Sets the real WebGL Z vertex.
     *
     *      Differences between openGL Z vertex and cocos2d Z order:
     *      - WebGL Z modifies the Z vertex, and not the Z order in the relation between parent-children
     *      - WebGL Z might require to set 2D projection
     *      - cocos2d Z order works OK if all the nodes uses the same WebGL Z vertex. eg: vertexZ = 0
     *
     *      @warning Use it at your own risk since it might break the cocos2d parent-children z order
     *
     * @function
     * @param {Number} angle
     */
    public setVertexZ(angle: number): void;

    /**
     * Sets whether the node is visible
     * The default value is true
     * @function
     * @param {Boolean} visible Pass true to make the node visible, false to hide the node.
     */
    public setVisible(visible: boolean): void;

    /**
     *
     *     Sets the Z order which stands for the drawing order, and reorder this node in its parent's children array.
     *
     *      The Z order of node is relative to its "brothers": children of the same parent.
     *      It's nothing to do with OpenGL's z vertex. This one only affects the draw order of nodes in cocos2d.
     *      The larger number it is, the later this node will be drawn in each message loop.
     *      Please refer to setVertexZ(float) for the difference.
     *
     * @function
     * @param {Number} z Z order of this node.
     * @deprecated since 3.0, please use setLocalZOrder instead
     */
    public setZOrder(z: number): void;

    /**
     *
     *     Sorts the children array once before drawing, instead of every time when a child is added or reordered.
     *     This approach can improves the performance massively.
     *
     * @function
     * @note Don't call this manually unless a child added needs to be removed in the same frame
     */
    public sortAllChildren(): void;

    /**
     * Stops and removes an action from the running action list.
     * @function
     * @param {Action} action An action object to be removed.
     */
    public stopAction(action: Action): void;

    /**
     * Removes an action from the running action list by its tag.
     * @function
     * @param {Number} tag A tag that indicates the action to be removed.
     */
    public stopActionByTag(tag: number): void;

    /**
     * Stops and removes all actions from the running action list .
     * @function
     */
    public stopAllActions(): void;

    /**
     * Performs view-matrix transformation based on position, scale, rotation and other attributes.
     * @function
     * @param {Node.RenderCmd} parentCmd parent's render command
     * @param {boolean} recursive whether call its children's transform
     */
    public transform(parentCmd: Node.RenderCmd, recursive: boolean): void;

    // TODO: The comments say to never call this externally, but it's not marked as private (no '_' prefix).
    //       Determine whether or not this should be exposed, and if not, remove it.
    //       For now though, leave it commented out.
    // Internal use only, do not call it by yourself,
    //transformAncestors():void;

    /**
     * unschedules a custom callback function.
     * @function
     * @see Node#schedule
     * @param {function} callback_fn  A function wrapped as a selector
     */
    public unschedule(callback_fn: (arg?: any) => void): void;

    /**
     * unschedule all scheduled callback functions: custom callback functions, and the 'update' callback function.
     * Actions are not affected by this method.
     * @function
     */
    public unscheduleAllCallbacks(): void;

    /**
     * Unschedules the "update" method.
     * @function
     * @see Node#scheduleUpdate
     */
    public unscheduleUpdate(): void;

    /**
     * Update will be called automatically every frame if "scheduleUpdate" is called when the node is "live".
     * The default behavior is to invoke the visit function of node's componentContainer.
     * Override me to implement your own update logic.
     * @function
     * @param {Number} dt Delta time since last update
     */
    public update(dt: number): void;

    /**
     * Update the displayed color of Node
     * @function
     * @param {Color} parentColor
     */
    public updateDisplayedColor(parentColor: Color): void;

    /**
     * Update displayed opacity
     * @function
     * @param {Number} parentOpacity
     */
    public updateDisplayedOpacity(parentOpacity: number): void;

    /**
     *
     * Calls children's updateTransform() method recursively.
     *
     * This method is moved from CCSprite, so it's no longer specific to CCSprite.
     * As the result, you apply CCSpriteBatchNode's optimization on your customed CCNode.
     * e.g., batchNode->addChild(myCustomNode), while you can only addChild(sprite) before.
     *
     * @function
     */
    public updateTransform(): void;

    /**
     * Returns a component identified by the name given.
     * @function
     * @param {String} name The name to search for
     * @return {cc.Component} The component found
     */
    public getComponent(name): mz.Component;

    /**
     * Adds a component to the node's component container.
     * @function
     * @param {cc.Component} component
     */
    public addComponent(component): void;

    /**
     * Removes a component identified by the given name or removes the component object given
     * @function
     * @param {String|cc.Component} component
     */
    public removeComponent(component): boolean;

    /**
     * Removes all components of cc.Node, it called when cc.Node is exiting from stage.
     * @function
     */
    public removeAllComponents(): void;

    /**
     * Recursive method that visit its children and draw them
     * @function
     * @param {Node.RenderCmd} parentCmd
     */
    public visit(parentCmd: Node.RenderCmd): void;

    /**
     * @function
     * @deprecated since v3.0, please use getWorldToNodeTransform instead
     */
    public worldToNodeTransform(): AffineTransform;
  }

  // +--------------------------------------------------------------------------------
  // + File: cocos2d/core/base-nodes/CCAtlasNode.js
  // +--------------------------------------------------------------------------------
  /**
   * <p>AtlasNode is a subclass of Node, it knows how to render a TextureAtlas object. </p>
   *
   * <p>If you are going to render a TextureAtlas consider subclassing AtlasNode (or a subclass of AtlasNode)</p>
   *
   * <p>All features from Node are valid</p>
   *
   * <p>You can create a AtlasNode with an Atlas file, the width, the height of each item and the quantity of items to render</p>
   *
   * @class
   * @extends Node
   *
   * @param {String} tile
   * @param {Number} tileWidth
   * @param {Number} tileHeight
   * @param {Number} itemsToRender
   * @example
   * var node = new AtlasNode("pathOfTile", 16, 16, 1);
   *
   * @property {Texture2D}     texture         - Current used texture
   * @property {TextureAtlas}  textureAtlas    - Texture atlas for AtlasNode
   * @property {Number}           quadsToDraw     - Number of quads to draw
   */
  export class AtlasNode extends Node {
    public texture: Texture2D;
    public textureAtlas: TextureAtlas;
    public quadsToDraw: number;

    /**
     * <p>Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.</p>
     * @param {String} tile
     * @param {Number} tileWidth
     * @param {Number} tileHeight
     * @param {Number} itemsToRender
     */
    public constructor(tile: string, tileWidth: number, tileHeight: number, itemsToRender: number);

    //public ctor(tile?:string, tileWidth?:number, tileHeight?:number, itemsToRender?:number):void;

    /**
     * Updates the Atlas (indexed vertex array).
     * Empty implementation, shall be overridden in subclasses
     * @function
     */
    public updateAtlasValues(): void;

    /**
     * Get node's blend function
     * @function
     * @return {BlendFunc}
     */
    public getBlendFunc(): BlendFunc;

    /**
     * Set node's blend function
     * This function accept either BlendFunc object or source value and destination value
     * @function
     * @param {Number | BlendFunc} src
     * @param {Number} dst
     */
    public setBlendFunc(src: BlendFunc | number, dst?: number): void;

    /**
     * Set the atlas texture
     * @function
     * @param {TextureAtlas} value The texture
     */
    public setTextureAtlas(value: TextureAtlas): void;

    /**
     * Get the atlas texture
     * @function
     * @return {TextureAtlas}
     */
    public getTextureAtlas(): TextureAtlas;

    /**
     * Get the number of quads to be rendered
     * @function
     * @return {Number}
     */
    public getQuadsToDraw(): number;

    /**
     * Set the number of quads to be rendered
     * @function
     * @param {Number} quadsToDraw
     */
    public setQuadsToDraw(quadsToDraw: number): void;

    /**
     * Initializes an AtlasNode object with an atlas texture file name, the width, the height of each tile and the quantity of tiles to render
     * @function
     * @param {String} tile             The atlas texture file name
     * @param {Number} tileWidth        The width of each tile
     * @param {Number} tileHeight       The height of each tile
     * @param {Number} itemsToRender    The quantity of tiles to be rendered
     * @return {Boolean}
     */
    public initWithTileFile(
      tile: string,
      tileWidth: number,
      tileHeight: number,
      itemsToRender: number
    ): boolean;

    /**
     * Initializes an CCAtlasNode with an atlas texture, the width, the height of each tile and the quantity of tiles to render
     * @function
     * @param {Texture2D} texture    The atlas texture
     * @param {Number} tileWidth        The width of each tile
     * @param {Number} tileHeight       The height of each tile
     * @param {Number} itemsToRender    The quantity of tiles to be rendered
     * @return {Boolean}
     */
    public initWithTexture(
      texture: Texture2D,
      tileWidth: number,
      tileHeight: number,
      itemsToRender: number
    ): boolean;

    /**
     * Get the current texture
     * @function
     * @return {Texture2D}
     */
    public getTexture(): Texture2D;

    /**
     * Replace the current texture with a new one
     * @function
     * @param {Texture2D} texture    The new texture
     */
    public setTexture(texture: Texture2D): void;

    // apply by EventHelper

    public addEventListener(type: string, listener: (...args) => {}, target: any);

    public hasEventListener(type: string, listener: (...args) => {}, target: any);

    public removeEventListener(type: string, listener: (...args) => {}, target: any);

    public dispatchEvent(event: string, clearAfterDispatch?: boolean);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //  boot.d.ts                                                                                              //
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  type LoadJsonCallback = (error: Error, json: {}) => void;

  export interface ConfigKey {
    engineDir: string;
    dependencies: string;
    debugMode: string;
    showFPS: string;
    frameRate: string;
    id: string;
    renderMode: string;
    jsList: string;
    classReleaseMode: string;
  }

  // +-------------------- Variable Definitions --------------------+ //
  //export const director:Director;

  // +-------------------- Function Definitions --------------------+ //

  /**
   * A string tool to construct a string with format string.
   * for example:
   *      formatStr("a: %d, b: %b", a, b);
   *      formatStr(a, b, c);
   * @returns {String}
   */
  export function formatStr(...args: any[]): string;

  export function log(...args: any[]): void;

  export function warn(...args: any[]): void;

  export function error(...args: any[]): void;

  export function assert(test: boolean, msg: string): void;

  // export function newElement(x);

  // export function _addEventListener(element, type, listener, useCapture);

  /**
   * Iterate over an object or an array, executing a function for each matched element.
   * @param {object|array} obj
   * @param {function} iterator
   * @param {object} [context]
   */
  export function each(
    obj: any,
    iterator: (ctx: any, prop: any, index: number) => boolean,
    context: any
  ): void;

  /**
   * Copy all of the properties in source objects to target object and return the target object.
   * @param {object} target
   * @param {object|Array} sources
   * @returns {object}
   */
  export function extend(target: any): any;

  /**
   * Check the obj whether is function or not
   * @param {any} obj
   * @returns {boolean}
   */
  export function isFunction(obj: any): boolean;

  /**
   * Check the obj whether is number or not
   * @param {any} obj
   * @returns {boolean}
   */
  export function isNumber(obj: any): boolean;

  /**
   * Check the obj whether is string or not
   * @param {any} obj
   * @returns {boolean}
   */
  export function isString(obj: any): boolean;

  /**
   * Check the obj whether is array or not
   * @param {any} obj
   * @returns {boolean}
   */
  export function isArray(obj: any): boolean;

  /**
   * Check the obj whether is undefined or not
   * @param {any} obj
   * @returns {boolean}
   */
  export function isUndefined(obj: any): boolean;

  /**
   * Check the obj whether is object or not
   * @param {*} obj
   * @returns {boolean}
   */
  export function isObject(obj: any): boolean;

  /**
   * Check the url whether cross origin
   * @param {String} url
   * @returns {boolean}
   */
  export function isCrossOrigin(url: string): boolean;

  // +-------------------- Class Definitions --------------------+ //

  /**
   * Async Pool class, a helper of async
   * @param {Object|Array} srcObj
   * @param {Number} limit the limit of parallel number;
   * @param {function} iterator
   * @param {function} onEnd
   * @param {object} target
   * @constructor
   */
  export class AsyncPool {
    constructor(srcObj: any, limit: number, iterator: () => void, onEnd: () => void, target: any);

    onIterator(iterator: any, target: any): void;

    onEnd(endCb: any, endCbTarget: any): void;

    flow(): void;
  }

  /**
   * @class
   */
  export namespace async {
    /**
     * Do tasks series.
     * @param {Array|Object} tasks
     * @param {function} [cb] callback
     * @param {Object} [target]
     * @return {AsyncPool}
     */
    export function series(tasks: any, cb: any, target: any): AsyncPool;

    /**
     * Do tasks parallel.
     * @param {Array|Object} tasks
     * @param {function} cb callback
     * @param {Object} [target]
     * @return {AsyncPool}
     */
    export function parallel(tasks: any, cb: any, target: any): AsyncPool;

    /**
     * Do tasks waterfall.
     * @param {Array|Object} tasks
     * @param {function} cb callback
     * @param {Object} [target]
     * @return {AsyncPool}
     */
    export function waterfall(tasks: any, cb: any, target: any): AsyncPool;

    /**
     * Do tasks by iterator.
     * @param {Array|Object} tasks
     * @param {function|Object} iterator
     * @param {function} [callback]
     * @param {Object} [target]
     * @return {AsyncPool}
     */
    export function map(tasks: any, iterator: any, callback: any, target: any): AsyncPool;

    /**
     * Do tasks by iterator limit.
     * @param {Array|Object} tasks
     * @param {Number} limit
     * @param {function} iterator
     * @param {function} cb callback
     * @param {AsyncPool} [target]
     */
    export function mapLimit(
      tasks: any,
      limit: any,
      iterator: any,
      cb: any,
      target: any
    ): AsyncPool;
  }

  /**
   * @class
   */
  export namespace path {
    // Is there a built-in RegEx type in TypeScript
    //normalizeRE: /[^\.\/]+\/\.\.\//,

    /**
     * Join strings to be a path.
     * @example
     path.join("a", "b.png");//-->"a/b.png"
     path.join("a", "b", "c.png");//-->"a/b/c.png"
     path.join("a", "b");//-->"a/b"
     path.join("a", "b", "/");//-->"a/b/"
     path.join("a", "b/", "/");//-->"a/b/"
     * @returns {string}
     */
    export function join(): string;

    /**
     * Get the ext name of a path.
     * @example
     path.extname("a/b.png");//-->".png"
     path.extname("a/b.png?a=1&b=2");//-->".png"
     path.extname("a/b");//-->null
     path.extname("a/b?a=1&b=2");//-->null
     * @param {string} pathStr
     * @returns {*}
     */
    export function extname(pathStr: string): string;

    /**
     * Get the main name of a file name
     * @param {string} fileName
     * @returns {string}
     */
    export function mainFileName(fileName: string): string;

    /**
     * Get the file name of a file path.
     * @example
     path.basename("a/b.png");//-->"b.png"
     path.basename("a/b.png?a=1&b=2");//-->"b.png"
     path.basename("a/b.png", ".png");//-->"b"
     path.basename("a/b.png?a=1&b=2", ".png");//-->"b"
     path.basename("a/b.png", ".txt");//-->"b.png"
     * @param {string} pathStr
     * @param {string} [extname]
     * @returns {*}
     */
    export function basename(pathStr: string, extname: string): string;

    /**
     * Get dirname of a file path.
     * @example
     * unix
     path.driname("a/b/c.png");//-->"a/b"
     path.driname("a/b/c.png?a=1&b=2");//-->"a/b"
     path.dirname("a/b/");//-->"a/b"
     path.dirname("c.png");//-->""
     * windows
     path.driname("a\\b\\c.png");//-->"a\b"
     path.driname("a\\b\\c.png?a=1&b=2");//-->"a\b"
     * @param {string} pathStr
     * @returns {*}
     */
    export function dirname(pathStr: string): string;

    /**
     * Change extname of a file path.
     * @example
     path.changeExtname("a/b.png", ".plist");//-->"a/b.plist"
     path.changeExtname("a/b.png?a=1&b=2", ".plist");//-->"a/b.plist?a=1&b=2"
     * @param {string} pathStr
     * @param {string} [extname]
     * @returns {string}
     */
    export function changeExtname(pathStr: string, extname: string): string;

    /**
     * Change file name of a file path.
     * @example
     path.changeBasename("a/b/c.plist", "b.plist");//-->"a/b/b.plist"
     path.changeBasename("a/b/c.plist?a=1&b=2", "b.plist");//-->"a/b/b.plist?a=1&b=2"
     path.changeBasename("a/b/c.plist", ".png");//-->"a/b/c.png"
     path.changeBasename("a/b/c.plist", "b");//-->"a/b/b"
     path.changeBasename("a/b/c.plist", "b", true);//-->"a/b/b.plist"
     * @param {String} pathStr
     * @param {String} basename
     * @param {Boolean} [isSameExt]
     * @returns {string}
     */
    export function changeBasename(pathStr: string, basename: string, isSameExt: boolean): string;
  }

  /**
   * Loader for resource loading process. It's a singleton object.
   * @class
   */
  //export class loader {
  export namespace loader {
    //_jsCache: {},//cache for js
    //_register: {},//register of loaders
    //_langPathCache: {},//cache for lang path
    //_aliases: {},//aliases for res url
    //
    //resPath: "",//root path of resource
    //audioPath: "",//root path of audio
    //cache: {},//cache for data loaded

    /**
     * Get XMLHttpRequest.
     * @returns {XMLHttpRequest}
     */
    export function getXMLHttpRequest(): XMLHttpRequest;

    //@MODE_BEGIN DEV

    /**
     * Load js files.
     * If the third parameter doesn't exist, then the baseDir turns to be "".
     *
     * @param {string} [baseDir]   The pre path for jsList or the list of js path.
     * @param {array} jsList    List of js path.
     * @param {function} [cb]  Callback function
     * @returns {*}
     */
    export function loadJs(baseDir: string, jsList: string[], cb: any): void;

    /**
     * Load js width loading image.
     *
     * @param {string} [baseDir]
     * @param {array} jsList
     * @param {function} [cb]
     */
    export function loadJsWithImg(baseDir: string, jsList: string[], cb: any): void;

    /**
     * Load a single resource as txt.
     * @param {string} url
     * @param {function} [cb] arguments are : err, txt
     */
    export function loadTxt(url: string, cb: any): void;

    export function loadCsb(url: string, cb: any): void;

    /**
     * Load a single resource as json.
     * @param {string} url
     * @param {LoadJsonCallback} [cb] arguments are : err, json
     */
    export function loadJson(url: string, cb?: LoadJsonCallback): void;

    /**
     * TODO: Uncomment this when Image is defined
     * Load a single image.
     * @param {!string} url
     * @param {object} [option]
     * @param {function} callback
     * @returns {Image}
     */

    //loadImg(url:string, option:any, callback:any):Image;

    /**
     * Get url with basePath.
     * @param {string} basePath
     * @param {string} [url]
     * @returns {*}
     */
    export function getUrl(basePath: string, url: string): string;

    /**
     * Load resources then call the callback.
     * @param {any} resources
     * @param {function} [option] callback or trigger
     * @param {function|Object} [loadCallback]
     * @return {AsyncPool}
     */
    export function load(resources: any, option: any, loadCallback: any): AsyncPool;

    /**
     * <p>
     *     Loads alias map from the contents of a filename.                                        <br/>
     *                                                                                                                 <br/>
     *     @note The plist file name should follow the format below:                                                   <br/>
     *     <?xml version="1.0" encoding="UTF-8"?>                                                                      <br/>
     *         <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">  <br/>
     *             <plist version="1.0">                                                                               <br/>
     *                 <dict>                                                                                          <br/>
     *                     <key>filenames</key>                                                                        <br/>
     *                     <dict>                                                                                      <br/>
     *                         <key>sounds/click.wav</key>                                                             <br/>
     *                         <string>sounds/click.caf</string>                                                       <br/>
     *                         <key>sounds/endgame.wav</key>                                                           <br/>
     *                         <string>sounds/endgame.caf</string>                                                     <br/>
     *                         <key>sounds/gem-0.wav</key>                                                             <br/>
     *                         <string>sounds/gem-0.caf</string>                                                       <br/>
     *                     </dict>                                                                                     <br/>
     *                     <key>metadata</key>                                                                         <br/>
     *                     <dict>                                                                                      <br/>
     *                         <key>version</key>                                                                      <br/>
     *                         <integer>1</integer>                                                                    <br/>
     *                     </dict>                                                                                     <br/>
     *                 </dict>                                                                                         <br/>
     *              </plist>                                                                                           <br/>
     * </p>
     * @param {String} url  The plist file name.
     * @param {Function} [callback]
     */
    export function loadAliases(url: string, callback: any): void;

    /**
     * Register a resource loader into loader.
     * @param {string} extNames
     * @param {function} loader
     */
    export function register(extNames: string, loader: any): void;

    /**
     * Get resource data by url.
     * @param url
     * @returns {*}
     */
    export function getRes(url: string): any;

    /**
     * Release the cache of resource by url.
     * @param url
     */
    export function release(url: string): void;

    /**
     * Resource cache of all resources.
     */
    export function releaseAll(): void;
  }

  /**
   * create a webgl context
   * @param {HTMLCanvasElement} canvas
   * @param {Object} opt_attribs
   * @return {WebGLRenderingContext}
   */
  export function create3DContext(
    canvas: HTMLCanvasElement,
    opt_attribs: any
  ): WebGLRenderingContext;

  /**
   * System variables
   * @namespace
   * @name sys
   */
  export namespace sys {
    /**
     * English language code
     * @memberof sys
     * @name LANGUAGE_ENGLISH
     * @constant
     * @type {Number}
     */
    export const LANGUAGE_ENGLISH: string;

    /**
     * Chinese language code
     * @memberof sys
     * @name LANGUAGE_CHINESE
     * @constant
     * @type {Number}
     */
    export const LANGUAGE_CHINESE: string;

    /**
     * French language code
     * @memberof sys
     * @name LANGUAGE_FRENCH
     * @constant
     * @type {Number}
     */
    export const LANGUAGE_FRENCH: string;

    /**
     * Italian language code
     * @memberof sys
     * @name LANGUAGE_ITALIAN
     * @constant
     * @type {Number}
     */
    export const LANGUAGE_ITALIAN: string;

    /**
     * German language code
     * @memberof sys
     * @name LANGUAGE_GERMAN
     * @constant
     * @type {Number}
     */
    export const LANGUAGE_GERMAN: string;

    /**
     * Spanish language code
     * @memberof sys
     * @name LANGUAGE_SPANISH
     * @constant
     * @type {Number}
     */
    export const LANGUAGE_SPANISH: string;

    /**
     * Spanish language code
     * @memberof sys
     * @name LANGUAGE_DUTCH
     * @constant
     * @type {Number}
     */
    export const LANGUAGE_DUTCH: string;

    /**
     * Russian language code
     * @memberof sys
     * @name LANGUAGE_RUSSIAN
     * @constant
     * @type {Number}
     */
    export const LANGUAGE_RUSSIAN: string;

    /**
     * Korean language code
     * @memberof sys
     * @name LANGUAGE_KOREAN
     * @constant
     * @type {Number}
     */
    export const LANGUAGE_KOREAN: string;

    /**
     * Japanese language code
     * @memberof sys
     * @name LANGUAGE_JAPANESE
     * @constant
     * @type {Number}
     */
    export const LANGUAGE_JAPANESE: string;

    /**
     * Hungarian language code
     * @memberof sys
     * @name LANGUAGE_HUNGARIAN
     * @constant
     * @type {Number}
     */
    export const LANGUAGE_HUNGARIAN: string;

    /**
     * Portuguese language code
     * @memberof sys
     * @name LANGUAGE_PORTUGUESE
     * @constant
     * @type {Number}
     */
    export const LANGUAGE_PORTUGUESE: string;

    /**
     * Arabic language code
     * @memberof sys
     * @name LANGUAGE_ARABIC
     * @constant
     * @type {Number}
     */
    export const LANGUAGE_ARABIC: string;

    /**
     * Norwegian language code
     * @memberof sys
     * @name LANGUAGE_NORWEGIAN
     * @constant
     * @type {Number}
     */
    export const LANGUAGE_NORWEGIAN: string;

    /**
     * Polish language code
     * @memberof sys
     * @name LANGUAGE_POLISH
     * @constant
     * @type {Number}
     */
    export const LANGUAGE_POLISH: string;

    /**
     * @memberof sys
     * @name OS_IOS
     * @constant
     * @type {string}
     */
    export const OS_IOS: string;

    /**
     * @memberof sys
     * @name OS_ANDROID
     * @constant
     * @type {string}
     */
    export const OS_ANDROID: string;

    /**
     * @memberof sys
     * @name OS_WINDOWS
     * @constant
     * @type {string}
     */
    export const OS_WINDOWS: string;

    /**
     * @memberof sys
     * @name OS_MARMALADE
     * @constant
     * @type {string}
     */
    export const OS_MARMALADE: string;

    /**
     * @memberof sys
     * @name OS_LINUX
     * @constant
     * @type {string}
     */
    export const OS_LINUX: string;

    /**
     * @memberof sys
     * @name OS_BADA
     * @constant
     * @type {string}
     */
    export const OS_BADA: string;

    /**
     * @memberof sys
     * @name OS_BLACKBERRY
     * @constant
     * @type {string}
     */
    export const OS_BLACKBERRY: string;

    /**
     * @memberof sys
     * @name OS_OSX
     * @constant
     * @type {string}
     */
    export const OS_OSX: string;

    /**
     * @memberof sys
     * @name OS_WP8
     * @constant
     * @type {string}
     */
    export const OS_WP8: string;

    /**
     * @memberof sys
     * @name OS_WINRT
     * @constant
     * @type {string}
     */
    export const OS_WINRT: string;

    /**
     * @memberof sys
     * @name OS_UNKNOWN
     * @constant
     * @type {string}
     */
    export const OS_UNKNOWN: string;

    /**
     * @memberof sys
     * @name UNKNOWN
     * @constant
     * @default
     * @type {Number}
     */
    export const UNKNOWN: number;

    /**
     * @memberof sys
     * @name WIN32
     * @constant
     * @default
     * @type {Number}
     */
    export const WIN32: number;

    /**
     * @memberof sys
     * @name LINUX
     * @constant
     * @default
     * @type {Number}
     */
    export const LINUX: number;

    /**
     * @memberof sys
     * @name MACOS
     * @constant
     * @default
     * @type {Number}
     */
    export const MACOS: number;

    /**
     * @memberof sys
     * @name ANDROID
     * @constant
     * @default
     * @type {Number}
     */
    export const ANDROID: number;

    /**
     * @memberof sys
     * @name IOS
     * @constant
     * @default
     * @type {Number}
     */
    export const IPHONE: number;

    /**
     * @memberof sys
     * @name IOS
     * @constant
     * @default
     * @type {Number}
     */
    export const IPAD: number;

    /**
     * @memberof sys
     * @name BLACKBERRY
     * @constant
     * @default
     * @type {Number}
     */
    export const BLACKBERRY: number;

    /**
     * @memberof sys
     * @name NACL
     * @constant
     * @default
     * @type {Number}
     */
    export const NACL: number;

    /**
     * @memberof sys
     * @name EMSCRIPTEN
     * @constant
     * @default
     * @type {Number}
     */
    export const EMSCRIPTEN: number;

    /**
     * @memberof sys
     * @name TIZEN
     * @constant
     * @default
     * @type {Number}
     */
    export const TIZEN: number;

    /**
     * @memberof sys
     * @name WINRT
     * @constant
     * @default
     * @type {Number}
     */
    export const WINRT: number;

    /**
     * @memberof sys
     * @name WP8
     * @constant
     * @default
     * @type {Number}
     */
    export const WP8: number;

    /**
     * @memberof sys
     * @name MOBILE_BROWSER
     * @constant
     * @default
     * @type {Number}
     */
    export const MOBILE_BROWSER: number;

    /**
     * @memberof sys
     * @name DESKTOP_BROWSER
     * @constant
     * @default
     * @type {Number}
     */
    export const DESKTOP_BROWSER: number;

    export const BROWSER_TYPE_WECHAT: string;
    export const BROWSER_TYPE_ANDROID: string;
    export const BROWSER_TYPE_IE: string;
    export const BROWSER_TYPE_QQ: string;
    export const BROWSER_TYPE_MOBILE_QQ: string;
    export const BROWSER_TYPE_UC: string;
    export const BROWSER_TYPE_360: string;
    export const BROWSER_TYPE_BAIDU_APP: string;
    export const BROWSER_TYPE_BAIDU: string;
    export const BROWSER_TYPE_MAXTHON: string;
    export const BROWSER_TYPE_OPERA: string;
    export const BROWSER_TYPE_OUPENG: string;
    export const BROWSER_TYPE_MIUI: string;
    export const BROWSER_TYPE_FIREFOX: string;
    export const BROWSER_TYPE_SAFARI: string;
    export const BROWSER_TYPE_CHROME: string;
    export const BROWSER_TYPE_LIEBAO: string;
    export const BROWSER_TYPE_QZONE: string;
    export const BROWSER_TYPE_SOUGOU: string;
    export const BROWSER_TYPE_UNKNOWN: string;

    /**
     * Is native ? This is set to be true in jsb auto.
     * @memberof sys
     * @name isNative
     * @type {Boolean}
     */
    export const isNative: boolean;

    /**
     * Indicate whether system is mobile system
     * @memberof sys
     * @name isMobile
     * @type {Boolean}
     */
    export const isMobile: boolean;

    /**
     * Indicate the running platform
     * @memberof sys
     * @name platform
     * @type {Number}
     */
    export const platform: number;

    /**
     * Indicate the current language of the running system
     * @memberof sys
     * @name language
     * @type {String}
     */
    export const language: string;

    /**
     * Indicate the running os name
     * @memberof sys
     * @name os
     * @type {String}
     */
    export const os: string;

    /**
     * Indicate the running browser type
     * @memberof sys
     * @name browserType
     * @type {String}
     */
    export const browserType: string;

    /**
     * Indicate the running browser version
     * @memberof sys
     * @name browserVersion
     * @type {Number}
     */
    export const browserVersion: number;

    /**
     * Indicate the real pixel resolution of the whole game window
     * @memberof sys
     * @name windowPixelResolution
     * @type {Number}
     */
    export const windowPixelResolution: number;

    export namespace localStorage {
      export function getItem(name: string): string;

      export function setItem(name: string, value: string): void;

      export function removeItem(name: string): void;

      export function clear(): void;

      ///**
      // * sys.localStorage is a local storage component.
      // * @memberof sys
      // * @name localStorage
      // * @type {Object}
      // */
      //try {
      //    var localStorage = sys.localStorage = win.localStorage;
      //    localStorage.setItem("storage", "");
      //    localStorage.removeItem("storage");
      //    localStorage = null;
      //} catch (e) {
      //    var warn = function () {
      //        warn("Warning: localStorage isn't enabled. Please confirm browser cookie or privacy option");
      //    }
      //    sys.localStorage = {
      //        getItem: warn,
      //        setItem: warn,
      //        removeItem: warn,
      //        clear: warn
      //    };
    }

    export namespace capabilities {
      //var capabilities = sys.capabilities = {"canvas": true};
      //if (_renderType === _RENDER_TYPE_WEBGL)
      //    capabilities["opengl"] = true;
      //if (docEle['ontouchstart'] !== undefined || doc['ontouchstart'] !== undefined || nav.msPointerEnabled)
      //    capabilities["touches"] = true;
      //if (docEle['onmouseup'] !== undefined)
      //    capabilities["mouse"] = true;
      //if (docEle['onkeyup'] !== undefined)
      //    capabilities["keyboard"] = true;
      //if (win.DeviceMotionEvent || win.DeviceOrientationEvent)
      //    capabilities["accelerometer"] = true;
    }

    /**
     * Forces the garbage collection, only available in JSB
     * @memberof sys
     * @name garbageCollect
     * @function
     */
    export function garbageCollect(): void;

    /**
     * Dumps rooted objects, only available in JSB
     * @memberof sys
     * @name dumpRoot
     * @function
     */
    export function dumpRoot(): void;

    /**
     * Restart the JS VM, only available in JSB
     * @memberof sys
     * @name restartVM
     * @function
     */
    export function restartVM(): void;

    /**
     * Clean a script in the JS VM, only available in JSB
     * @memberof sys
     * @name cleanScript
     * @param {String} jsfile
     * @function
     */
    export function cleanScript(jsfile: string): void;

    /**
     * Check whether an object is valid,
     * In web engine, it will return true if the object exist
     * In native engine, it will return true if the JS object and the correspond native object are both valid
     * @memberof sys
     * @name isObjectValid
     * @param {Object} obj
     * @return {boolean} Validity of the object
     * @function
     */
    export function isObjectValid(obj: any): boolean;

    /**
     * Dump system informations
     * @memberof sys
     * @name dump
     * @function
     */
    export function dump(): void;

    /**
     * Open a url in browser
     * @memberof sys
     * @name openURL
     * @param {String} url
     */
    export function openURL(url: string): void;
  }

  // +++++++++++++++++++++++++something about sys end+++++++++++++++++++++++++++++

  // +++++++++++++++++++++++++something about CCGame begin+++++++++++++++++++++++++++

  /**
   * Device oriented vertically, home button on the bottom
   * @constant
   * @type {Number}
   */
  export const ORIENTATION_PORTRAIT: number;

  /**
   * Device oriented vertically, home button on the top
   * @constant
   * @type {Number}
   */
  export const ORIENTATION_PORTRAIT_UPSIDE_DOWN: number;

  /**
   * Device oriented horizontally, home button on the right
   * @constant
   * @type {Number}
   */
  export const ORIENTATION_LANDSCAPE_LEFT: number;

  /**
   * Device oriented horizontally, home button on the left
   * @constant
   * @type {Number}
   */
  export const ORIENTATION_LANDSCAPE_RIGHT: number;

  /**
   * @type {EGLView}
   * @name view
   * view is the shared view object.
   */
  export const view: EGLView;

  /**
   * @type {Director}
   * @name director
   */
  export const director: Director;
  /**
   * @type {Size}
   * @name winSize
   * winSize is the alias object for the size of the current game window.
   */
  export const winSize: Size;

  // Parsers
  /**
   * @type {SAXParser}
   * @name plistParser
   * A SAX Parser
   */
  export const saxParser: SAXParser;

  /**
   * @type {PlistParser}
   * @name plistParser
   * A Plist Parser
   */
  export const plistParser: PlistParser;

  export enum RenderTypes {
    RENDER_TYPE_CANVAS = 0,
    RENDER_TYPE_WEBGL = 1,
    RENDER_TYPE_OPENGL = 2
  }

  /**
   * An object to boot the game.
   * @class
   * @name game
   */
  //game = /** @lends game# */{
  export namespace game {
    export const DEBUG_MODE_NONE: number;
    export const DEBUG_MODE_INFO: number;
    export const DEBUG_MODE_WARN: number;
    export const DEBUG_MODE_ERROR: number;
    export const DEBUG_MODE_INFO_FOR_WEB_PAGE: number;
    export const DEBUG_MODE_WARN_FOR_WEB_PAGE: number;
    export const DEBUG_MODE_ERROR_FOR_WEB_PAGE: number;

    export const EVENT_HIDE: string;
    export const EVENT_SHOW: string;
    export const EVENT_RESIZE: string;

    export const RENDER_TYPE_CANVAS = 0;
    export const RENDER_TYPE_WEBGL = 1;
    export const RENDER_TYPE_OPENGL = 2;

    ///**
    // * Key of config
    // * @constant
    // * @type {Object}
    // */
    export const CONFIG_KEY: ConfigKey;

    ///**
    // * Config of game
    // * @type {Object}
    // */
    //config: null,

    /**
     * Callback when the scripts of engine have been load.
     * @type {Function}
     */
    export function onStart(): void;

    /**
     * Callback when game exits.
     * @type {Function}
     */
    export function onStop(): void;

    /**
     * Set frameRate of game.
     * @param frameRate
     */
    export function setFrameRate(frameRate: number): void;

    /**
     * Check whether the game is paused.
     */
    export function isPaused(): boolean;

    /**
     * Pause the game.
     */
    export function pause(): void;

    /**
     * Restart game.
     */
    export function restart(): void;

    /**
     * Resume the game from pause.
     */
    export function resume(): void;

    /**
     * Run game with configuration object and onStart function.
     * @param {Object|Function} [config] Pass configuration object or onStart function
     * @param {onStart} [onStart] onStart function to be executed after game initialized
     */
    export function run(config: Object | Function | string, onStart?: Function): void;

    /**
     * End game, it will close the game window.
     */
    export function end(): void;

    /**
     * Prepare game.
     * @param cb
     */
    export function prepare(cb?: () => void): void;
  }

  ////////////////////////////////////////////////////////////////////////////////
  //  cocoa.d.ts
  ////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////
  // File: cocos2d/core/cocoa/CCAffineTransform.js
  ////////////////////////////////////////////////////////////////////////////////

  // Function Definitions

  /**
   * Concatenate a transform matrix to another and return the result:
   * t' = t1 * t2
   * @function
   * @param {AffineTransform} lhs The first transform object
   * @param {AffineTransform} rhs The transform object to concatenate
   * @return {AffineTransform} The result of concatenation
   */
  export function affineTransformConcat(
    lhs: AffineTransform,
    rhs: AffineTransform
  ): AffineTransform;

  /**
   * Concatenate a transform matrix to another
   * The results are reflected in the first matrix.
   * t' = t1 * t2
   * @function
   * @param {AffineTransform} lhs The first transform object
   * @param {AffineTransform} rhs The transform object to concatenate
   * @return {AffineTransform} The result of concatenation
   */
  export function affineTransformConcatIn(
    lhs: AffineTransform,
    rhs: AffineTransform
  ): AffineTransform;

  /**
   * Return true if an affine transform equals to another, false otherwise.
   * @function
   * @param {AffineTransform} lhs The first transform to compare
   * @param {AffineTransform} rhs The second transform to compare
   * @return {Boolean}
   */
  export function affineTransformEqualToTransform(
    lhs: AffineTransform,
    rhs: AffineTransform
  ): boolean;

  /**
   * Create a identity transformation matrix:
   * [ 1, 0, 0,
   *   0, 1, 0 ]
   * @function
   *
   * @return {AffineTransform}
   * @deprecated since v3.0, please use affineTransformMakeIdentity() instead
   * @see affineTransformMakeIdentity
   */
  export function affineTransformIdentity(): AffineTransform;

  /**
   * Get the invert transform of an AffineTransform object
   * @function
   * @param {AffineTransform} xform The source transform
   * @return {AffineTransform} The inverted transform object
   */
  export function affineTransformInvert(xform: AffineTransform): AffineTransform;

  /**
   * Create a AffineTransform object with all contents in the matrix
   * @function
   *
   * @param {number} a
   * @param {number} b
   * @param {number} c
   * @param {number} d
   * @param {number} tx
   * @param {number} ty
   * @return {AffineTransform}
   */
  export function affineTransformMake(
    a: number,
    b: number,
    c: number,
    d: number,
    tx: number,
    ty: number
  ): AffineTransform;

  /**
   * Create a identity transformation matrix:
   * [ 1, 0, 0,
   *   0, 1, 0 ]
   * @function
   *
   * @return {AffineTransform}
   */
  export function affineTransformMakeIdentity(): AffineTransform;

  /**
   * Create a new affine transformation with a base transformation matrix and a rotation based on it.
   * @function
   * @param {AffineTransform} xform The base affine transform object
   * @param {number} angle The angle to rotate
   * @return {AffineTransform}
   */
  export function affineTransformRotate(xform: AffineTransform, angle: number): AffineTransform;

  /**
   * Create a new affine transformation with a base transformation matrix and a scale based on it.
   * @function
   * @param {AffineTransform} xform The base affine transform object
   * @param {number} sx The scale on x axis
   * @param {number} sy The scale on y axis
   * @return {AffineTransform}
   */
  export function affineTransformScale(
    xform: AffineTransform,
    sx: number,
    sy: number
  ): AffineTransform;

  /**
   * Create a new affine transformation with a base transformation matrix and a translation based on it.
   * @function
   *
   * @param {AffineTransform} xform The base affine transform object
   * @param {number} tx The translation on x axis
   * @param {number} ty The translation on y axis
   * @return {AffineTransform}
   */
  export function affineTransformTranslate(
    xform: AffineTransform,
    tx: number,
    ty: number
  ): AffineTransform;

  /**
   * Apply the affine transformation on a point.
   * @function
   *
   * @param {Point|number} point
   * @param {AffineTransform|number} xform transform matrix
   * @return {Point}
   */
  export function pointApplyAffineTransform(point: Point, xform: AffineTransform): Point;

  /**
   * Apply the affine transformation on a point.
   * @function
   *
   * @param {Point|number} x
   * @param {AffineTransform|number} y
   * @param {AffineTransform} xform
   * @return {Point}
   */
  export function pointApplyAffineTransform(x: number, y: number, xform: AffineTransform): Point;

  /**
   * Apply the affine transformation on a rect.
   * @function
   *
   * @param {Rect} rect
   * @param {AffineTransform} xform
   * @return {Rect}
   */
  export function rectApplyAffineTransform(rect: Rect, xform: AffineTransform): Rect;

  /**
   * Apply the affine transformation on a size.
   * @function
   *
   * @param {Size} size
   * @param {AffineTransform} xform
   * @return {Size}
   */
  export function sizeApplyAffineTransformfunction(size: Size, xform: AffineTransform): Size;

  //+---------- Class Definitions ----------+//

  /**
   * AffineTransform class represent an affine transform matrix. It's composed basically by translation, rotation, scale transformations.<br/>
   * Please do not use its constructor directly, use affineTransformMake alias function instead.
   *
   * @class AffineTransform
   * @param {number} a
   * @param {number} b
   * @param {number} c
   * @param {number} d
   * @param {number} tx
   * @param {number} ty
   * @see affineTransformMake
   */
  export class AffineTransform {
    constructor(a: number, b: number, c: number, d: number, tx: number, ty: number);
  }

  ////////////////////////////////////////////////////////////////////////////////
  // File: cocos2d/core/cocoa/CCGeometry.js
  ////////////////////////////////////////////////////////////////////////////////

  // Function Definitions
  /**
   * Helper function that creates a Point.
   * @function
   * @param {number|Point} x a number or a point object
   * @param {number} y
   * @return {Point}
   * @example
   * var point1 = p();
   * var point2 = p(100, 100);
   * var point3 = p(point2);
   * var point4 = p({x: 100, y: 100});
   */
  export function p(x: number, y: number): Point;

  /**
   * Check whether a point's value equals to another
   * @function
   * @param {Point} lhs The first Point to compare
   * @param {Point} rhs The second Point to compare
   * @return {Boolean}
   */
  export function pointEqualToPoint(lhs: Point, rhs: Point): boolean;

  /**
   * Helper function that creates a Rect.
   * @function
   * @param {number|Rect} x a number or a rect object
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @returns {Rect}
   * @example
   * var rect1 = rect();
   * var rect2 = rect(100,100,100,100);
   * var rect3 = rect(rect2);
   * var rect4 = rect({x: 100, y: 100, width: 100, height: 100});
   */
  export function rect(x: Rect): Rect;
  export function rect(x: number, y: number, width: number, height: number): Rect;

  /**
   * Check whether a rect contains a point
   * @function
   * @param {Rect} rect The source rect
   * @param {Point} point The point to check
   * @return {Boolean}
   */
  export function rectContainsPoint(rect: Rect, point: Point): boolean;

  /**
   * Check whether the rect1 contains rect2
   * @function
   * @param {Rect} outer The outer rect to compare
   * @param {Rect} inner The inner rect to compare
   * @return {Boolean}
   */
  export function rectContainsRect(outer: Rect, inner: Rect): boolean;

  /**
   * Returns the rightmost x-value of a rect
   * @function
   * @param {Rect} rect The source rect
   * @return {number} The rightmost x value
   */
  export function rectGetMaxX(rect: Rect): boolean;

  /**
   * Return the topmost y-value of a rect
   * @function
   * @param {Rect} rect The source rect
   * @return {number} The topmost y value
   */
  export function rectGetMaxY(rect: Rect): boolean;

  /**
   * Return the midpoint x-value of a rect
   * @function
   * @param {Rect} rect The source rect
   * @return {number} The midpoint x value
   */
  export function rectGetMidX(rect: Rect): boolean;

  /**
   * Return the midpoint y-value of `rect'
   * @function
   * @param {Rect} rect The source rect
   * @return {number} The midpoint y value
   */
  export function rectGetMidY(rect: Rect): boolean;

  /**
   * Returns the leftmost x-value of a rect
   * @function
   * @param {Rect} rect
   * @return {number} The leftmost x value
   */
  export function rectGetMinX(rect: Rect): boolean;

  /**
   * Return the bottommost y-value of a rect
   * @function
   * @param {Rect} rect
   * @return {number} The bottommost y value
   */
  export function rectGetMinY(rect: Rect): boolean;

  /**
   * Check whether a rect's value equals to another
   * @function
   * @param {Rect} lhs First rectangle to compare
   * @param {Rect} rhs Second rectangle to compare
   * @return {Boolean}
   */
  export function rectEqualToRect(lhs: Rect, rhs: Rect): boolean;

  /**
   * Returns the overlapping portion of 2 rectangles
   * @function
   * @param {Rect} lhs The first Rect to intersect
   * @param {Rect} rhs The second Rect to intersect
   * @return {Rect}
   */
  export function rectIntersection(lhs: Rect, rhs: Rect): Rect;

  /**
   * Check whether a rect intersect with another
   * @function
   * @param {Rect} lhs
   * @param {Rect} rhs
   * @return {Boolean}
   */
  export function rectIntersectsRect(lhs: Rect, rhs: Rect): boolean;

  /**
   * Check whether a rect overlaps another
   * @function
   * @param {Rect} lhs The first Rect to compare
   * @param {Rect} rhs The second Rect to compare
   * @return {Boolean}
   */
  export function rectOverlapsRect(lhs: Rect, rhs: Rect): boolean;

  /**
   * Returns the smallest rectangle that contains the two source rectangles.
   * @function
   * @param {Rect} lhs The first Rect to union
   * @param {Rect} rhs The second Rect to union
   * @return {Rect}
   */
  export function rectUnion(lhs: Rect, rhs: Rect): Rect;

  ///**
  // * Check whether all fields of a rect are 0
  // * @function
  // * @param {Rect} rect Rectangle to compare
  // * @return {Boolean}
  // */
  //export function _rectEqualToZero(rect: Rect): boolean;

  /**
   * Helper function that creates a Size.
   * @function
   * @param {number|Size} width width or a size object
   * @param {number} height height
   * @return {Size}
   * @example
   * var size1 = size();
   * var size2 = size(100,100);
   * var size3 = size(size2);
   * var size4 = size({width: 100, height: 100});
   */
  export function size(width: number, height: number): Size;

  /**
   * Check whether a Size's value equals to another
   * @function
   * @param {Size} lhs First size to compare
   * @param {Size} rhs Second size to compare
   * @return {Boolean}
   */
  export function sizeEqualToSize(lhs: Size, rhs: Size): boolean;

  // Class Definitions
  /**
   * Point is the class for point object, please do not use its constructor to create points, use p() alias function instead.
   * @class Point
   * @param {number} x
   * @param {number} y
   * @see p
   */
  export class Point {
    public x: number;
    public y: number;

    constructor(x: number, y: number);
  }

  /**
   * Rect is the class for rect object, please do not use its constructor to create rects, use rect() alias function instead.
   * @class Rect
   * @param {number} width
   * @param {number} height
   * @see rect
   */
  export class Rect {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(x: number, y: number, width: number, height: number);
  }

  /**
   * Size is the class for size object, please do not use its constructor to create sizes, use size() alias function instead.
   * @class Size
   * @param {number} width
   * @param {number} height
   * @see size
   */
  export class Size {
    public width: number;
    public height: number;

    constructor(width: number, height: number);
  }

  ////////////////////////////////////////////////////////////////////////////////
  // File: cocos2d/core/CCActionManager.js
  ////////////////////////////////////////////////////////////////////////////////

  // Class Definitions
  /**
   * ActionManager is a class that can manage actions.<br/>
   * Normally you won't need to use this class directly. 99% of the cases you will use the CCNode interface,
   * which uses this class's singleton object.
   * But there are some cases where you might need to use this class. <br/>
   * Examples:<br/>
   * - When you want to run an action where the target is different from a CCNode.<br/>
   * - When you want to pause / resume the actions<br/>
   * @class
   * @extends Class
   * @example
   * var mgr = new ActionManager();
   */
  export class ActionManager extends Class {
    constructor();

    /** Adds an action with a target.
     * If the target is already present, then the action will be added to the existing target.
     * If the target is not present, a new instance of this target will be created either paused or not,
     * and the action will be added to the newly created target.
     * When the target is paused, the queued actions won't be 'ticked'.
     *
     * @param {Action} action
     * @param {Node} target
     * @param {Boolean} paused
     */
    addAction(action: Action, target: Node, paused: boolean): void;

    /** Gets an action given its tag an a target
     * @param {Number} tag
     * @param {object} target
     * @return {Action|Null}  return the Action with the given tag on success
     *
     * TODO: Restricting the target to Node. Figure out a better way to do this (while avoiding "any")
     *       if non Node objects can have actions.
     */
    getActionByTag(tag: number, target: Node): Action;

    /** Returns the numbers of actions that are running in a certain target. <br/>
     * Composable actions are counted as 1 action. <br/>
     * Example: <br/>
     * - If you are running 1 Sequence of 7 actions, it will return 1. <br/>
     * - If you are running 7 Sequences of 2 actions, it will return 7.
     * @param {object} target
     * @return {Number}
     *
     * TODO: Restricting the target to Node. Figure out a better way to do this (while avoiding "any")
     *       if non Node objects can have actions.
     */
    numberOfRunningActionsInTarget(target: Node): number;

    /**
     * Pauses all running actions, returning a list of targets whose actions were paused.
     * @return {Array}  a list of targets whose actions were paused.
     */
    pauseAllRunningActions(): void;

    /** Pauses the target: all running actions and newly added actions will be paused.
     * @param {object} target
     *
     * TODO: Restricting the target to Node. Figure out a better way to do this (while avoiding "any")
     *       if non Node objects can have actions.
     */
    pauseTarget(target: Node): void;

    /** purges the shared action manager. It releases the retained instance. <br/>
     * because it uses this, so it can not be static
     */
    purgeSharedManager(): void;

    /** Resumes the target. All queued actions will be resumed.
     * @param {object} target
     *
     * TODO: Restricting the target to Node. Figure out a better way to do this (while avoiding "any")
     *       if non Node objects can have actions.
     */
    resumeTarget(target: Node): void;

    /**
     * Resume a set of targets (convenience function to reverse a pauseAllRunningActions call)
     * @param {Array} targetsToResume
     *
     * TODO: Restricting the targets to Node. Figure out a better way to do this (while avoiding "any")
     *       if non Node objects can have actions.
     */
    resumeTargets(targetsToResume: Node[]): void;

    /** Removes an action given an action reference.
     * @param {Action} action The action to be removed.
     */
    removeAction(action: Action): void;

    /** Removes an action given its tag and the target
     * @param {Number} tag
     * @param {object} target
     *
     * TODO: Restricting the target to Node. Figure out a better way to do this (while avoiding "any")
     *       if non Node objects can have actions.
     */
    removeActionByTag(tag: number, target: Node): void;

    /**
     * Removes all actions from all the targets.
     */
    removeAllActions(): void;

    /** Removes all actions from a certain target. <br/>
     * All the actions that belongs to the target will be removed.
     * @param {object} target
     * @param {boolean} forceDelete
     *
     * TODO: I believe that actions can be run on objects other than Node. How should this be handled?
     *       Is there some type of interface I can use so that this method doesn't have to take "any"?
     *       For now, I'm restricting this to only allowing Node.
     */
    removeAllActionsFromTarget(target: Node, forceDelete: boolean): void;

    /**
     * @param {Number} dt delta time in seconds
     */
    update(dt: number): void;
  }

  /**
   * @class
   * @extends Class
   * @example
   * var element = new HashElement();
   */
  export class HashElement extends Class {}

  ////////////////////////////////////////////////////////////////////////////////
  // File: cocos2d/core/CCDirector.js
  ////////////////////////////////////////////////////////////////////////////////

  // Variable Definitions
  var g_NumberOfDraws: number;
  var defaultFPS: number;

  // Function Definitions
  /**
   * TODO: Fill in this description later
   *
   * @function
   * @param {AffineTransform} xform The transformation matrix.
   */
  export function GLToClipTransform(xform: AffineTransform): void;

  /**
   * OpenGL projection protocol
   * @class
   * @extends Class
   */
  export interface DirectorDelegate {
    /**
     * Called by CCDirector when the projection is updated, and "custom" projection is used
     */
    updateProjection(): void;
  }

  // Class Definitions
  /**
   * <p>
   *    ATTENTION: USE director INSTEAD OF Director.<br/>
   *    director is a singleton object which manage your game's logic flow.<br/>
   *    Since the director is a singleton, you don't need to call any constructor or create functions,<br/>
   *    the standard way to use it is by calling:<br/>
   *      - director.methodName(); <br/>
   *
   *    It creates and handle the main Window and manages how and when to execute the Scenes.<br/>
   *    <br/>
   *    The director is also responsible for:<br/>
   *      - initializing the OpenGL context<br/>
   *      - setting the OpenGL pixel format (default on is RGB565)<br/>
   *      - setting the OpenGL pixel format (default on is RGB565)<br/>
   *      - setting the OpenGL buffer depth (default one is 0-bit)<br/>
   - setting the color for clear screen (default one is BLACK)<br/>
   *      - setting the projection (default one is 3D)<br/>
   *      - setting the orientation (default one is Portrait)<br/>
   *      <br/>
   *    <br/>
   *    The director also sets the default OpenGL context:<br/>
   *      - GL_TEXTURE_2D is enabled<br/>
   *      - GL_VERTEX_ARRAY is enabled<br/>
   *      - GL_COLOR_ARRAY is enabled<br/>
   *      - GL_TEXTURE_COORD_ARRAY is enabled<br/>
   * </p>
   * <p>
   *   director also synchronizes timers with the refresh rate of the display.<br/>
   *   Features and Limitations:<br/>
   *      - Scheduled timers & drawing are synchronizes with the refresh rate of the display<br/>
   *      - Only supports animation intervals of 1/60 1/30 & 1/15<br/>
   * </p>
   * @class
   * @name Director
   */
  export class Director extends Class {
    /**
     * The event after draw of Director
     * @constant
     * @type {string}
     * @example
     *   eventManager.addCustomListener(Director.EVENT_AFTER_DRAW, function(event) {
     *           log("after draw event.");
     *       });
     */
    public static EVENT_AFTER_DRAW: string;

    /**
     * The event after update of Director
     * @constant
     * @type {string}
     * @example
     *   eventManager.addCustomListener(Director.EVENT_AFTER_UPDATE, function(event) {
     *           log("after update event.");
     *       });
     */
    public static EVENT_AFTER_UPDATE: string;

    /**
     * The event after visit of Director
     * @constant
     * @type {string}
     * @example
     *   eventManager.addCustomListener(Director.EVENT_AFTER_VISIT, function(event) {
     *           log("after visit event.");
     *       });
     */
    public static EVENT_AFTER_VISIT: string;

    /**
     * The event projection changed of Director
     * @constant
     * @type {string}
     * @example
     *   eventManager.addCustomListener(Director.EVENT_PROJECTION_CHANGED, function(event) {
     *           log("Projection changed.");
     *       });
     */
    public static EVENT_PROJECTION_CHANGED: string;

    //Possible OpenGL projections used by director
    /**
     * Constant for 2D projection (orthogonal projection)
     * @constant
     * @type {Number}
     */
    public static PROJECTION_2D: number;

    /**
     * Constant for 3D projection with a fovy=60, znear=0.5f and zfar=1500.
     * @constant
     * @type {Number}
     */
    public static PROJECTION_3D: number;

    /**
     * Constant for custom projection, if Director's projection set to it, it calls "updateProjection" on the projection delegate.
     * @constant
     * @type {Number}
     */
    public static PROJECTION_CUSTOM: number;

    /**
     * Constant for default projection of Director, default projection is 3D projection
     * @constant
     * @type {Number}
     */
    public static PROJECTION_DEFAULT: number;

    public sharedDirector: Director;
    public firstUseDirector: boolean;

    //pubic static _getInstance = function () {

    constructor();

    init(): boolean;

    /**
     * calculates delta time since last time it was called
     */
    calculateDeltaTime(): number;

    /**
     * Converts a view coordinate to an WebGL coordinate<br/>
     * Useful to convert (multi) touches coordinates to the current layout (portrait or landscape)<br/>
     * Implementation can be found in CCDirectorWebGL
     * @function
     * @param {Point} uiPoint
     * @return {Point}
     */
    convertToGL(uiPoint: Point): Point;

    /**
     * Converts an WebGL coordinate to a view coordinate<br/>
     * Useful to convert node points to window points for calls such as glScissor<br/>
     * Implementation can be found in CCDirectorWebGL
     * @function
     * @param {Point} glPoint
     * @return {Point}
     */
    convertToUI(glPoint: Point): Point;

    /**
     *  Draw the scene. This method is called every frame. Don't call it manually.
     */
    drawScene(): void;

    /**
     * End the life of director in the next frame
     */
    end(): void;

    /**
     * Returns the ActionManager associated with this director
     * @return {ActionManager}
     */
    getActionManager(): ActionManager;

    /**
     * Returns the FPS value
     * @return {Number}
     */
    getAnimationInterval(): number;

    /**
     * Returns the size in pixels of the surface. It could be different than the screen size.<br/>
     * High-res devices might have a higher surface size than the screen size.
     * @return {Number}
     */
    getContentScaleFactor(): number;

    /**
     * Returns the director delegate.
     * @return {DirectorDelegate}
     */
    getDelegate(): DirectorDelegate;

    /**
     * Returns the delta time since last frame
     * @return {Number}
     */
    getDeltaTime(): number;

    /**
     * This object will be visited after the main scene is visited.<br/>
     * This object MUST implement the "visit" selector.<br/>
     * Useful to hook a notification object
     * @return {Node}
     */
    getNotificationNode(): Node;

    /**
     * Get the CCEGLView, where everything is rendered.<br/>
     * Implementation can be found in CCDirectorCanvas.js/CCDirectorWebGL.js.
     * @function
     * @return {view}
     */
    getOpenGLView(): View;

    /**
     * Sets an OpenGL projection.<br/>
     * Implementation can be found in CCDirectorCanvas.js/CCDirectorWebGL.js.
     * @function
     * @return {Number}
     */
    getProjection(): number;

    /**
     * Returns current running Scene. Director can only run one Scene at the time
     * @return {Scene}
     */
    getRunningScene(): Scene;

    /**
     * Returns the Scheduler associated with this director
     * @return {Scheduler}
     */
    getScheduler(): Scheduler;

    /**
     * Returns seconds per frame
     * @return {Number}
     */
    getSecondsPerFrame(): number;

    /**
     * Returns how many frames were called since the director started
     * @return {Number}
     */
    getTotalFrames(): number;

    /**
     * Returns the size of the WebGL view in points.<br/>
     * It takes into account any possible rotation (device orientation) of the window
     * @return {Size}
     */
    getWinSize(): Size;

    /**
     * Returns the size of the OpenGL view in pixels.<br/>
     * It takes into account any possible rotation (device orientation) of the window.<br/>
     * On Mac winSize and winSizeInPixels return the same value.
     * @return {Size}
     */
    getWinSizeInPixels(): Size;

    /**
     * Returns the visible size of the running scene
     * @function
     * @return {Size}
     */
    getVisibleSize(): Size;

    /**
     * Returns the visible origin of the running scene
     * @function
     * @return {Point}
     */
    getVisibleOrigin(): Point;

    /**
     * Returns the z eye, only available in WebGL mode
     * @function
     * @return {Number}
     */
    getZEye(): number;

    /**
     * Returns whether or not to display the FPS informations
     * @return {Boolean}
     */
    isDisplayStats(): boolean;

    /**
     * Returns whether next delta time equals to zero
     * @return {Boolean}
     */
    isNextDeltaTimeZero(): boolean;

    /**
     * Returns whether or not the Director is paused
     * @return {Boolean}
     */
    isPaused(): boolean;

    /**
     * Returns whether or not the replaced scene will receive the cleanup message.<br>
     * If the new scene is pushed, then the old scene won't receive the "cleanup" message.<br/>
     * If the new scene replaces the old one, the it will receive the "cleanup" message.
     * @return {Boolean}
     */
    isSendCleanupToScene(): boolean;

    /**
     * Pause the director's ticker
     */
    pause(): void;

    /**
     * Pops out a scene from the queue.<br/>
     * This scene will replace the running one.<br/>
     * The running scene will be deleted. If there are no more scenes in the stack the execution is terminated.<br/>
     * ONLY call it if there is a running scene.
     * @function
     */
    popScene(): void;

    /**
     * Pops out all scenes from the queue until it reaches "level".                             <br/>
     * If level is 0, it will end the director.                                                 <br/>
     * If level is 1, it will pop all scenes until it reaches to root scene.                    <br/>
     * If level is <= than the current stack level, it won't do anything.
     * @param {Number} level
     */
    popToSceneStackLevel(level: number): void;

    /**
     * Pops out all scenes from the queue until the root scene in the queue. <br/>
     * This scene will replace the running one.  <br/>
     * Internally it will call "popToSceneStackLevel(1)"
     */
    popToRootScene(): void;

    /**
     * Removes cached all cocos2d cached data. It will purge the textureCache, spriteFrameCache, animationCache
     */
    purgeCachedData(): void;

    /**
     * Purge the director itself, including unschedule all schedule, remove all event listeners, clean up and exit the running scene, stops all animations, clear cached data.
     */
    purgeDirector(): void;

    /**
     * Suspends the execution of the running scene, pushing it on the stack of suspended scenes.<br/>
     * The new scene will be executed.<br/>
     * Try to avoid big stacks of pushed scenes to reduce memory allocation.<br/>
     * ONLY call it if there is a running scene.
     * @param {Scene} scene
     */
    pushScene(scene: Scene): void;

    /**
     * Resume director after pause, if the current scene is not paused, nothing will happen.
     */
    resume(): void;

    /**
     * Run a scene. Replaces the running scene with a new one or enter the first scene.
     * @param {Scene} scene
     */
    runScene(scene: Scene): void;

    /**
     * Sets the ActionManager associated with this director
     * @param {ActionManager} actionManager
     */
    setActionManager(actionManager: ActionManager): void;

    /**
     * Enables/disables OpenGL alpha blending.<br/>
     * Implementation can be found in CCDirectorCanvas.js/CCDirectorWebGL.js.
     * @function
     * @param {Boolean} on
     */
    setAlphaBlending(newValue: boolean): void;

    /**
     * set color for clear screen.<br/>
     * Implementation can be found in CCDirectorCanvas.js/CCDirectorWebGL.js
     * @function
     * @param {color} newValue
     */
    setClearColor(newValue: Color): void;

    /**
     * The size in pixels of the surface. It could be different than the screen size.<br/>
     * High-res devices might have a higher surface size than the screen size.
     * @param {Number} newValue
     */
    setContentScaleFactor(newValue: number): void;

    /**
     * Sets the director delegate. It shall implement the CCDirectorDelegate protocol
     * @return {DirectorDelegate}
     */
    setDelegate(delegate: DirectorDelegate): void;

    /**
     * Sets the default values based on the CCConfiguration info
     */
    setDefaultValues(): void;

    /**
     * Enables or disables WebGL depth test.<br/>
     * Implementation can be found in CCDirectorCanvas.js/CCDirectorWebGL.js
     * @function
     * @param {Boolean} newValue
     */
    setDepthTest(newValue: boolean): void;

    /**
     * Sets whether display the FPS on the bottom-left corner
     * @param {Boolean} displayStats
     */
    setDisplayStats(newValue: boolean): void;

    /**
     * Sets whether next delta time equals to zero
     * @param {Boolean} newValue
     */
    setNextDeltaTimeZero(newValue: boolean): void;

    /**
     * Starts the registered next scene
     */
    setNextScene(): void;

    /**
     * Sets Notification Node
     * @param {Node} node
     */
    setNotificationNode(node: Node): void;

    /**
     * Sets the view, where everything is rendered, do not call this function.<br/>
     * Implementation can be found in CCDirectorCanvas.js/CCDirectorWebGL.js.
     * @function
     * @param {view} openGLView
     */
    setOpenGLView(newValue: View): void;

    /**
     * Sets an OpenGL projection.<br/>
     * Implementation can be found in CCDirectorCanvas.js/CCDirectorWebGL.js.
     * @function
     * @param {Number} projection
     */
    setProjection(newValue: number): void;

    /**
     * Sets the Scheduler associated with this director
     * @param {Scheduler} scheduler
     */
    setScheduler(scheduler: Scheduler): void;

    /**
     * Update the view port.<br/>
     * Implementation can be found in CCDirectorCanvas.js/CCDirectorWebGL.js.
     * @function
     */
    setViewport(): void;
  }

  /***************************************************
   * implementation of DisplayLinkDirector
   **************************************************/
  //DisplayLinkDirector = Director.extend(/** @lends Director# */{
  export class DisplayLinkDirector extends Director {
    /**
     * Run main loop of director
     */
    mainLoop(): void;

    /**
     * Sets animation interval
     * @param {Number} value the animation interval desired
     */
    setAnimationInterval(value: number): void;

    /**
     * Starts Animation
     */
    startAnimation(): void;

    /**
     * Stops animation
     */
    stopAnimation(): void;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // File: cocos2d/core/CCDirector.js
  ////////////////////////////////////////////////////////////////////////////////

  // Variable Definitions
  var PRIORITY_NON_SYSTEM: number;

  // Function Definitions

  /**
   * Helper function to create a HashTimerEntry;
   * @Class
   * @param {Array} timers
   * @param {Class} target  hash key (retained)
   * @param {Number} timerIndex
   * @param {Timer} currentTimer
   * @param {Boolean} currentTimerSalvaged
   * @param {Boolean} paused
   * @param {Array} hh
   * @see HashTimerEntry;
   */
  export function hashSelectorEntry(
    timers: any[],
    target: Class,
    timerIndex: number,
    currentTimer: Timer,
    currentTimerSalvaged: boolean,
    paused: boolean,
    hh: any[]
  ): HashTimerEntry;

  // Class Definitions

  /**
   * Hash Element used for "selectors with interval"
   * @Class
   * @param {Array} timers
   * @param {Class} target  hash key (retained)
   * @param {Number} timerIndex
   * @param {Timer} currentTimer
   * @param {Boolean} currentTimerSalvaged
   * @param {Boolean} paused
   * @param {Array} hh
   */
  export class HashTimerEntry {
    constructor(
      timers: any[],
      target: Class,
      timerIndex: number,
      currentTimer: Timer,
      currentTimerSalvaged: boolean,
      paused: boolean,
      hh: any[]
    );
  }

  /**
   * A update entry list
   * @Class
   * @name HashUpdateEntry
   * @param {Array} list Which list does it belong to ?
   * @param {ListEntry} entry entry in the list
   * @param {Class} target hash key (retained)
   * @param {function} callback
   * @param {Array} hh
   *
   * TODO: What kind of arrays for the list and hh params, can we specify a type here?
   */
  export class HashUpdateEntry {
    constructor(
      list: any[],
      entry: ListEntry,
      target: Class,
      callback: (arg?: any) => void,
      hh: any[]
    );
  }

  /**
   * A list double-linked list used for "updates with priority"
   * @Class
   * @name ListEntry
   * @param {ListEntry} prev
   * @param {ListEntry} next
   * @param {function} callback
   * @param {Class} target not retained (retained by hashUpdateEntry)
   * @param {Number} priority
   * @param {Boolean} paused
   * @param {Boolean} markedForDeletion selector will no longer be called and entry will be removed at end of the next tick
   *
   * TODO: What's the signature for the callback param, can we specify a type here?
   */
  export class ListEntry {
    constructor(
      prev: ListEntry,
      next: ListEntry,
      callback: (arg?: any) => void,
      target: Class,
      priority: number,
      paused: boolean,
      markedForDeletion: boolean
    );
  }

  /**
   * <p>
   *    Scheduler is responsible of triggering the scheduled callbacks.<br/>
   *    You should not use NSTimer. Instead use this class.<br/>
   *    <br/>
   *    There are 2 different types of callbacks (selectors):<br/>
   *       - update callback: the 'update' callback will be called every frame. You can customize the priority.<br/>
   *       - custom callback: A custom callback will be called every frame, or with a custom interval of time<br/>
   *       <br/>
   *    The 'custom selectors' should be avoided when possible. It is faster, and consumes less memory to use the 'update callback'. *
   * </p>
   * @class
   * @extends Class
   *
   * @example
   * //register a schedule to scheduler
   * director.getScheduler().schedule(callback, this, interval, !this._isRunning);
   */
  export class Scheduler extends Class {
    /**
     * Priority level reserved for system services.
     * @constant
     * @type Number
     */
    public static PRIORITY_SYSTEM: number;

    constructor();

    /**
     * Returns time scale of scheduler
     * @return {Number}
     */
    getTimeScale(): number;

    /**
     * TODO: Put an explanation here for this method's purpose/functionality.
     *       Also, again we have a key parameter, and WTF is the proper type?!?
     * @param {any} key ???
     * @param {Class} target
     */
    isScheduled(key: any, target: Class): void;

    /**
     * Returns whether or not the target is paused
     * @param {Class} target
     * @return {Boolean}
     */
    isTargetPaused(target: Class): boolean;

    /**
     * <p>
     *  Pause all selectors from all targets.<br/>
     *  You should NEVER call this method, unless you know what you are doing.
     * </p>
     */
    pauseAllTargets(): void;

    /**
     * Pause all selectors from all targets with a minimum priority. <br/>
     * You should only call this with kCCPriorityNonSystemMin or higher.
     * @param {Number} minPriority
     */
    pauseAllTargetsWithMinPriority(minPriority: number): void;

    /**
     * <p>
     *    Pauses the target.<br/>
     *    All scheduled selectors/update for a given target won't be 'ticked' until the target is resumed.<br/>
     *    If the target is not present, nothing happens.
     * </p>
     * @param {Class} target
     */
    pauseTarget(target: Class): void;

    /**
     * Resumes the target.<br/>
     * The 'target' will be unpaused, so all schedule selectors/update will be 'ticked' again.<br/>
     * If the target is not present, nothing happens.
     * @param {Class} target
     */
    resumeTarget(target: Class): void;

    /**
     * Resume selectors on a set of targets.<br/>
     * This can be useful for undoing a call to pauseAllCallbacks.
     * @param {Array} targetsToResume
     */
    resumeTargets(targetsToResume: Class[]): void;

    /**
     * TODO: Put an explanation here for this method's purpose/functionality.
     *       Also, again we have a key parameter, and WTF is the proper type?!?
     *
     * @param {Class} target
     * @param {function} callback
     * @param {Number} interval
     * @param {Number} repeat
     * @param {Number} delay
     * @param {Boolean} paused
     * @param {any} key
     * @example
     */
    schedule(
      callback: (arg?: any) => void,
      target: Class,
      interval: number,
      repeat: number,
      delay: number,
      paused: boolean,
      key: any
    ): void;

    /**
     * <p>
     *   The scheduled method will be called every 'interval' seconds.</br>
     *   If paused is YES, then it won't be called until it is resumed.<br/>
     *   If 'interval' is 0, it will be called every frame, but if so, it recommended to use 'scheduleUpdateForTarget:' instead.<br/>
     *   If the callback function is already scheduled, then only the interval parameter will be updated without re-scheduling it again.<br/>
     *   repeat let the action be repeated repeat + 1 times, use REPEAT_FOREVER to let the action run continuously<br/>
     *   delay is the amount of time the action will wait before it'll start<br/>
     * </p>
     * @deprecated since v3.4 please use .schedule
     * @param {Class} target
     * @param {function} callback_fn
     * @param {Number} interval
     * @param {Number} repeat
     * @param {Number} delay
     * @param {Boolean} paused
     * @example
     * //register a schedule to scheduler
     * director.getScheduler().scheduleCallbackForTarget(this, function, interval, repeat, delay, !this._isRunning );
     */
    scheduleCallbackForTarget(
      target: Class,
      callback_fn: (arg?: any) => void,
      interval: number,
      repeat: number,
      delay: number,
      paused: boolean
    ): void;

    /**
     * TODO: Put an explanation here for this method's purpose/functionality.
     *       Also, again we have a key parameter, and WTF is the proper type?!?
     *
     * @param {Class} target
     * @param {Number} priority
     * @param {Boolean} paused
     * @example
     */
    scheduleUpdate(target: Class, priority: number, paused: boolean): void;

    /**
     * <p>
     *    Schedules the 'update' callback_fn for a given target with a given priority.<br/>
     *    The 'update' callback_fn will be called every frame.<br/>
     *    The lower the priority, the earlier it is called.
     * </p>
     * @deprecated since v3.4 please use .scheduleUpdate
     * @param {Class} target
     * @param {Number} priority
     * @param {Boolean} paused
     * @example
     * //register this object to scheduler
     * director.getScheduler().scheduleUpdateForTarget(this, priority, !this._isRunning );
     */
    scheduleUpdateForTarget(target: Class, priority: number, paused: boolean): void;

    /**
     * <p>
     *    Modifies the time of all scheduled callbacks.<br/>
     *    You can use this property to create a 'slow motion' or 'fast forward' effect.<br/>
     *    Default is 1.0. To create a 'slow motion' effect, use values below 1.0.<br/>
     *    To create a 'fast forward' effect, use values higher than 1.0.<br/>
     *    @warning It will affect EVERY scheduled selector / action.
     * </p>
     * @param {Number} timeScale
     */
    setTimeScale(timeScale: number): void;

    /**
     * TODO: Put an explanation here for this method's purpose/functionality.
     *       Also, again we have a key parameter, and WTF is the proper type?!?
     * @param {any} key ???
     * @param {Class} target
     */
    unschedule(key: any, target: Class): void;

    /**
     * TODO: Put an explanation here for this method's purpose/functionality.
     */
    unscheduleAll(): void;

    /**
     *  <p>
     *      Unschedules all function callbacks from all targets. <br/>
     *      You should NEVER call this method, unless you know what you are doing.
     *  </p>
     * @deprecated since v3.4 please use .unscheduleAllWithMinPriority
     */
    unscheduleAllCallbacks(): void;

    /**
     * Unschedules all function callbacks for a given target. This also includes the "update" callback function.
     * @deprecated since v3.4 please use .unscheduleAll
     * @param {Class} target
     */
    unscheduleAllCallbacksForTarget(target: Class): void;

    /**
     * <p>
     *    Unschedules all function callbacks from all targets with a minimum priority.<br/>
     *    You should only call this with kCCPriorityNonSystemMin or higher.
     * </p>
     * @deprecated since v3.4 please use .unscheduleAllWithMinPriority
     * @param {Number} minPriority
     */
    unscheduleAllCallbacksWithMinPriority(minPriority: number): void;

    /**
     * TODO: Put an explanation here for this method's purpose/functionality.
     * @param {Class} target
     */
    unscheduleAllForTarget(target: Class): void;

    /**
     * TODO: Put an explanation here for this method's purpose/functionality.
     * @param {Number} minPriority ???
     */
    unscheduleAllWithMinPriority(minPriority: number): void;

    /**
     * <p>
     *   Unschedule a callback function for a given target.<br/>
     *   If you want to unschedule the "update", use unscheudleUpdateForTarget.
     * </p>
     * @deprecated since v3.4 please use .unschedule
     * @param {Class} target
     * @param {function} callback callback[Function] or key[String]
     * @example
     * //unschedule a callback of target
     * director.getScheduler().unscheduleCallbackForTarget(function, this);
     */
    unscheduleCallbackForTarget(target: Class, callback: (arg?: any) => void): void;

    /**
     * TODO: Put an explanation here for this method's purpose/functionality.
     * @param {Class} target
     */
    unscheduleUpdate(target: Class): void;

    /**
     * Unschedules the update callback function for a given target
     * @param {Class} target
     * @deprecated since v3.4 please use .unschedule
     * @example
     * //unschedules the "update" method.
     * director.getScheduler().unscheduleUpdateForTarget(this);
     */
    unscheduleUpdateForTarget(target: Class): void;

    /**
     * 'update' the scheduler. (You should NEVER call this method, unless you know what you are doing.)
     * @param {Number} dt delta time
     */
    update(dt: number): void;
  }

  /**
   * Light weight timer
   * @class
   * @extends Class
   */
  export class Timer extends Class {
    constructor();

    /**
     * TODO: Comment this with an explanation of this method's purpose / functionality
     * TODO: In the implementation (CCScheduler.js), this returns a number (0).
     *       I see no use for this anywhere, as all concrete implementations return nothing.
     *       So I'm making this, as well as all overridden methods, return void.
     */
    cancel(): void;

    /**
     * TODO: Comment this with an explanation of this method's purpose / functionality
     *
     * @return {Number} returns interval of timer
     */
    getInterval(): number;

    /**
     * TODO: Comment this with an explanation of this method's purpose / functionality
     *
     * @param {Number} interval set interval in seconds
     */
    setInterval(interval: number): void;

    /**
     * TODO: Comment this with an explanation of this method's purpose / functionality
     *
     * @param {Number} seconds ???
     * @param {Number} repeat ???
     * @param {Number} delay ???
     */
    setupTimerWithInterval(seconds: number, repeat: boolean, delay: number): void;

    /**
     * TODO: Comment this with an explanation of this method's purpose / functionality
     *
     * TODO: In the implementation (CCScheduler.js), this returns a number (0).
     *       I see no use for this anywhere, as all concrete implementations return nothing.
     *       So I'm making this, as well as all overridden methods, return void.
     */
    trigger(): void;

    /**
     * triggers the timer
     * @param {Number} dt delta time
     */
    update(dt: number): void;
  }

  /**
   * TODO: Comment this with an explanation of this class' purpose / functionality
   *
   * @class TimerTargetCallback
   */
  //TimerTargetCallback = Timer.extend({
  export class TimerTargetCallback extends Timer {
    constructor();

    /**
     * TODO: Comment this with an explanation of this method's purpose / functionality
     * WTF is "key" used for, and WTF kind of type is it?!?
     *
     * @param {Scheduler} scheduler ???
     * @param {Function} callback ???
     * @param {Class} target ???
     * @param {any} key ???
     * @param {Number} seconds ???
     * @param {Boolean} repeat ???
     * @param {Number} delay ???
     * @return {boolean} ???
     */
    initWithCallback(
      scheduler: Scheduler,
      callback: (arg?: any) => void,
      target: Class,
      key: any,
      seconds: number,
      repeat: boolean,
      delay: number
    ): boolean;

    getCallback(): (arg?: any) => void;

    getKey(): any;

    trigger(): void;

    cancel(): void;
  }

  /**
   * TODO: Comment this with an explanation of this class' purpose / functionality
   *
   * @class TimerTargetSelector
   */
  export class TimerTargetSelector extends Timer {
    constructor();

    /**
     * TODO: Comment this with an explanation of this method's purpose / functionality
     *
     */
    cancel(): void;

    /**
     * TODO: Comment this with an explanation of this method's purpose / functionality
     *
     * @return {Function} ???
     */
    getSelector(): (arg?: any) => void;

    /**
     * TODO: Comment this with an explanation of this method's purpose / functionality
     *
     * @param {Scheduler} scheduler ???
     * @param {Function} selector ???
     * @param {Class} target ???
     * @param {Number} seconds ???
     * @param {Boolean} repeat ???
     * @param {Number} delay ???
     * @return {boolean} ???
     */
    initWithSelector(
      scheduler: Scheduler,
      selector: (arg?: any) => void,
      target: Class,
      seconds: number,
      repeat: boolean,
      delay: number
    ): boolean;

    /**
     * TODO: Comment this with an explanation of this method's purpose / functionality
     *
     */
    trigger(): void;
  }

  // Module definitions
  export namespace Node {
    //+-------------------- Function Definitions --------------------+//
    ///!**
    // * Allocates and initializes a node.
    // * @deprecated since v3.0, please use new construction instead.
    // * @see Node
    // * @return {Node}
    // *!/
    //export function create():Node;

    // Class Definitions
    export class RenderCmd {}
  }

  ////////////////////////////////////////////////////////////////////////////////
  // event-manager
  ////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////
  // File: cocos2d/core/event-manager/CCEvent.js
  ////////////////////////////////////////////////////////////////////////////////
  /**
   * Base class of all kinds of events.
   * @class
   * @extends Class
   */
  export class Event extends Class {
    /**
     * The type code of Touch event.
     * @constant
     * @type {number}
     */
    public static TOUCH: number;

    /**
     * The type code of Keyboard event.
     * @constant
     * @type {number}
     */
    public static KEYBOARD: number;

    /**
     * The type code of Acceleration event.
     * @constant
     * @type {number}
     */
    public static ACCELERATION: number;

    /**
     * The type code of Mouse event.
     * @constant
     * @type {number}
     */
    public static MOUSE: number;

    /**
     * The type code of UI focus event.
     * @constant
     * @type {number}
     */
    public static FOCUS: number;

    /**
     * The type code of Custom event.
     * @constant
     * @type {number}
     */
    public static CUSTOM: number;

    public constructor(type: number);

    /**
     * Gets the event type
     * @function
     * @returns {Number}
     */
    public getType(): number;

    /**
     * Stops propagation for current event
     * @function
     */
    public stopPropagation(): void;

    /**
     * Checks whether the event has been stopped
     * @function
     * @returns {boolean}
     */
    public isStopped(): boolean;

    /**
     *
     *     Gets current target of the event
     *     note: It only be available when the event listener is associated with node.
     *          It returns 0 when the listener is associated with fixed priority.
     *
     * @function
     * @returns {Node}  The target with which the event associates.
     */
    public getCurrentTarget(): Node;
  }

  /**
   * The Custom event
   * @class
   * @extends Event
   */
  //EventCustom = Event.extend(/** @lends EventCustom# */{
  export class EventCustom extends Event {
    public constructor(eventName: string);

    /**
     * Sets user data
     * @param {*} data
     */
    public setUserData(data: any): void;

    /**
     * Gets user data
     * @returns {*}
     */
    public getUserData(): any;

    /**
     * Gets event name
     * @returns {String}
     */
    public getEventName(): string;
  }

  /**
   * The mouse event
   * @class
   * @extends Event
   */
  export class EventMouse extends Event {
    /**
     * The none event code of  mouse event.
     * @constant
     * @type {number}
     */
    public static NONE: number;
    /**
     * The event type code of mouse down event.
     * @constant
     * @type {number}
     */
    public static DOWN: number;
    /**
     * The event type code of mouse up event.
     * @constant
     * @type {number}
     */
    public static UP: number;
    /**
     * The event type code of mouse move event.
     * @constant
     * @type {number}
     */
    public static MOVE: number;
    /**
     * The event type code of mouse scroll event.
     * @constant
     * @type {number}
     */
    public static SCROLL: number;

    /**
     * The tag of Mouse left button
     * @constant
     * @type {Number}
     */
    public static BUTTON_LEFT: number;

    /**
     * The tag of Mouse right button  (The right button number is 2 on browser)
     * @constant
     * @type {Number}
     */
    public static BUTTON_RIGHT: number;

    /**
     * The tag of Mouse middle button  (The right button number is 1 on browser)
     * @constant
     * @type {Number}
     */
    public static BUTTON_MIDDLE: number;

    /**
     * The tag of Mouse button 4
     * @constant
     * @type {Number}
     */
    public static BUTTON_4: number;

    /**
     * The tag of Mouse button 5
     * @constant
     * @type {Number}
     */
    public static BUTTON_5: number;

    /**
     * The tag of Mouse button 6
     * @constant
     * @type {Number}
     */
    public static BUTTON_6: number;

    /**
     * The tag of Mouse button 7
     * @constant
     * @type {Number}
     */
    public static BUTTON_7: number;

    /**
     * The tag of Mouse button 8
     * @constant
     * @type {Number}
     */
    public static BUTTON_8: number;

    public constructor(eventType: number);

    /**
     * Sets scroll data
     * @param {number} scrollX
     * @param {number} scrollY
     */
    public setScrollData(scrollX: number, scrollY: number): void;

    /**
     * Returns the x axis scroll value
     * @returns {number}
     */
    public getScrollX(): number;

    /**
     * Returns the y axis scroll value
     * @returns {number}
     */
    public getScrollY(): number;

    /**
     * Sets cursor location
     * @param {number} x
     * @param {number} y
     */
    public setLocation(x: number, y: number): void;

    /**
     * Returns cursor location
     * @return {Point} location
     */
    public getLocation(): Point;

    /**
     * Returns the current cursor location in screen coordinates
     * @return {Point}
     */
    public getLocationInView(): Point;

    /**
     * Returns the delta distance from the previous location to current location
     * @return {Point}
     */
    public getDelta(): Point;

    /**
     * Returns the X axis delta distance from the previous location to current location
     * @return {Number}
     */
    public getDeltaX(): number;

    /**
     * Returns the Y axis delta distance from the previous location to current location
     * @return {Number}
     */
    public getDeltaY(): number;

    /**
     * Sets mouse button
     * @param {number} button
     */
    public setButton(button: number): void;

    /**
     * Returns mouse button
     * @returns {number}
     */
    public getButton(): number;

    /**
     * Returns location X axis data
     * @returns {number}
     */
    public getLocationX(): number;

    /**
     * Returns location Y axis data
     * @returns {number}
     */
    public getLocationY(): number;
  }

  /**
   * The touch event
   * @class
   * @extends Event
   */
  //EventTouch = Event.extend(/** @lends EventTouch# */{
  //enum EventCode {
  //    BEGAN = 0,
  //    MOVED = 1,
  //    ENDED = 2,
  //    CANCELLED = 3
  //}
  export interface EventCodeMap {
    BEGAN: number;
    MOVED: number;
    ENDED: number;
    CANCELLED: number;
  }

  export class EventTouch extends Event {
    /**
     * The maximum touch numbers
     * @constant
     * @type {Number}
     */
    public static MAX_TOUCHES: number;

    public static EventCode: EventCodeMap;

    public constructor(arr: Touch[]);

    /**
     * Returns event code
     * @returns {number}
     */
    public getEventCode(): number;

    /**
     * Returns touches of event
     * @returns {Array}
     */
    public getTouches(): Touch[];
  }

  // TODO: Uncomment this class when ccui.Widget is defined.
  ///**
  // * Focus change event for UI widget
  // * @class
  // * @extends Event
  // */
  //export class EventFocus extends Event {
  //    /**
  //     * Constructor function.
  //     * @param {ccui.Widget} widgetLoseFocus
  //     * @param {ccui.Widget} widgetGetFocus
  //     */
  //    public constructor(widgetLoseFocus:ccui.Widget, widgetGetFocus:ccui.Widget);
  //}

  ////////////////////////////////////////////////////////////////////////////////
  // File: cocos2d/core/event-manager/CCEventExtension.js
  ////////////////////////////////////////////////////////////////////////////////
  /**
   * The acceleration event
   * @class
   * @extends Event
   */
  //EventAcceleration = Event.extend(/** @lends EventAcceleration# */{
  export class EventAcceleration extends Event {
    public constructor(acc: number);
  }

  /**
   * The keyboard event
   * @class
   * @extends Event
   */
  //EventKeyboard = Event.extend(/** @lends EventKeyboard# */{
  export class EventKeyboard extends Event {
    public constructor(keyCode: number, isPressed: boolean);
  }

  ////////////////////////////////////////////////////////////////////////////////
  // File: cocos2d/core/event-manager/CCEventHelper.js
  ////////////////////////////////////////////////////////////////////////////////
  // The event helper
  export class EventHelper extends Class {
    public apply(object: any): void;

    //public addEventListener(type:string, listener:EventListener, target:Node):void;
    public addEventListener(type: string, listener: EventListener, target: Node): void;

    public hasEventListener(type: string, listener: EventListener, target: Node): boolean;

    //    if ( this._listeners === undefined )
    //        return false;
    //
    //    var listeners = this._listeners;
    //    if ( listeners[ type ] !== undefined ) {
    //        for(var i = 0, len = listeners.length; i < len ; i++){
    //            var selListener = listeners[i];
    //            if(selListener.callback === listener && selListener.eventTarget === target)
    //                return true;
    //        }
    //    }
    //    return false;
    //},

    public removeEventListener(type: string, target: Node): void;

    //    if ( this._listeners === undefined )
    //        return;
    //
    //    var listeners = this._listeners;
    //    var listenerArray = listeners[ type ];
    //
    //    if ( listenerArray !== undefined ) {
    //        for(var i = 0; i < listenerArray.length ; ){
    //            var selListener = listenerArray[i];
    //            if(selListener.eventTarget === target)
    //                listenerArray.splice( i, 1 );
    //            else
    //                i++
    //        }
    //    }
    //},

    public dispatchEvent(event: Event, clearAfterDispatch: boolean): void;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // File: cocos2d/core/event-manager/CCEventListener.js
  ////////////////////////////////////////////////////////////////////////////////
  /**
   *
   *     The base class of event listener.
   *     If you need custom listener which with different callback, you need to inherit this class.
   *     For instance, you could refer to EventListenerAcceleration, EventListenerKeyboard,
   *      EventListenerTouchOneByOne, EventListenerCustom.
   *
   * @class
   * @extends Class
   */
  export class EventListener extends Class {
    // event listener type
    /**
     * The type code of unknown event listener.
     * @constant
     * @type {number}
     */
    public static UNKNOWN: number;

    /**
     * The type code of one by one touch event listener.
     * @constant
     * @type {number}
     */
    public static TOUCH_ONE_BY_ONE: number;

    /**
     * The type code of all at once touch event listener.
     * @constant
     * @type {number}
     */
    public static TOUCH_ALL_AT_ONCE: number;

    /**
     * The type code of keyboard event listener.
     * @constant
     * @type {number}
     */
    public static KEYBOARD: number;

    /**
     * The type code of mouse event listener.
     * @constant
     * @type {number}
     */
    public static MOUSE: number;

    /**
     * The type code of acceleration event listener.
     * @constant
     * @type {number}
     */
    public static ACCELERATION: number;

    ///**
    // * The type code of focus event listener.
    // * @constant
    // * @type {number}
    // */
    //public static ACCELERATION:number;

    /**
     * The type code of custom event listener.
     * @constant
     * @type {number}
     */
    public static CUSTOM: number;

    /**
     * The type code of Focus change event listener.
     * @constant
     * @type {number}
     */
    public static FOCUS: number;

    /**
     * Initializes event with type and callback function
     * @param {number} type
     * @param {string} listenerID
     * @param {function} callback
     */
    public constructor(type: number, listenerID: string, callback: () => void);

    /**
     * Checks whether the listener is available.
     * @returns {boolean}
     */
    public checkAvailable(): boolean;

    /**
     * Clones the listener, its subclasses have to override this method.
     * @returns {EventListener}
     */
    public clone(): EventListener;

    /**
     *  Enables or disables the listener
     *  @note Only listeners with `enabled` state will be able to receive events.
     *          When an listener was initialized, it's enabled by default.
     *          An event listener can receive events when it is enabled and is not paused.
     *          paused state is always false when it is a fixed priority listener.
     * @param {boolean} enabled
     */
    public setEnabled(enabled: boolean): void;

    /**
     * Checks whether the listener is enabled
     * @returns {boolean}
     */
    public isEnabled(): boolean;

    /**
     * Currently JavaScript Bindings (JSB), in some cases, needs to use retain and release. This is a bug in JSB,
     * and the ugly workaround is to use retain/release. So, these 2 methods were added to be compatible with JSB.
     * This is a hack, and should be removed once JSB fixes the retain/release bug
     * You will need to retain an object if you created a listener and haven't added it any target node during the same frame.
     * Otherwise, JSB's native autorelease pool will consider this object a useless one and release it directly,
     * when you want to use it later, a "Invalid Native Object" error will be raised.
     * The retain function can increase a reference count for the native object to avoid it being released,
     * you need to manually invoke release function when you think this object is no longer needed, otherwise, there will be memory learks.
     * retain and release function call should be paired in developer's game code.
     * @function
     * @see EventListener#release
     */
    retain(): void;

    /**
     * Currently JavaScript Bindings (JSB), in some cases, needs to use retain and release. This is a bug in JSB,
     * and the ugly workaround is to use retain/release. So, these 2 methods were added to be compatible with JSB.
     * This is a hack, and should be removed once JSB fixes the retain/release bug
     * You will need to retain an object if you created a listener and haven't added it any target node during the same frame.
     * Otherwise, JSB's native autorelease pool will consider this object a useless one and release it directly,
     * when you want to use it later, a "Invalid Native Object" error will be raised.
     * The retain function can increase a reference count for the native object to avoid it being released,
     * you need to manually invoke release function when you think this object is no longer needed, otherwise, there will be memory learks.
     * retain and release function call should be paired in developer's game code.
     * @function
     * @see EventListener#retain
     */
    public release(): void;

    /**
     * Create a EventListener object by json object
     * @function
     * @static
     * @param {object} obj a json object
     * @returns {EventListener}
     * todo: It should be the direct use new
     * @example
     * EventListener.create({
     *       event: EventListener.TOUCH_ONE_BY_ONE,
     *       swallowTouches: true,
     *       onTouchBegan: function (touch, event) {
     *           //do something
     *           return true;
     *       }
     *    });
     */
    public static create(obj: any): EventListener;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // File: cocos2d/core/event-manager/CCEventManager.js
  ////////////////////////////////////////////////////////////////////////////////
  /**
   *
   *  eventManager is a singleton object which manages event listener subscriptions and event dispatching.
   *
   *  The EventListener list is managed in such way so that event listeners can be added and removed
   *  while events are being dispatched.
   *
   * @class
   * @name eventManager
   */
  export class EventManager extends Class {
    //Priority dirty flag
    public static DIRTY_NONE: number;
    public static DIRTY_FIXED_PRIORITY: number;
    public static DIRTY_SCENE_GRAPH_PRIORITY: number;
    public static DIRTY_ALL: number;

    /**
     * Pauses all listeners which are associated the specified target.
     * @param {Node} node
     * @param {Boolean} [recursive=false]
     */
    public pauseTarget(node: Node, recursive: boolean): void;

    /**
     * Resumes all listeners which are associated the specified target.
     * @param {Node} node
     * @param {Boolean} [recursive=false]
     */
    public resumeTarget(node: Node, recursive: boolean): void;

    /**
     *
     * Adds a event listener for a specified event.
     * if the parameter "nodeOrPriority" is a node, it means to add a event listener for a specified event with the priority of scene graph.
     * if the parameter "nodeOrPriority" is a Number, it means to add a event listener for a specified event with the fixed priority.
     *
     * @param {EventListener|Object} listener The listener of a specified event or a object of some event parameters.
     * @param {Node|Number} nodeOrPriority The priority of the listener is based on the draw order of this node or fixedPriority The fixed priority of the listener.
     * @note  The priority of scene graph will be fixed value 0. So the order of listener item in the vector will be ' <0, scene graph (0 priority), >0'.
     *         A lower priority will be called before the ones that have a higher value. 0 priority is forbidden for fixed priority since it's used for scene graph based priority.
     *         The listener must be a EventListener object when adding a fixed priority listener, because we can't remove a fixed priority listener without the listener handler,
     *         except calls removeAllListeners().
     * @return {EventListener} Return the listener. Needed in order to remove the event from the dispatcher.
     */
    public addListener(listener: EventListener, nodeOrPriority: Node | number): EventListener;

    /**
     * Adds a Custom event listener. It will use a fixed priority of 1.
     * @param {string} eventName
     * @param {function} callback
     * @return {EventListener} the generated event. Needed in order to remove the event from the dispatcher
     */
    public addCustomListener(eventName: string, callback: () => void): EventListener;

    /**
     * Remove a listener
     * @param {EventListener} listener an event listener or a registered node target
     */
    public removeListener(listener: EventListener): void;

    /**
     * Removes all listeners with the same event listener type or removes all listeners of a node
     * @param {Number|Node} listenerType listenerType or a node
     * @param {Boolean} [recursive=false]
     */
    public removeListeners(listenerType: Node | number, recursive?: boolean): void;

    /**
     * Removes all custom listeners with the same event name
     * @param {string} customEventName
     */
    public removeCustomListeners(customEventName: string): void;

    /**
     * Removes all listeners
     */
    public removeAllListeners(): void;

    /**
     * Sets listener's priority with fixed value.
     * @param {EventListener} listener
     * @param {Number} fixedPriority
     */
    public setPriority(listener: EventListener, fixedPriority: number): void;

    /**
     * Whether to enable dispatching events
     * @param {boolean} enabled
     */
    public setEnabled(enabled: boolean): void;

    /**
     * Checks whether dispatching events is enabled
     * @returns {boolean}
     */
    public isEnabled(): boolean;

    /**
     * Dispatches the event, also removes all EventListeners marked for deletion from the event dispatcher list.
     * @param {Event} event
     */
    public dispatchEvent(event: Event): void;

    /**
     * Dispatches a Custom Event with a event name an optional user data
     * @param {string} eventName
     * @param {*} optionalUserData
     */
    public dispatchCustomEvent(eventName: string, optionalUserData: any): void;
  }

  export const eventManager: EventManager;

  ////////////////////////////////////////////////////////////////////////////////
  // File: cocos2d/core/event-manager/CCTouch.js
  ////////////////////////////////////////////////////////////////////////////////

  /**
   * The touch event class
   * @class
   * @extends Class
   *
   * @param {Number} x
   * @param {Number} y
   * @param {Number} id
   */
  export class Touch extends Class {
    public constructor(x: number, y: number, id: number);

    /**
     * Returns the current touch location in OpenGL coordinates
     * @return {Point}
     */
    public getLocation(): Point;

    /**
     * Returns X axis location value
     * @returns {number}
     */
    public getLocationX(): number;

    /**
     * Returns Y axis location value
     * @returns {number}
     */
    public getLocationY(): number;

    /**
     * Returns the previous touch location in OpenGL coordinates
     * @return {Point}
     */
    public getPreviousLocation(): Point;

    /**
     * Returns the start touch location in OpenGL coordinates
     * @returns {Point}
     */
    public getStartLocation(): Point;

    /**
     * Returns the delta distance from the previous touche to the current one in screen coordinates
     * @return {Point}
     */
    public getDelta(): Point;

    /**
     * Returns the current touch location in screen coordinates
     * @return {Point}
     */
    public getLocationInView(): Point;

    /**
     * Returns the previous touch location in screen coordinates
     * @return {Point}
     */
    public getPreviousLocationInView(): Point;

    /**
     * Returns the start touch location in screen coordinates
     * @return {Point}
     */
    public getStartLocationInView(): Point;

    /**
     * Returns the id of Touch
     * @return {Number}
     */
    public getID(): number;

    /**
     * Sets information to touch
     * @param {Number} id
     * @param  {Number} x
     * @param  {Number} y
     */
    public setTouchInfo(id: number, x: number, y: number): void;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // Label
  ////////////////////////////////////////////////////////////////////////////////

  // Interface, consolidate all properties/methods common across cc2d label types here.
  // TODO: Fill this out completely. I don't have time to scour through the code and do this,
  //       so the interface will have to grow on an as-needed basis.
  interface Label extends Node {
    // Properties
    string: string;

    // Methods
    getString(): string;

    setString(string: string): void;
  }

  // +--------------------------------------------------------------------------------
  // + File: cocos2d/core/base-nodes/CCLabelAtlas.js
  // +--------------------------------------------------------------------------------
  /**
   * using image file to print text label on the screen, might be a bit slower than Label, similar to LabelBMFont
   * @class
   * @extends AtlasNode
   *
   * @property {String}   string  - Content string of label
   *
   * @param {String} strText
   * @param {String} charMapFile  charMapFile or fntFile
   * @param {Number} [itemWidth=0]
   * @param {Number} [itemHeight=0]
   * @param {Number} [startCharMap=""]
   * @example
   * //creates the LabelAtlas with a string, a char map file(the atlas), the width and height of each element and the starting char of the atlas
   * var myLabel = new LabelAtlas('Text to display', 'CharMapfile.png', 12, 20, ' ')
   *
   * //creates the LabelAtlas with a string, a fnt file
   * var myLabel = new LabelAtlas('Text to display', 'CharMapFile.plist‘);
   */
  export class LabelAtlas extends AtlasNode implements Label {
    //public opacity:number;
    //public color:Color;
    public string: string;

    /**
     * <p>
     *  Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
     *  Create a label atlas. <br />
     *  It accepts two groups of parameters: <br/>
     * a) string, fntFile <br/>
     * b) label, textureFilename, width, height, startChar <br/>
     * </p>
     * @param {String} strText
     * @param {String} charMapFile  charMapFile or fntFile
     * @param {Number} [itemWidth=0]
     * @param {Number} [itemHeight=0]
     * @param {Number} [startCharMap=""]
     */
    public constructor(
      strText: string,
      charMapFile: string,
      itemWidth?: number,
      itemHeight?: number,
      startCharMap?: number
    );

    //public ctor(strText?:string, charMapFile?:string, itemWidth?:number, itemHeight?:number, startCharMap?:number):void;

    /**
     * <p>
     *  initializes the LabelAtlas with a string, a char map file(the atlas), <br/>
     *  the width and height of each element and the starting char of the atlas <br/>
     *  It accepts two groups of parameters: <br/>
     * a) string, fntFile <br/>
     * b) label, textureFilename, width, height, startChar <br/>
     * </p>
     * @param {String} strText
     * @param {String|Texture2D} charMapFile  charMapFile or fntFile or texture file
     * @param {Number} [itemWidth=0]
     * @param {Number} [itemHeight=0]
     * @param {Number} [startCharMap=""]
     * @return {Boolean} returns true on success
     */
    public initWithString(
      strText: string,
      charMapFile: string | Texture2D,
      itemWidth?: number,
      itemHeight?: number,
      startCharMap?: number
    ): void;

    /**
     * Return  texture is loaded.
     * @returns {boolean}
     */
    public textureLoaded(): boolean;

    /**
     * return the text of this label
     * @return {String}
     */
    public getString(): string;

    /**
     * set the display string
     * @function
     * @param {String} label
     */
    public setString(label: string): void;
  }

  // +--------------------------------------------------------------------------------
  // + File: cocos2d/core/base-nodes/CCLabelBMFont.js
  // +--------------------------------------------------------------------------------
  /**
   * @constant
   * @type Number
   */
  export const LABEL_AUTOMATIC_WIDTH: number;

  /**
   * <p>LabelBMFont is a subclass of SpriteBatchNode.</p>
   *
   * <p>Features:<br/>
   * <ul><li>- Treats each character like a Sprite. This means that each individual character can be:</li>
   * <li>- rotated</li>
   * <li>- scaled</li>
   * <li>- translated</li>
   * <li>- tinted</li>
   * <li>- change the opacity</li>
   * <li>- It can be used as part of a menu item.</li>
   * <li>- anchorPoint can be used to align the "label"</li>
   * <li>- Supports AngelCode text format</li></ul></p>
   *
   * <p>Limitations:<br/>
   * - All inner characters are using an anchorPoint of (0.5, 0.5) and it is not recommend to change it
   * because it might affect the rendering</p>
   *
   * <p>LabelBMFont implements the protocol LabelProtocol, like Label and LabelAtlas.<br/>
   * LabelBMFont has the flexibility of Label, the speed of LabelAtlas and all the features of Sprite.<br/>
   * If in doubt, use LabelBMFont instead of LabelAtlas / Label.</p>
   *
   * <p>Supported editors:<br/>
   * http://glyphdesigner.71squared.com/ (Commercial, Mac OS X)<br/>
   * http://www.n4te.com/hiero/hiero.jnlp (Free, Java)<br/>
   * http://slick.cokeandcode.com/demos/hiero.jnlp (Free, Java)<br/>
   * http://www.angelcode.com/products/bmfont/ (Free, Windows only)</p>
   * @class
   * @extends SpriteBatchNode
   *
   * @property {String}   string          - Content string of label
   * @property {Number}   textAlign       - Horizontal Alignment of label, TEXT_ALIGNMENT_LEFT|TEXT_ALIGNMENT_CENTER|TEXT_ALIGNMENT_RIGHT
   * @property {Number}   boundingWidth   - Width of the bounding box of label, the real content width is limited by boundingWidth
   *
   * @param {String} str
   * @param {String} fntFile
   * @param {Number} [width=-1]
   * @param {Number} [alignment=TEXT_ALIGNMENT_LEFT]
   * @param {Point} [imageOffset=p(0,0)]
   *
   * @example
   * // Example 01
   * var label1 = new LabelBMFont("Test case", "test.fnt");
   *
   * // Example 02
   * var label2 = new LabelBMFont("test case", "test.fnt", 200, TEXT_ALIGNMENT_LEFT);
   *
   * // Example 03
   * var label3 = new LabelBMFont("This is a \n test case", "test.fnt", 200, TEXT_ALIGNMENT_LEFT, p(0,0));
   */
  export class LabelBMFont extends SpriteBatchNode implements Label {
    public string: string;
    public boundingWidth: number;
    public textAlign: number;

    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
     * creates a bitmap font atlas with an initial string and the FNT file.
     * @param {String} str
     * @param {String} fntFile
     * @param {Number} [width=-1]
     * @param {Number} [alignment=TEXT_ALIGNMENT_LEFT]
     * @param {Point} [imageOffset=p(0,0)]
     */
    //public ctor(fileImage?:string|Texture2D, capacity?:number);
    public constructor(
      str: string,
      fntFile: string,
      width?: number,
      alignment?: number,
      imageOffset?: Point
    );

    //public ctor(str?:string, fntFile?:string, width?:number, alignment?:number, imageOffset?:Point):void;

    /**
     * init a bitmap font atlas with an initial string and the FNT file
     * @param {String} str
     * @param {String} fntFile
     * @param {Number} [width=-1]
     * @param {Number} [alignment=TEXT_ALIGNMENT_LEFT]
     * @param {Point} [imageOffset=p(0,0)]
     * @return {Boolean}
     */
    public initWithString(
      str: string,
      fntFile: string,
      width?: number,
      alignment?: number,
      imageOffset?: Point
    ): void;

    /**
     * return  texture is loaded
     * @returns {boolean}
     */
    public textureLoaded(): boolean;

    /**
     * updates the font chars based on the string to render
     */
    public createFontChars(): void;

    /**
     * Update String. <br />
     * Only update this label display string.
     * @param {Boolean} fromUpdate
     */
    public updateString(fromUpdate: boolean): void;

    /**
     * Gets the text of this label
     * @return {String}
     */
    public getString(): string;

    /**
     * Set the text
     * @param {String} newString
     * @param {Boolean|null} needUpdateLabel
     */
    public setString(newString: string, needUpdateLabel?: boolean): void;

    /**
     * Update Label. <br />
     * Update this Label display string and more...
     */
    public updateLabel(): void;

    /**
     * Set text alignment.
     * @param {Number} alignment
     */
    public setAlignment(alignment: number): void;

    /**
     * Set the bounding width. <br />
     * max with display width. The exceeding string will be wrapping.
     * @param {Number} width
     */
    public setBoundingWidth(width: number): void;

    /**
     * Set the param to change English word warp according to whether the space. <br />
     * default is false.
     * @param {Boolean}  breakWithoutSpace
     */
    public setLineBreakWithoutSpace(breakWithoutSpace: boolean): void;

    /**
     * set fnt file path. <br />
     * Change the fnt file path.
     * @param {String} fntFile
     */
    public setFntFile(fntFile: string): void;

    /**
     * Return the fnt file path.
     * @return {String}
     */
    public getFntFile(): string;

    // apply by EventHelper

    public addEventListener(type: string, listener: (...args) => {}, target: any);

    public hasEventListener(type: string, listener: (...args) => {}, target: any);

    public removeEventListener(type: string, listener: (...args) => {}, target: any);

    public dispatchEvent(event: string, clearAfterDispatch?: boolean);
  }

  export namespace fnt {
    /**
     * Parse Fnt string.
     * @param fntStr
     * @param url
     * @returns {{}}
     */
    // TODO: I'm not exactly sure what this returns, it might be a FontDefinition. Maybe I should just mark the return property as "any" and be done with this ...?
    export function parseFnt(fntStr: string, url: string): FontDefinition;

    /**
     * load the fnt
     * @param realUrl
     * @param url
     * @param res
     * @param cb
     */
    // TODO: I have zero clue what actual types are for these arguments
    export function load(realUrl: string, url: string, res: string, cb: () => void): void;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // labelTTF
  ////////////////////////////////////////////////////////////////////////////////

  // +--------------------------------------------------------------------------------
  // + File: cocos2d/core/base-nodes/CCLabelTTF.js
  // +--------------------------------------------------------------------------------
  /**
   * <p>LabelTTF is a subclass of TextureNode that knows how to render text labels with system font or a ttf font file<br/>
   * All features from Sprite are valid in LabelTTF<br/>
   * LabelTTF objects are slow for js-binding on mobile devices.<br/>
   * Consider using LabelAtlas or LabelBMFont instead.<br/>
   * You can create a LabelTTF from a font name, alignment, dimension and font size or a FontDefinition object.</p>
   * @class
   * @extends Sprite
   *
   * @param {String} text
   * @param {String|FontDefinition} [fontName="Arial"]
   * @param {Number} [fontSize=16]
   * @param {Size} [dimensions=size(0,0)]
   * @param {Number} [hAlignment=TEXT_ALIGNMENT_LEFT]
   * @param {Number} [vAlignment=VERTICAL_TEXT_ALIGNMENT_TOP]
   * @example
   * var myLabel = new LabelTTF('label text',  'Times New Roman', 32, size(320,32), TEXT_ALIGNMENT_LEFT);
   *
   * var fontDef = new FontDefinition();
   * fontDef.fontName = "Arial";
   * fontDef.fontSize = "32";
   * var myLabel = new LabelTTF('label text',  fontDef);
   *
   * @property {String}       string          - Content string of label
   * @property {Number}       textAlign       - Horizontal Alignment of label: TEXT_ALIGNMENT_LEFT|TEXT_ALIGNMENT_CENTER|TEXT_ALIGNMENT_RIGHT
   * @property {Number}       verticalAlign   - Vertical Alignment of label: VERTICAL_TEXT_ALIGNMENT_TOP|VERTICAL_TEXT_ALIGNMENT_CENTER|VERTICAL_TEXT_ALIGNMENT_BOTTOM
   * @property {Number}       fontSize        - Font size of label
   * @property {String}       fontName        - Font name of label
   * @property {String}       font            - The label font with a style string: e.g. "18px Verdana"
   * @property {Number}       boundingWidth   - Width of the bounding box of label, the real content width is limited by boundingWidth
   * @property {Number}       boundingHeight  - Height of the bounding box of label, the real content height is limited by boundingHeight
   * @property {Color}     fillStyle       - The fill color
   * @property {Color}     strokeStyle     - The stroke color
   * @property {Number}       lineWidth       - The line width for stroke
   * @property {Number}       shadowOffsetX   - The x axis offset of shadow
   * @property {Number}       shadowOffsetY   - The y axis offset of shadow
   * @property {Number}       shadowOpacity   - The opacity of shadow
   * @property {Number}       shadowBlur      - The blur size of shadow
   */
  export class LabelTTF extends Sprite implements Label {
    ///** @expose */
    public string: string;
    /** @expose */
    public textAlign: number;
    /** @expose */
    public verticalAlign: number;
    /** @expose */
    public fontSize: number;
    /** @expose */
    public fontName: string;
    /** @expose */
    public font: string;
    /** @expose */
    public boundingSize: number;
    /** @expose */
    public boundingWidth: number;
    /** @expose */
    public boundingHeight: number;
    /** @expose */
    public fillStyle: Color;
    /** @expose */
    public strokeStyle: Color;
    /** @expose */
    public lineWidth: number;
    /** @expose */
    public shadowOffset: number;
    /** @expose */
    public shadowOffsetX: number;
    /** @expose */
    public shadowOffsetY: number;
    /** @expose */
    public shadowOpacity: number;
    /** @expose */
    public shadowBlur: number;

    public constructor(
      label: string,
      fontName: string,
      fontSize: number,
      dimensions?: Size,
      hAlignment?: number,
      vAlignment?: number
    );

    //public ctor(label?:string, fontName?:string, fontSize?:number, dimensions?:Size, hAlignment?:number, vAlignment?:number):boolean;

    /**
     * Initializes the LabelTTF with a font name, alignment, dimension and font size, do not call it by yourself,
     * you should pass the correct arguments in constructor to initialize the label.
     * @param {String} label string
     * @param {String} fontName
     * @param {Number} fontSize
     * @param {Size} [dimensions=]
     * @param {Number} [hAlignment=]
     * @param {Number} [vAlignment=]
     * @return {Boolean} return false on error
     */
    public initWithString(
      label: string,
      fontName: string,
      fontSize: number,
      dimensions?: Size,
      hAlignment?: number,
      vAlignment?: number
    ): boolean;

    public getLineHeight(): number;

    public setLineHeight(lineHeight: number): void;

    /**
     * Returns the text of the label
     * @return {String}
     */
    public getString(): string;

    /**
     * Returns Horizontal Alignment of LabelTTF
     * @return {TEXT_ALIGNMENT_LEFT|TEXT_ALIGNMENT_CENTER|TEXT_ALIGNMENT_RIGHT}
     */
    public getHorizontalAlignment(): number;

    /**
     * Returns Vertical Alignment of LabelTTF
     * @return {VERTICAL_TEXT_ALIGNMENT_TOP|VERTICAL_TEXT_ALIGNMENT_CENTER|VERTICAL_TEXT_ALIGNMENT_BOTTOM}
     */
    public getVerticalAlignment(): number;

    /**
     * Returns the dimensions of LabelTTF, the dimension is the maximum size of the label, set it so that label will automatically change lines when necessary.
     * @see LabelTTF#setDimensions, LabelTTF#boundingWidth and LabelTTF#boundingHeight
     * @return {Size}
     */
    public getDimensions(): Size;

    /**
     * Returns font size of LabelTTF
     * @return {Number}
     */
    public getFontSize(): number;

    /**
     * Returns font name of LabelTTF
     * @return {String}
     */
    public getFontName(): string;

    /**
     * Initializes the CCLabelTTF with a font name, alignment, dimension and font size, do not call it by yourself, you should pass the correct arguments in constructor to initialize the label.
     * @param {String} text
     * @param {FontDefinition} textDefinition
     * @return {Boolean}
     */
    public initWithStringAndTextDefinition(text: string, textDefinition: FontDefinition): boolean;

    /**
     * Sets the text definition used by this label
     * @param {FontDefinition} theDefinition
     */
    public setTextDefinition(theDefinition: FontDefinition): void;

    /**
     * Extract the text definition used by this label
     * @return {FontDefinition}
     */
    public getTextDefinition(): FontDefinition;

    /**
     * Enable or disable shadow for the label
     * @param {Color | Number} a Color or The x axis offset of the shadow
     * @param {Size | Number} b Size or The y axis offset of the shadow
     * @param {Number} c The blur size of the shadow or The opacity of the shadow (0 to 1)
     * @param {null | Number} d Null or The blur size of the shadow
     * @example
     *   old:
     *     labelttf.enableShadow(shadowOffsetX, shadowOffsetY, shadowOpacity, shadowBlur);
     *   new:
     *     labelttf.enableShadow(shadowColor, offset, blurRadius);
     */
    public enableShadow(a: Color | number, b: Size | number, c: number, d?: number): void;

    /**
     * Disable shadow rendering
     */
    public disableShadow(): void;

    /**
     * Enable label stroke with stroke parameters
     * @param {Color} strokeColor The color of stroke
     * @param {Number} strokeSize The size of stroke
     */
    public enableStroke(strokeColor: Color, strokeSize: number): void;

    /**
     * Disable label stroke
     */
    public disableStroke(): void;

    /**
     * Sets the text fill color
     * @function
     * @param {Color} fillColor The fill color of the label
     */
    public setFontFillColor(fillColor: Color): void;

    /**
     * Changes the text content of the label
     * @warning Changing the string is as expensive as creating a new LabelTTF. To obtain better performance use LabelAtlas
     * @param {String} text Text content for the label
     */
    public setString(text: string): void;

    /**
     * Sets Horizontal Alignment of LabelTTF
     * @param {TEXT_ALIGNMENT_LEFT|TEXT_ALIGNMENT_CENTER|TEXT_ALIGNMENT_RIGHT} alignment Horizontal Alignment
     */
    public setHorizontalAlignment(alignment: number): void;

    /**
     * Sets Vertical Alignment of LabelTTF
     * @param {VERTICAL_TEXT_ALIGNMENT_TOP|VERTICAL_TEXT_ALIGNMENT_CENTER|VERTICAL_TEXT_ALIGNMENT_BOTTOM} verticalAlignment
     */
    public setVerticalAlignment(verticalAlignment: number): void;

    /**
     * Set Dimensions of LabelTTF, the dimension is the maximum size of the label, set it so that label will automatically change lines when necessary.
     * @param {Size|Number} dim dimensions or width of dimensions
     * @param {Number} [height] height of dimensions
     */
    public setDimensions(dim: Size | number, height?: number): void;

    /**
     * Sets font size of LabelTTF
     * @param {Number} fontSize
     */
    public setFontSize(fontSize: number): void;

    /**
     * Sets font name of LabelTTF
     * @param {String} fontName
     */
    public setFontName(fontName: number): void;

    public setTextureRect(rect: Rect, rotated: boolean, untrimmedSize: Size): boolean;

    /**
     * set Target to draw on
     * @param {boolean} onCacheMode
     */
    public setDrawMode(onCacheMode: boolean): void;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // Layers
  ////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////
  // File: cocos2d/layers/CCLayer.js
  ////////////////////////////////////////////////////////////////////////////////

  //+-------------------- Variable Definitions --------------------+//
  //+-------------------- Function Definitions --------------------+//
  //+-------------------- Class Definitions --------------------+//

  /** Layer is a subclass of Node that implements the TouchEventsDelegate protocol.
   * All features from Node are valid, plus the bake feature: Baked layer can cache a static layer to improve performance
   * @class
   * @extends Node
   */
  export class Layer extends Node {
    /**
     * Constructor of Layer, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     */
    constructor();

    /**
     * Sets the layer to cache all of children to a bake sprite, and draw itself by bake sprite. recommend using it in UI.
     * This is useful only in html5 engine
     * @function
     * @see Layer#unbake
     */
    public bake(): void;

    /**
     * Cancel the layer to cache all of children to a bake sprite.
     * This is useful only in html5 engine
     * @function
     * @see Layer#bake
     */
    public unbake(): void;

    /**
     * Determines if the layer is baked.
     * @function
     * @returns {boolean}
     * @see mz.Layer#bake and mz.Layer#unbake
     */
    public isBaked(): boolean;
  }

  /**
   *
   * CCLayerColor is a subclass of CCLayer that implements the CCRGBAProtocol protocol.
   *  All features from CCLayer are valid, plus the following new features:
   * - opacity
   * - RGB colors
   * @class
   * @extends Layer
   *
   * @param {Color} [color=] The color of the layer
   * @param {Number} [width=] The width of the layer
   * @param {Number} [height=] The height of the layer
   *
   * @example
   * // Example
   * //Create a yellow color layer as background
   * var yellowBackground = new LayerColor(color(255,255,0,255));
   * //If you didn't pass in width and height, it defaults to the same size as the canvas
   *
   * //create a yellow box, 200 by 200 in size
   * var yellowBox = new LayerColor(color(255,255,0,255), 200, 200);
   */
  export class LayerColor extends Layer {
    /**
     * Constructor of LayerColor
     * @function
     * @param {Color} [color=]
     * @param {Number} [width=]
     * @param {Number} [height=]
     */
    constructor(color: Color, width?: number, height?: number);

    ctor(color?: Color, width?: number, height?: number): void;

    /**
     * Returns the blend function
     * @return {BlendFunc}
     */
    public getBlendFunc(): BlendFunc;

    /**
     * Sets the blend func, you can pass either a BlendFunc object or source and destination value separately
     * @param {BlendFunc} func
     */
    public setBlendFunc(func: BlendFunc): void;

    /**
     * Sets the blend func, you can pass either a BlendFunc object or source and destination value separately
     * @param {Number} src
     * @param {Number} [dst]
     */
    public setBlendFunc(src: number, dst: number): void;
  }

  /**
   *
   * CCLayerGradient is a subclass of LayerColor that draws gradients across the background.
   *
   * All features from LayerColor are valid, plus the following new features:
   *      * direction
   *      * final color
   *      * interpolation mode
   *
   * Color is interpolated between the startColor and endColor along the given
   * vector (starting at the origin, ending at the terminus).  If no vector is
   * supplied, it defaults to (0, -1) -- a fade from top to bottom.
   *
   * If 'compressedInterpolation' is disabled, you will not see either the start or end color for
   * non-cardinal vectors; a smooth gradient implying both end points will be still
   * be drawn, however.
   *
   * If 'compressedInterpolation' is enabled (default mode) you will see both the start and end colors of the gradient.
   *
   * @class
   * @extends LayerColor
   *
   * @param {Color} start Starting color
   * @param {Color} end Ending color
   * @param {Point} [v=p(0, -1)] A vector defines the gradient direction, default direction is from top to bottom
   *
   * @property {Color} startColor              - Start color of the color gradient
   * @property {Color} endColor                - End color of the color gradient
   * @property {Number}   startOpacity            - Start opacity of the color gradient
   * @property {Number}   endOpacity              - End opacity of the color gradient
   * @property {Number}   vector                  - Direction vector of the color gradient
   * @property {Number}   compressedInterpolation  - Indicate whether or not the interpolation will be compressed
   */
  export class LayerGradient extends LayerColor {
    /**
     * TODO: Make some kind of type for the "stops" array, I believe the fields are: {p:number, color:Color}
     * Constructor of LayerGradient
     * @param {Color} start
     * @param {Color} end
     * @param {Point} [v=p(0, -1)]
     * @param {Array|Null} stops
     *
     * @example Using ColorStops argument:
     * //startColor & endColor are for default and backward compatibility
     * var layerGradient = new LayerGradient(color.RED, new Color(255,0,0,0), p(0, -1),
     *                                          [{p:0, color: color.RED},
     *                                           {p:.5, color: new Color(0,0,0,0)},
     *                                           {p:1, color: color.RED}]);
     * //where p = A value between 0.0 and 1.0 that represents the position between start and end in a gradient
     *
     */
    constructor(start: Color, end: Color, v: Point, stops?: any[]);

    ctor(start?: Color, end?: Color | number, v?: Point | number, stops?: any[]): void;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // platform
  ////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////
  // File: cocos2d/core/platform/CCClass.js
  ////////////////////////////////////////////////////////////////////////////////

  //+---------- Function definitions ----------+//

  /**
   * Common getter setter configuration function
   * @function
   * @param {Object}   proto      A class prototype or an object to config
   * @param {String}   prop       Property name
   * @param {function} getter     Getter function for the property
   * @param {function} setter     Setter function for the property
   * @param {String}   getterName Name of getter function for the property
   * @param {String}   setterName Name of setter function for the property
   */
  export function defineGetterSetter(
    proto: Object,
    prop: string,
    getter: Function,
    setter: Function,
    getterName: string,
    setterName: string
  ): void;

  // TODO: Can restrict clone() to overloaded declarations that take a Class and and Array, instead of an Any?
  /**
   * Create a new object and copy all properties in an exist object to the new object
   * @function
   * @param {object|Array} obj The source object
   * @return {Array|object} The created object
   */
  export function clone(obj: any): any;

  // TODO: Can restrict inject() to overloaded declarations that take a Class and and Array, instead of an Any?
  // TODO: Fill these comments in with a descrition of what the function does
  /**
   * Fill in this description later, I believe the methods just injects the prototype of the source object into the
   * destination object (all properties in src => dest).
   *
   * @function
   * @param {object|Array} srcPrototype The source object
   * @param {object|Array} destPrototype The destination object
   * @return {Array|object} The modified object
   */
  export function inject(srcPrototype: any, destPrototype: any): any;

  //+---------- Class definitions ----------+//

  /* Managed JavaScript Inheritance
   * Based on John Resig's Simple JavaScript Inheritance http://ejohn.org/blog/simple-javascript-inheritance/
   * MIT Licensed.
   */
  export class Class {
    public ctor(): void;

    public description(): string;

    /**
     * Create a new Class that inherits from this Class
     * @static
     * @param {object} props
     * @return {function}
     */
    public extend(props: object): Function;
  }

  // +---------------------------------------------------------------------------
  // File: cocos2d/core/platform/CCMacro.js
  // +---------------------------------------------------------------------------

  // Variables / Constants
  /**
   * @constant
   * @type Number
   */
  export const INVALID_INDEX: number;

  /**
   * PI is the ratio of a circle's circumference to its diameter.
   * @constant
   * @type Number
   */
  export const PI: number;

  /**
   * @constant
   * @type Number
   */
  export const FLT_MAX: number;

  /**
   * @constant
   * @type Number
   */
  export const FLT_MIN: number;

  /**
   * @constant
   * @type Number
   */
  export const RAD: number;

  /**
   * @constant
   * @type Number
   */
  export const DEG: number;

  /**
   * maximum unsigned int value
   * @constant
   * @type Number
   */
  export const UINT_MAX: number;

  /**
   *
   *     Linear interpolation between 2 numbers, the ratio sets how much it is biased to each end
   *
   * @param {Number} a number A
   * @param {Number} b number B
   * @param {Number} r ratio between 0 and 1
   * @function
   * @example
   * lerp(2,10,0.5)//returns 6
   * lerp(2,10,0.2)//returns 3.6
   */
  export function lerp(a: number, b: number, r: number): number;

  /**
   * get a random number from 0 to 0xffffff
   * @function
   * @returns {number}
   */
  export function rand(): number;

  /**
   * returns a random float between -1 and 1
   * @return {Number}
   * @function
   */
  export function randomMinus1To1(): number;

  /**
   * returns a random float between 0 and 1
   * @return {Number}
   * @function
   */
  export function random0To1(): number;

  /**
   * converts degrees to radians
   * @param {Number} angle
   * @return {Number}
   * @function
   */
  export function degreesToRadians(angle: number): number;

  /**
   * converts radians to degrees
   * @param {Number} angle
   * @return {Number}
   * @function
   */
  export function radiansToDegrees(angle: number): number;

  /**
   * converts radians to degrees
   * @param {Number} angle
   * @return {Number}
   * @function
   */
  export function radiansToDegress(angle: number): number;

  /**
   * @constant
   * @type Number
   */
  export const REPEAT_FOREVER: number;

  /**
   * Helpful macro that setups the GL server state, the correct GL program and sets the Model View Projection matrix
   * @param {Node} node setup node
   * @function
   */
  export function nodeDrawSetup(node: Node): void;

  /**
   *
   *     GL states that are enabled:
   *       - GL_TEXTURE_2D
   *       - GL_VERTEX_ARRAY
   *       - GL_TEXTURE_COORD_ARRAY
   *       - GL_COLOR_ARRAY
   *
   * @function
   */
  export function enableDefaultGLStates(): void;

  /**
   *
   *   Disable default GL states:
   *     - GL_TEXTURE_2D
   *     - GL_TEXTURE_COORD_ARRAY
   *     - GL_COLOR_ARRAY
   *
   * @function
   */
  export function disableDefaultGLStates(): void;

  /**
   *
   *  Increments the GL Draws counts by one.
   *  The number of calls per frame are displayed on the screen when the CCDirector's stats are enabled.
   *
   * @param {Number} addNumber
   * @function
   */
  export function incrementGLDraws(addNumber: number): void;

  /**
   * @constant
   * @type Number
   */
  export const FLT_EPSILON: number;

  /**
   *
   *     On Mac it returns 1;
   *     On iPhone it returns 2 if RetinaDisplay is On. Otherwise it returns 1
   *
   * @return {Number}
   * @function
   */
  export function contentScaleFactor(): number;

  /**
   * Converts a Point in points to pixels
   * @param {Point} points
   * @return {Point}
   * @function
   */
  export function pointPointsToPixels(points: Point): Point;

  /**
   * Converts a Point in pixels to points
   * @param {Rect} pixels
   * @return {Point}
   * @function
   */
  export function pointPixelsToPoints(pixels: Rect): Point;

  /**
   * Converts a Size in points to pixels
   * @param {Size} sizeInPoints
   * @return {Size}
   * @function
   */
  export function sizePointsToPixels(sizeInPoints: Size): Size;

  /**
   * Converts a size in pixels to points
   * @param {Size} sizeInPixels
   * @return {Size}
   * @function
   */
  export function sizePixelsToPoints(sizeInPixels: Size): Size;

  /**
   * Converts a rect in pixels to points
   * @param {Rect} pixel
   * @return {Rect}
   * @function
   */
  export function rectPixelsToPoints(pixels: Rect): Rect;

  /**
   * Converts a rect in points to pixels
   * @param {Rect} point
   * @return {Rect}
   * @function
   */
  export function rectPointsToPixels(point: Rect): Rect;

  //some gl constant variable
  /**
   * @constant
   * @type Number
   */
  export const ONE: number;

  /**
   * @constant
   * @type Number
   */
  export const ZERO: number;

  /**
   * @constant
   * @type Number
   */
  export const SRC_ALPHA: number;

  /**
   * @constant
   * @type Number
   */
  export const SRC_ALPHA_SATURATE: number;

  /**
   * @constant
   * @type Number
   */
  export const SRC_COLOR: number;

  /**
   * @constant
   * @type Number
   */
  export const DST_ALPHA: number;

  /**
   * @constant
   * @type Number
   */
  export const DST_COLOR: number;

  /**
   * @constant
   * @type Number
   */
  export const ONE_MINUS_SRC_ALPHA: number;

  /**
   * @constant
   * @type Number
   */
  export const ONE_MINUS_SRC_COLOR: number;

  /**
   * @constant
   * @type Number
   */
  export const ONE_MINUS_DST_ALPHA: number;

  /**
   * @constant
   * @type Number
   */
  export const ONE_MINUS_DST_COLOR: number;

  /**
   * @constant
   * @type Number
   */
  export const ONE_MINUS_CONSTANT_ALPHA: number;

  /**
   * @constant
   * @type Number
   */
  export const ONE_MINUS_CONSTANT_COLOR: number;

  /**
   * the constant variable equals gl.LINEAR for texture
   * @constant
   * @type Number
   */
  export const LINEAR: number;

  /**
   * the constant variable equals gl.REPEAT for texture
   * @constant
   * @type Number
   */
  export const REPEAT: number;

  /**
   * the constant variable equals gl.CLAMP_TO_EDGE for texture
   * @constant
   * @type Number
   */
  export const CLAMP_TO_EDGE: number;

  /**
   * the constant variable equals gl.MIRRORED_REPEAT for texture
   * @constant
   * @type Number
   */
  export const MIRRORED_REPEAT: number;

  /**
   * default gl blend src function. Compatible with premultiplied alpha images.
   * @constant
   * @name export const BLEND_SRC
   * @type Number
   */
  export const BLEND_SRC: number;

  /**
   * default gl blend dst function. Compatible with premultiplied alpha images.
   * @constant
   * @type Number
   */
  export const BLEND_DST: number;

  /**
   * Check webgl error.Error will be shown in console if exists.
   * @function
   */
  export function checkGLErrorDebug(): void;

  //Possible device orientations
  /**
   * Device oriented vertically, home button on the bottom (UIDeviceOrientationPortrait)
   * @constant
   * @type Number
   */
  export const DEVICE_ORIENTATION_PORTRAIT: number;

  /**
   * Device oriented horizontally, home button on the right (UIDeviceOrientationLandscapeLeft)
   * @constant
   * @type Number
   */
  export const DEVICE_ORIENTATION_LANDSCAPE_LEFT: number;

  /**
   * Device oriented vertically, home button on the top (UIDeviceOrientationPortraitUpsideDown)
   * @constant
   * @type Number
   */
  export const DEVICE_ORIENTATION_PORTRAIT_UPSIDE_DOWN: number;

  /**
   * Device oriented horizontally, home button on the left (UIDeviceOrientationLandscapeRight)
   * @constant
   * @type Number
   */
  export const DEVICE_ORIENTATION_LANDSCAPE_RIGHT: number;

  /**
   * In browsers, we only support 2 orientations by change window size.
   * @constant
   * @type Number
   */
  export const DEVICE_MAX_ORIENTATIONS: number;

  // ------------------- vertex attrib flags -----------------------------
  /**
   * @constant
   * @type {Number}
   */
  export const VERTEX_ATTRIB_FLAG_NONE: number;
  /**
   * @constant
   * @type {Number}
   */
  export const VERTEX_ATTRIB_FLAG_POSITION: number;
  /**
   * @constant
   * @type {Number}
   */
  export const VERTEX_ATTRIB_FLAG_COLOR: number;
  /**
   * @constant
   * @type {Number}
   */
  export const VERTEX_ATTRIB_FLAG_TEX_COORDS: number;
  /**
   * @constant
   * @type {Number}
   */
  export const VERTEX_ATTRIB_FLAG_POS_COLOR_TEX: number;

  /**
   * GL server side states
   * @constant
   * @type {Number}
   */
  export const GL_ALL: number;

  //-------------Vertex Attributes-----------
  /**
   * @constant
   * @type {Number}
   */
  export const VERTEX_ATTRIB_POSITION: number;
  /**
   * @constant
   * @type {Number}
   */
  export const VERTEX_ATTRIB_COLOR: number;
  /**
   * @constant
   * @type {Number}
   */
  export const VERTEX_ATTRIB_TEX_COORDS: number;
  /**
   * @constant
   * @type {Number}
   */
  export const VERTEX_ATTRIB_MAX: number;

  //------------Uniforms------------------
  /**
   * @constant
   * @type {Number}
   */
  export const UNIFORM_PMATRIX: number;
  /**
   * @constant
   * @type {Number}
   */
  export const UNIFORM_MVMATRIX: number;
  /**
   * @constant
   * @type {Number}
   */
  export const UNIFORM_MVPMATRIX: number;
  /**
   * @constant
   * @type {Number}
   */
  export const UNIFORM_TIME: number;
  /**
   * @constant
   * @type {Number}
   */
  export const UNIFORM_SINTIME: number;
  /**
   * @constant
   * @type {Number}
   */
  export const UNIFORM_COSTIME: number;
  /**
   * @constant
   * @type {Number}
   */
  export const UNIFORM_RANDOM01: number;
  /**
   * @constant
   * @type {Number}
   */
  export const UNIFORM_SAMPLER: number;
  /**
   * @constant
   * @type {Number}
   */
  export const UNIFORM_MAX: number;

  //------------Shader Name---------------
  /**
   * @constant
   * @type {String}
   */
  export const SHADER_POSITION_TEXTURECOLOR: string;
  /**
   * @constant
   * @type {String}
   */
  export const SHADER_POSITION_TEXTURECOLORALPHATEST: string;
  /**
   * @constant
   * @type {String}
   */
  export const SHADER_POSITION_COLOR: string;
  /**
   * @constant
   * @type {String}
   */
  export const SHADER_POSITION_TEXTURE: string;
  /**
   * @constant
   * @type {String}
   */
  export const SHADER_POSITION_TEXTURE_UCOLOR: string;
  /**
   * @constant
   * @type {String}
   */
  export const SHADER_POSITION_TEXTUREA8COLOR: string;
  /**
   * @constant
   * @type {String}
   */
  export const SHADER_POSITION_UCOLOR: string;
  /**
   * @constant
   * @type {String}
   */
  export const SHADER_POSITION_LENGTHTEXTURECOLOR: string;

  //------------uniform names----------------
  /**
   * @constant
   * @type {String}
   */
  export const UNIFORM_PMATRIX_S: string;
  /**
   * @constant
   * @type {String}
   */
  export const UNIFORM_MVMATRIX_S: string;
  /**
   * @constant
   * @type {String}
   */
  export const UNIFORM_MVPMATRIX_S: string;
  /**
   * @constant
   * @type {String}
   */
  export const UNIFORM_TIME_S: string;
  /**
   * @constant
   * @type {String}
   */
  export const UNIFORM_SINTIME_S: string;
  /**
   * @constant
   * @type {String}
   */
  export const UNIFORM_COSTIME_S: string;
  /**
   * @constant
   * @type {String}
   */
  export const UNIFORM_RANDOM01_S: string;
  /**
   * @constant
   * @type {String}
   */
  export const UNIFORM_SAMPLER_S: string;
  /**
   * @constant
   * @type {String}
   */
  export const UNIFORM_ALPHA_TEST_VALUE_S: string;

  //------------Attribute names--------------
  /**
   * @constant
   * @type {String}
   */
  export const ATTRIBUTE_NAME_COLOR: string;
  /**
   * @constant
   * @type {String}
   */
  export const ATTRIBUTE_NAME_POSITION: string;
  /**
   * @constant
   * @type {String}
   */
  export const ATTRIBUTE_NAME_TEX_COORD: string;

  /**
   * default size for font size
   * @constant
   * @type Number
   */
  export const ITEM_SIZE: number;

  /**
   * default tag for current item
   * @constant
   * @type Number
   */
  export const CURRENT_ITEM: number;
  /**
   * default tag for zoom action tag
   * @constant
   * @type Number
   */
  export const ZOOM_ACTION_TAG: number;
  /**
   * default tag for normal
   * @constant
   * @type Number
   */
  export const NORMAL_TAG: number;

  /**
   * default selected tag
   * @constant
   * @type Number
   */
  export const SELECTED_TAG: number;

  /**
   * default disabled tag
   * @constant
   * @type Number
   */
  export const DISABLE_TAG: number;

  // Array utils

  /**
   * Verify Array's Type
   * @param {Array} arr
   * @param {function} type
   * @return {Boolean}
   * @function
   */
  export function arrayVerifyType(arr: any[], type: any): boolean;

  /**
   * Searches for the first occurance of object and removes it. If object is not found the function has no effect.
   * @function
   * @param {Array} arr Source Array
   * @param {*} delObj  remove object
   */
  export function arrayRemoveObject(arr: any[], delObj: any): void;

  /**
   * Removes from arr all values in minusArr. For each Value in minusArr, the first matching instance in arr will be removed.
   * @function
   * @param {Array} arr Source Array
   * @param {Array} minusArr minus Array
   */
  export function arrayRemoveArray(arr: any[], minusArr: any[]): void;

  /**
   * Inserts some objects at index
   * @function
   * @param {Array} arr
   * @param {Array} addObjs
   * @param {Number} index
   * @return {Array}
   */
  export function arrayAppendObjectsToIndex(arr: any[], addObjs: any[], index: number): any[];

  /**
   * Copy an array's item to a new array (its performance is better than Array.slice)
   * @param {Array} arr
   * @return {Array}
   */
  export function copyArray(arr: any[]): any[];

  ////////////////////////////////////////////////////////////////////////////////
  // File: cocos2d/core/platform/CCTypes.js
  ////////////////////////////////////////////////////////////////////////////////

  //+---------- Variable definitions ----------+//
  /**
   * text alignment : left
   * @constant
   * @type Number
   */
  export const TEXT_ALIGNMENT_LEFT: number;

  /**
   * text alignment : center
   * @constant
   * @type Number
   */
  export const TEXT_ALIGNMENT_CENTER: number;

  /**
   * text alignment : right
   * @constant
   * @type Number
   */
  export const TEXT_ALIGNMENT_RIGHT: number;

  /**
   * text alignment : top
   * @constant
   * @type Number
   */
  export const VERTICAL_TEXT_ALIGNMENT_TOP: number;

  /**
   * text alignment : center
   * @constant
   * @type Number
   */
  export const VERTICAL_TEXT_ALIGNMENT_CENTER: number;

  /**
   * text alignment : bottom
   * @constant
   * @type Number
   */
  export const VERTICAL_TEXT_ALIGNMENT_BOTTOM: number;

  //+---------- Function definitions ----------+//
  /**
   * @function
   * @returns {BlendFunc}
   */
  export function blendFuncDisable(): BlendFunc;

  /**
   * Generate a color object based on multiple forms of parameters
   * @example
   *
   * // 1. All channels seperately as parameters
   * var color1 = color(255, 255, 255, 255);
   *
   * // 2. Convert a hex string to a color
   * var color2 = color("#000000");
   *
   * // 3. An color object as parameter
   * var color3 = color({r: 255, g: 255, b: 255, a: 255});
   *
   * Alpha channel is optional. Default value is 255
   *
   * @param {String|Color} color
   * @return {Color}
   */
  export function color(color: { r: number; g: number; b: number; a?: number }): Color;
  export function color(color: Color | string): Color;
  export function color(red: number, green: number, blue: number, alpha?: number): Color;

  /**
   * returns true if both ccColor3B are equal. Otherwise it returns false.
   * @function
   * @param {Color} color1
   * @param {Color} color2
   * @return {Boolean}  true if both ccColor3B are equal. Otherwise it returns false.
   */
  export function colorEqual(color1: Color, color2: Color): boolean;

  /**
   * convert Color to a string of color for style.
   * e.g.  color(255,6,255)  to : "#ff06ff"
   * @function
   * @param {Color} color
   * @return {String}
   */
  export function colorToHex(color: Color): string;

  /**
   * convert a string of color for style to Color.
   * e.g. "#ff06ff"  to : color(255,6,255)
   * @function
   * @param {String} hex
   * @return {Color}
   */
  export function hexToColor(hex: string): Color;

  /**
   * Helper macro that creates an Tex2F type: A texcoord composed of 2 floats: u, y
   * @function
   * @param {Number} u
   * @param {Number} v
   * @return {Tex2F}
   */
  export function tex2(u: number, v: number): Tex2F;

  /**
   * Helper macro that creates an Vertex2F type composed of 2 floats: x, y
   * @function
   * @param {Number} x
   * @param {Number} y
   * @return {Vertex2F}
   */
  export function vertex2(x: number, y: number): Vertex2F;

  /**
   * Helper macro that creates an Vertex3F type composed of 3 floats: x, y, z
   * @function
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   * @return {Vertex3F}
   */
  export function vertex3(x: number, y: number, z: number): Vertex3F;

  //+---------- Class definitions ----------+//
  /**
   * the device accelerometer reports values for each axis in units of g-force
   * @class Acceleration
   */
  export class Acceleration {
    /**
     * the device accelerometer reports values for each axis in units of g-force
     * @constructor
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     * @param {Number} timestamp
     */
    constructor(x: number, y: number, z: number, timestamp: number);
  }

  /**
   * Blend Function used for textures
   * @Class BlendFunc
   */
  export class BlendFunc {
    /**
     * Blend Function used for textures
     * @Constructor
     * @param {Number} src source blend function
     * @param {Number} dst destination blend function
     */
    constructor(src: number, dst: number);
  }

  /**
   * Color class, please use color() to construct a color
   * @class Color
   * @see color
   */
  export class Color {
    public r: number;
    public g: number;
    public b: number;
    public a: number;

    /**
     * Color class, please use color() to construct a color
     * @class Color
     * @param {Number} red
     * @param {Number} green
     * @param {Number} blue
     * @param {Number} alpha
     * @see color
     */
    constructor(red: number, green: number, blue: number, alpha: number);
  }

  enum TEXT_VERTICAL_ALIGNMENT {
    VERTICAL_TEXT_ALIGNMENT_TOP = 0,
    VERTICAL_TEXT_ALIGNMENT_CENTER = 1,
    VERTICAL_TEXT_ALIGNMENT_BOTTOM = 2
  }

  enum TEXT_ALIGNMENT {
    TEXT_ALIGNMENT_LEFT = 0,
    TEXT_ALIGNMENT_CENTER = 1,
    TEXT_ALIGNMENT_RIGHT = 2
  }

  export type TextVerticalAlign =
    | TEXT_VERTICAL_ALIGNMENT.VERTICAL_TEXT_ALIGNMENT_TOP
    | TEXT_VERTICAL_ALIGNMENT.VERTICAL_TEXT_ALIGNMENT_CENTER
    | TEXT_VERTICAL_ALIGNMENT.VERTICAL_TEXT_ALIGNMENT_BOTTOM;
  export type TextHorizontalAlign =
    | TEXT_ALIGNMENT.TEXT_ALIGNMENT_CENTER
    | TEXT_ALIGNMENT.TEXT_ALIGNMENT_LEFT
    | TEXT_ALIGNMENT.TEXT_ALIGNMENT_RIGHT;

  /**
   * TODO: Define type for properties arg in c'tor. Figure out what the structure for props is and make a class.
   * Common usage:
   *
   * var fontDef = new FontDefinition();
   * fontDef.fontName = "Arial";
   * fontDef.fontSize = 12;
   * ...
   *
   * OR using inline definition usefull for constructor injection
   *
   * var fontDef = new FontDefinition({
   *  fontName: "Arial",
   *  fontSize: 12
   * });
   *
   *
   *
   * @class FontDefinition
   */
  export class FontDefinition {
    public fontName: string;
    public fontSize: number;
    public textAlign: TextHorizontalAlign | TEXT_ALIGNMENT;
    public verticalAlign: TextVerticalAlign | TEXT_VERTICAL_ALIGNMENT;
    public fillStyle: Color;
    public boundingWidth: number;
    public boundingHeight: number;

    public strokeEnabled: boolean;
    public strokeStyle: Color;
    public lineWidth: number;
    //TODO make type
    public lineHeight: 'normal' | string;
    public fontStyle: 'normal' | string;
    public fontWeight: 'normal' | number;

    public shadowEnabled: boolean;
    public shadowOffsetX: number;
    public shadowOffsetY: number;
    public shadowBlur: number;
    public shadowOpacity: number;

    /**
     * TODO: Define type for properties arg in c'tor. Figure out what the structure for props is and make a class (or more likely, an interface).
     * @param {Object} properties - (OPTIONAL) Allow inline FontDefinition
     * @constructor
     */
    constructor(properties: any);
  }

  /**
   * @class Tex2F
   */
  export class Tex2F {
    /**
     * @constructor
     * @param {Number} u
     * @param {Number} v
     */
    constructor(u: number, v: number);
  }

  /**
   * @class Vertex2F
   */
  export class Vertex2F {
    /**
     * @constructor
     * @param {Number} x
     * @param {Number} y
     */
    constructor(x: number, y: number);
  }

  /**
   * @class Vertex3F
   */
  export class Vertex3F {
    /**
     * @constructor
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     */
    constructor(x: number, y: number, z: number);
  }

  ////////////////////////////////////////////////////////////////////////////////
  // File: cocos2d/core/platform/CCTypesWebGL.js
  ////////////////////////////////////////////////////////////////////////////////
  //    //redefine Vertex2F
  //    /**
  //     * @class Vertex2F
  //     * @param {Number} x
  //     * @param {Number}y
  //     * @param {Array} arrayBuffer
  //     * @param {Number}offset
  //     * @constructor
  //     */
  //    Vertex2F = function (x, y, arrayBuffer, offset) {
  //        this._arrayBuffer = arrayBuffer || new ArrayBuffer(Vertex2F.BYTES_PER_ELEMENT);
  //        this._offset = offset || 0;
  //
  //        this._xF32 = new Float32Array(this._arrayBuffer, this._offset, 1);
  //        this._yF32 = new Float32Array(this._arrayBuffer, this._offset + 4, 1);
  //        this._xF32[0] = x || 0;
  //        this._yF32[0] = y || 0;
  //    };
  //    /**
  //     * @constant
  //     * @type {number}
  //     */
  //    Vertex2F.BYTES_PER_ELEMENT = 8;
  //
  //    _p = Vertex2F.prototype;
  //    _p._getX = function () {
  //        return this._xF32[0];
  //    };
  //    _p._setX = function (xValue) {
  //        this._xF32[0] = xValue;
  //    };
  //    _p._getY = function () {
  //        return this._yF32[0];
  //    };
  //    _p._setY = function (yValue) {
  //        this._yF32[0] = yValue;
  //    };
  //    /** @expose */
  //    _p.x;
  //    defineGetterSetter(_p, "x", _p._getX, _p._setX);
  //    /** @expose */
  //    _p.y;
  //    defineGetterSetter(_p, "y", _p._getY, _p._setY);
  //
  //    // redefine Vertex3F
  //    /**
  //     * @class Vertex3F
  //     * @param {Number} x
  //     * @param {Number} y
  //     * @param {Number}z
  //     * @param {Array} arrayBuffer
  //     * @param {Number} offset
  //     * @constructor
  //     */
  //    Vertex3F = function (x, y, z, arrayBuffer, offset) {
  //        this._arrayBuffer = arrayBuffer || new ArrayBuffer(Vertex3F.BYTES_PER_ELEMENT);
  //        this._offset = offset || 0;
  //
  //        var locArrayBuffer = this._arrayBuffer, locOffset = this._offset;
  //        this._xF32 = new Float32Array(locArrayBuffer, locOffset, 1);
  //        this._xF32[0] = x || 0;
  //        this._yF32 = new Float32Array(locArrayBuffer, locOffset + Float32Array.BYTES_PER_ELEMENT, 1);
  //        this._yF32[0] = y || 0;
  //        this._zF32 = new Float32Array(locArrayBuffer, locOffset + Float32Array.BYTES_PER_ELEMENT * 2, 1);
  //        this._zF32[0] = z || 0;
  //    };
  //    /**
  //     * @constant
  //     * @type {number}
  //     */
  //    Vertex3F.BYTES_PER_ELEMENT = 12;
  //
  //    _p = Vertex3F.prototype;
  //    _p._getX = function () {
  //        return this._xF32[0];
  //    };
  //    _p._setX = function (xValue) {
  //        this._xF32[0] = xValue;
  //    };
  //    _p._getY = function () {
  //        return this._yF32[0];
  //    };
  //    _p._setY = function (yValue) {
  //        this._yF32[0] = yValue;
  //    };
  //    _p._getZ = function () {
  //        return this._zF32[0];
  //    };
  //    _p._setZ = function (zValue) {
  //        this._zF32[0] = zValue;
  //    };
  //    /** @expose */
  //    _p.x;
  //    defineGetterSetter(_p, "x", _p._getX, _p._setX);
  //    /** @expose */
  //    _p.y;
  //    defineGetterSetter(_p, "y", _p._getY, _p._setY);
  //    /** @expose */
  //    _p.z;
  //    defineGetterSetter(_p, "z", _p._getZ, _p._setZ);
  //
  //    // redefine Tex2F
  //    /**
  //     * @class Tex2F
  //     * @param {Number} u
  //     * @param {Number} v
  //     * @param {Array} arrayBuffer
  //     * @param {Number} offset
  //     * @constructor
  //     */
  //    Tex2F = function (u, v, arrayBuffer, offset) {
  //        this._arrayBuffer = arrayBuffer || new ArrayBuffer(Tex2F.BYTES_PER_ELEMENT);
  //        this._offset = offset || 0;
  //
  //        this._uF32 = new Float32Array(this._arrayBuffer, this._offset, 1);
  //        this._vF32 = new Float32Array(this._arrayBuffer, this._offset + 4, 1);
  //        this._uF32[0] = u || 0;
  //        this._vF32[0] = v || 0;
  //    };
  //    /**
  //     * @constants
  //     * @type {number}
  //     */
  //    Tex2F.BYTES_PER_ELEMENT = 8;
  //
  //    _p = Tex2F.prototype;
  //    _p._getU = function () {
  //        return this._uF32[0];
  //    };
  //    _p._setU = function (xValue) {
  //        this._uF32[0] = xValue;
  //    };
  //    _p._getV = function () {
  //        return this._vF32[0];
  //    };
  //    _p._setV = function (yValue) {
  //        this._vF32[0] = yValue;
  //    };
  //    /** @expose */
  //    _p.u;
  //    defineGetterSetter(_p, "u", _p._getU, _p._setU);
  //    /** @expose */
  //    _p.v;
  //    defineGetterSetter(_p, "v", _p._getV, _p._setV);

  //redefine Quad2
  /**
   * @class Quad2
   * @param {Vertex2F} tl
   * @param {Vertex2F} tr
   * @param {Vertex2F} bl
   * @param {Vertex2F} br
   * @param {Array} arrayBuffer
   * @param {Number} offset
   * @constructor
   */
  export class Quad2 {
    public static BYTES_PER_ELEMENT: number;

    public constructor(
      tl: Vertex2F,
      tr: Vertex2F,
      bl: Vertex2F,
      br: Vertex2F,
      arrayBuffer: Quad2[],
      offset: number
    );
  }

  /**
   * A 3D Quad. 4 * 3 floats
   * @Class Quad3
   * @Construct
   * @param {Vertex3F} bl1
   * @param {Vertex3F} br1
   * @param {Vertex3F} tl1
   * @param {Vertex3F} tr1
   */
  export class Quad3 {
    public constructor(bl1: Vertex3F, br1: Vertex3F, tl1: Vertex3F, tr1: Vertex3F);
  }

  //redefine V3F_C4B_T2F
  /**
   * @class V3F_C4B_T2F
   * @param {Vertex3F} vertices
   * @param { color} colors
   * @param {Tex2F} texCoords
   * @param {Array} arrayBuffer
   * @param {Number} offset
   * @constructor
   */
  export class V3F_C4B_T2F {
    public static BYTES_PER_ELEMENT: number;

    public constructor(
      vertices: Vertex3F,
      colors: Color,
      texCoords: Tex2F,
      arrayBuffer: V3F_C4B_T2F[],
      offset: number
    );
  }

  //redefine V3F_C4B_T2F_Quad
  /**
   * @class V3F_C4B_T2F_Quad
   * @param {V3F_C4B_T2F} tl
   * @param {V3F_C4B_T2F} bl
   * @param {V3F_C4B_T2F} tr
   * @param {V3F_C4B_T2F} br
   * @param {Array} arrayBuffer
   * @param {Number} offset
   * @constructor
   */
  export class V3F_C4B_T2F_Quad {
    public static BYTES_PER_ELEMENT: number;

    public constructor(
      tl: V3F_C4B_T2F,
      bl: V3F_C4B_T2F,
      tr: V3F_C4B_T2F,
      br: V3F_C4B_T2F,
      arrayBuffer: V3F_C4B_T2F[],
      offset: number
    );
  }

  /**
   * @function
   * @returns {V3F_C4B_T2F_Quad}
   */
  export function V3F_C4B_T2F_QuadZero(): V3F_C4B_T2F_Quad;

  /**
   * @function
   * @param {V3F_C4B_T2F_Quad} sourceQuad
   * @return {V3F_C4B_T2F_Quad}
   */
  export function V3F_C4B_T2F_QuadCopy(sourceQuad: V3F_C4B_T2F_Quad): V3F_C4B_T2F_Quad;

  /**
   * @function
   * @param {Array} sourceQuads
   * @returns {Array}
   */
  export function V3F_C4B_T2F_QuadsCopy(sourceQuads: V3F_C4B_T2F_Quad[]): V3F_C4B_T2F_Quad[];

  //redefine V2F_C4B_T2F
  /**
   * @class V2F_C4B_T2F
   * @param {Vertex2F} vertices
   * @param {color} colors
   * @param {Tex2F} texCoords
   * @param {Array} arrayBuffer
   * @param {Number} offset
   * @constructor
   */
  //V2F_C4B_T2F = function (vertices, colors, texCoords, arrayBuffer, offset) {
  export class V2F_C4B_T2F {
    public static BYTES_PER_ELEMENT: number;

    public constructor(
      vertices: Vertex2F,
      colors: Color,
      texCoords: Tex2F,
      arrayBuffer: V2F_C4B_T2F[],
      offset: number
    );
  }

  //redefine V2F_C4B_T2F_Triangle
  /**
   * @class V2F_C4B_T2F_Triangle
   * @param {V2F_C4B_T2F} a
   * @param {V2F_C4B_T2F} b
   * @param {V2F_C4B_T2F} c
   * @param {Array} arrayBuffer
   * @param {Number} offset
   * @constructor
   */
  export class V2F_C4B_T2F_Triangle {
    public static BYTES_PER_ELEMENT: number;

    public constructor(
      a: V2F_C4B_T2F,
      b: V2F_C4B_T2F,
      c: V2F_C4B_T2F,
      arrayBuffer: V2F_C4B_T2F_Triangle[],
      offset: number
    );
  }

  ////////////////////////////////////////////////////////////////////////////////
  // File: cocos2d/core/platform/CCEGLView.js
  ////////////////////////////////////////////////////////////////////////////////
  // TODO: Figure out where the fuck the View class is defined
  export interface View extends Class {}

  /**
   * @ignore
   */
  //Touches = [];
  //TouchesIntergerDict = {};

  export const DENSITYDPI_DEVICE: string;
  export const DENSITYDPI_HIGH: string;
  export const DENSITYDPI_MEDIUM: string;
  export const DENSITYDPI_LOW: string;

  /**
   * view is the singleton object which represents the game window.
   * It's main task include:
   *  - Apply the design resolution policy
   *  - Provide interaction with the window, like resize event on web, retina display support, etc...
   *  - Manage the game view port which can be different with the window
   *  - Manage the content scale and translation
   *
   * Since the view is a singleton, you don't need to call any constructor or create functions,
   * the standard way to use it is by calling:
   *  - view.methodName();
   * @class
   * @name view
   * @extend Class
   */
  export class EGLView extends Class implements View {
    /**
     * Constructor of EGLView
     */
    //ctor: function () {
    //public constructor();

    // Parent node that contains cc.container and cc._canvas
    // TODO remove next two items
    _frame: any;
    static _instance: EGLView;

    /**
     *
     * Sets view's target-densitydpi for android mobile browser. it can be set to:
     *   1. DENSITYDPI_DEVICE, value is "device-dpi"
     *   2. DENSITYDPI_HIGH, value is "high-dpi"  (default value)
     *   3. DENSITYDPI_MEDIUM, value is "medium-dpi" (browser's default value)
     *   4. DENSITYDPI_LOW, value is "low-dpi"
     *   5. Custom value, e.g: "480"
     *
     * @param {String} densityDPI
     */
    public setTargetDensityDPI(densityDPI: string): void;

    /**
     * Returns the current target-densitydpi value of view.
     * @returns {String}
     */
    public getTargetDensityDPI(): string;

    /**
     * Sets whether resize canvas automatically when browser's size changed.
     * Useful only on web.
     * @param {Boolean} enabled Whether enable automatic resize with browser's resize event
     */
    public resizeWithBrowserSize(enabled: boolean): void;

    /**
     * Sets the callback function for view's resize action,
     * this callback will be invoked before applying resolution policy,
     * so you can do any additional modifications within the callback.
     * Useful only on web.
     * @param {Function|null} callback The callback function
     */
    public setResizeCallback(callback?: () => void): void;

    // TODO: Shouldn't this return a boolean?!?
    public initialize(): void;

    /**
     * Sets whether the engine modify the "viewport" meta in your web page.
     * It's enabled by default, we strongly suggest you not to disable it.
     * And even when it's enabled, you can still set your own "viewport" meta, it won't be overridden
     * Only useful on web
     * @param {Boolean} enabled Enable automatic modification to "viewport" meta
     */
    public adjustViewPort(enabled: boolean): void;

    /**
     * Retina support is enabled by default for Apple device but disabled for other devices,
     * it takes effect only when you called setDesignResolutionPolicy
     * Only useful on web
     * @param {Boolean} enabled  Enable or disable retina display
     */
    public enableRetina(enabled: boolean): void;

    /**
     * Check whether retina display is enabled.
     * Only useful on web
     * @return {Boolean}
     */
    public isRetinaEnabled(): boolean;

    /**
     * If enabled, the application will try automatically to enter full screen mode on mobile devices
     * You can pass true as parameter to enable it and disable it by passing false.
     * Only useful on web
     * @param {Boolean} enabled  Enable or disable auto full screen on mobile devices
     */
    public enableAutoFullScreen(enabled: boolean): void;

    /**
     * Check whether auto full screen is enabled.
     * Only useful on web
     * @return {Boolean} Auto full screen enabled or not
     */
    public isAutoFullScreenEnabled(): boolean;

    /**
     *
     * TODO check if it exists
     * Force destroying EGL view, subclass must implement this method.
     */
    public end(): void;

    /**
     * Get whether render system is ready(no matter opengl or canvas),
     * this name is for the compatibility with cocos2d-x, subclass must implement this method.
     * @return {Boolean}
     */
    public isOpenGLReady(): boolean;

    /*
     * Set zoom factor for frame. This method is for debugging big resolution (e.g.new ipad) app on desktop.
     * @param {Number} zoomFactor
     */
    public setFrameZoomFactor(zoomFactor: number): void;

    /**
     * Exchanges the front and back buffers, subclass must implement this method.
     */
    public swapBuffers(): void;

    /**
     * Open or close IME keyboard , subclass must implement this method.
     * @param {Boolean} isOpen
     */
    public setIMEKeyboardState(isOpen: boolean): void;

    /**
     * Sets the resolution translate on EGLView
     * @param {Number} offsetLeft
     * @param {Number} offsetTop
     */
    public setContentTranslateLeftTop(offsetLeft: number, offsetTop: number): void;

    /**
     * Returns the resolution translate on EGLView
     * @return {Size|Object}
     */
    //public getContentTranslateLeftTop():any
    public getContentTranslateLeftTop(): Size;

    /**
     * Returns the canvas size of the view.
     * On native platforms, it returns the screen size since the view is a fullscreen view.
     * On web, it returns the size of the canvas element.
     * @return {Size}
     */
    public getCanvasSize(): Size;

    /**
     * Returns the frame size of the view.
     * On native platforms, it returns the screen size since the view is a fullscreen view.
     * On web, it returns the size of the canvas's outer DOM element.
     * @return {Size}
     */
    public getFrameSize(): Size;

    /**
     * On native, it sets the frame size of view.
     * On web, it sets the size of the canvas's outer DOM element.
     * @param {Number} width
     * @param {Number} height
     */
    public setFrameSize(width: number, height: number): void;

    /**
     * Returns the visible area size of the view port.
     * @return {Size}
     */
    public getVisibleSize(): Size;

    /**
     * Returns the visible area size of the view port.
     * @return {Size}
     */
    public getVisibleSizeInPixel(): Size;

    /**
     * Returns the visible origin of the view port.
     * @return {Point}
     */
    public getVisibleOrigin(): Point;

    /**
     * Returns the visible origin of the view port.
     * @return {Point}
     */
    public getVisibleOriginInPixel(): Point;

    /**
     * Returns whether developer can set content's scale factor.
     * @return {Boolean}
     */
    public canSetContentScaleFactor(): boolean;

    /**
     * Returns the current resolution policy
     * @see ResolutionPolicy
     * @return {ResolutionPolicy}
     */
    public getResolutionPolicy(): ResolutionPolicy;

    /**
     * Sets the current resolution policy
     * @see ResolutionPolicy
     * @param {ResolutionPolicy|Number} resolutionPolicy
     */
    public setResolutionPolicy(resolutionPolicy: number | ResolutionPolicy): void;

    /**
     * Sets the resolution policy with designed view size in points.
     * The resolution policy include:
     * [1] ResolutionExactFit       Fill screen by stretch-to-fit: if the design resolution ratio of width to height is different from the screen resolution ratio, your game view will be stretched.
     * [2] ResolutionNoBorder       Full screen without black border: if the design resolution ratio of width to height is different from the screen resolution ratio, two areas of your game view will be cut.
     * [3] ResolutionShowAll        Full screen with black border: if the design resolution ratio of width to height is different from the screen resolution ratio, two black borders will be shown.
     * [4] ResolutionFixedHeight    Scale the content's height to screen's height and proportionally scale its width
     * [5] ResolutionFixedWidth     Scale the content's width to screen's width and proportionally scale its height
     * [ResolutionPolicy]        [Web only feature] Custom resolution policy, constructed by ResolutionPolicy
     * @param {Number} width Design resolution width.
     * @param {Number} height Design resolution height.
     * @param {ResolutionPolicy|Number} resolutionPolicy The resolution policy desired
     */
    public setDesignResolutionSize(
      width: number,
      height: number,
      resolutionPolicy: number | ResolutionPolicy
    ): void;

    /**
     * Returns the designed size for the view.
     * Default resolution size is the same as 'getFrameSize'.
     * @return {Size}
     */
    public getDesignResolutionSize(): Size;

    /**
     * Sets the document body to desired pixel resolution and fit the game content to it.
     * This function is very useful for adaptation in mobile browsers.
     * In some HD android devices, the resolution is very high, but its browser performance may not be very good.
     * In this case, enabling retina display is very costy and not suggested, and if retina is disabled, the image may be blurry.
     * But this API can be helpful to set a desired pixel resolution which is in between.
     * This API will do the following:
     *     1. Set viewport's width to the desired width in pixel
     *     2. Set body width to the exact pixel resolution
     *     3. The resolution policy will be reset with designed view size in points.
     * @param {Number} width Design resolution width.
     * @param {Number} height Design resolution height.
     * @param {ResolutionPolicy|Number} resolutionPolicy The resolution policy desired
     */
    public setRealPixelResolution(
      width: number,
      height: number,
      resolutionPolicy: number | ResolutionPolicy
    ): void;

    /**
     * Sets view port rectangle with points.
     * @param {Number} x
     * @param {Number} y
     * @param {Number} w width
     * @param {Number} h height
     */
    public setViewPortInPoints(x: number, y: number, w: number, h: number): void;

    /**
     * Sets Scissor rectangle with points.
     * @param {Number} x
     * @param {Number} y
     * @param {Number} w
     * @param {Number} h
     */
    public setScissorInPoints(x: number, y: number, w: number, h: number): void;

    /**
     * Returns whether GL_SCISSOR_TEST is enable
     * @return {Boolean}
     */
    public isScissorEnabled(): boolean;

    /**
     * Returns the current scissor rectangle
     * @return {Rect}
     */
    public getScissorRect(): Rect;

    /**
     * Sets the name of the view
     * @param {String} viewName
     */
    public setViewName(viewName: string): void;

    /**
     * Returns the name of the view
     * @return {String}
     */
    public getViewName(): string;

    /**
     * Returns the view port rectangle.
     * @return {Rect}
     */
    public getViewPortRect(): Rect;

    /**
     * Returns scale factor of the horizontal direction (X axis).
     * @return {Number}
     */
    public getScaleX(): number;

    /**
     * Returns scale factor of the vertical direction (Y axis).
     * @return {Number}
     */
    public getScaleY(): number;

    /**
     * Returns device pixel ratio for retina display.
     * @return {Number}
     */
    public getDevicePixelRatio(): number;

    /**
     * Returns the real location in view for a translation based on a related position
     * @param {Number} tx The X axis translation
     * @param {Number} ty The Y axis translation
     * @param {Object} relatedPos The related position object including "left", "top", "width", "height" informations
     * @return {Point}
     */
    // TODO: Figure out wtf this relatedPos object is
    public convertToLocationInView(tx: number, ty: number, relatedPos: any): Point;
  }

  /**
   * ContainerStrategy class is the root strategy class of container's scale strategy,
   * it controls the behavior of how to scale the container and _canvas object
   *
   * @class
   * @extends Class
   */
  export class ContainerStrategy extends Class {
    /**
     * Strategy that scale proportionally the container's size to frame's size
     */
    static PROPORTION_TO_FRAME: ContainerStrategy;

    /**
     * Strategy that makes the container's size equals to the frame's size
     */
    static EQUAL_TO_FRAME: ContainerStrategy;

    /**
     * Strategy that keeps the original container's size
     */
    static ORIGINAL_CONTAINER: ContainerStrategy;

    /**
     * Manipulation before appling the strategy
     * @param {view} view The target view
     */
    public preApply(view: View): void;

    /**
     * Function to apply this strategy
     * @param {view} view
     * @param {Size} designedResolution
     */
    public apply(view: View, designedResolution: Size): void;

    /**
     * Manipulation after applying the strategy
     * @param {view} view  The target view
     */
    public postApply(view: View): void;
  }

  /**
   * ContentStrategy class is the root strategy class of content's scale strategy,
   * it controls the behavior of how to scale the scene and setup the viewport for the game
   *
   * @class
   * @extends Class
   */
  export class ContentStrategy extends Class {
    /**
     * Strategy to scale the content's size to container's size, non proportional
     */
    static EXACT_FIT: ContentStrategy;

    /**
     * Strategy to scale the content's size proportionally to maximum size and keeps the whole content area to be visible
     */
    static SHOW_ALL: ContentStrategy;

    /**
     * Strategy to scale the content's size proportionally to fill the whole container area
     */
    static NO_BORDER: ContentStrategy;

    /**
     * Strategy to scale the content's height to container's height and proportionally scale its width
     */
    static FIXED_HEIGHT: ContentStrategy;

    /**
     * Strategy to scale the content's width to container's width and proportionally scale its height
     */
    static FIXED_WIDTH: ContentStrategy;

    /**
     * Manipulation before applying the strategy
     * @param {view} view The target view
     */
    public preApply(view: View): void;

    /**
     * Function to apply this strategy
     * The return value is {scale: [scaleX, scaleY], viewport: {Rect}},
     * The target view can then apply these value to itself, it's preferred not to modify directly its private variables
     * @param {view} view
     * @param {Size} designedResolution
     * @return {object} scaleAndViewportRect
     */
    // TODO: Figure out what return value is
    public apply(view: View, designedResolution: Size): any;

    /**
     * Manipulation after applying the strategy
     * @param {view} view The target view
     */
    public postApply(view: View): void;
  }

  // Container scale strategies
  /**
   * @class
   * @extends ContainerStrategy
   */
  export class EqualToFrame extends ContainerStrategy {
    public apply(view: View, designedResolution?: Size): void;
  }

  /**
   * @class
   * @extends ContainerStrategy
   */
  export class ProportionalToFrame extends ContainerStrategy {
    public apply(view: View, designedResolution: Size): void;
  }

  /**
   * @class
   * @extends EqualToFrame
   */
  export class EqualToWindow extends EqualToFrame {
    public preApply(view: View): void;

    public apply(view: View, designedResolution: Size): void;
  }

  /**
   * @class
   * @extends ProportionalToFrame
   */
  export class ProportionalToWindow extends ProportionalToFrame {
    public preApply(view: View): void;

    public apply(view: View, designedResolution: Size): void;
  }

  /**
   * @class
   * @extends ContainerStrategy
   */
  export class OriginalContainer extends ContainerStrategy {
    public apply(view: View, designedResolution: Size): void;
  }

  //// #NOT STABLE on Android# Alias: Strategy that makes the container's size equals to the window's size
  ////    ContainerStrategy.EQUAL_TO_WINDOW = new EqualToWindow();
  //// #NOT STABLE on Android# Alias: Strategy that scale proportionally the container's size to window's size
  ////    ContainerStrategy.PROPORTION_TO_WINDOW = new ProportionalToWindow();
  //// Alias: Strategy that makes the container's size equals to the frame's size
  //        ContainerStrategy.EQUAL_TO_FRAME = new EqualToFrame();
  //// Alias: Strategy that scale proportionally the container's size to frame's size
  //        ContainerStrategy.PROPORTION_TO_FRAME = new ProportionalToFrame();
  //// Alias: Strategy that keeps the original container's size
  //        ContainerStrategy.ORIGINAL_CONTAINER = new OriginalContainer();
  //

  // Content scale strategies
  export class ExactFit extends ContainerStrategy {
    public apply(view: View, designedResolution: Size): any;
  }

  export class ShowAll extends ContainerStrategy {
    public apply(view: View, designedResolution: Size): any;
  }

  export class NoBorder extends ContainerStrategy {
    public apply(view: View, designedResolution: Size): any;
  }

  export class FixedHeight extends ContainerStrategy {
    public apply(view: View, designedResolution: Size): any;

    public postApply(view: View): void;
  }

  export class FixedWidth extends ContainerStrategy {
    public apply(view: View, designedResolution: Size): any;

    public postApply(view: View): void;
  }

  //// Alias: Strategy to scale the content's size to container's size, non proportional
  //        ContentStrategy.EXACT_FIT = new ExactFit();
  //// Alias: Strategy to scale the content's size proportionally to maximum size and keeps the whole content area to be visible
  //        ContentStrategy.SHOW_ALL = new ShowAll();
  //// Alias: Strategy to scale the content's size proportionally to fill the whole container area
  //        ContentStrategy.NO_BORDER = new NoBorder();
  //// Alias: Strategy to scale the content's height to container's height and proportionally scale its width
  //        ContentStrategy.FIXED_HEIGHT = new FixedHeight();
  //// Alias: Strategy to scale the content's width to container's width and proportionally scale its height
  //        ContentStrategy.FIXED_WIDTH = new FixedWidth();
  //
  //    })();
  //
  /**
   * ResolutionPolicy class is the root strategy class of scale strategy,
   * its main task is to maintain the compatibility with Cocos2d-x
   *
   * @class
   * @extends Class
   * @param {ContainerStrategy} containerStg The container strategy
   * @param {ContentStrategy} contentStg The content strategy
   */
  export class ResolutionPolicy extends Class {
    /**
     * @memberOf ResolutionPolicy#
     * @name EXACT_FIT
     * @constant
     * @type Number
     * @static
     * The entire application is visible in the specified area without trying to preserve the original aspect ratio.
     * Distortion can occur, and the application may appear stretched or compressed.
     */
    public static EXACT_FIT: number;

    /**
     * @memberOf ResolutionPolicy#
     * @name NO_BORDER
     * @constant
     * @type Number
     * @static
     * The entire application fills the specified area, without distortion but possibly with some cropping,
     * while maintaining the original aspect ratio of the application.
     */
    public static NO_BORDER: number;

    /**
     * @memberOf ResolutionPolicy#
     * @name SHOW_ALL
     * @constant
     * @type Number
     * @static
     * The entire application is visible in the specified area without distortion while maintaining the original
     * aspect ratio of the application. Borders can appear on two sides of the application.
     */
    public static SHOW_ALL: number;

    /**
     * @memberOf ResolutionPolicy#
     * @name FIXED_HEIGHT
     * @constant
     * @type Number
     * @static
     * The application takes the height of the design resolution size and modifies the width of the internal
     * canvas so that it fits the aspect ratio of the device
     * no distortion will occur however you must make sure your application works on different
     * aspect ratios
     */
    public static FIXED_HEIGHT: number;

    /**
     * @memberOf ResolutionPolicy#
     * @name FIXED_WIDTH
     * @constant
     * @type Number
     * @static
     * The application takes the width of the design resolution size and modifies the height of the internal
     * canvas so that it fits the aspect ratio of the device
     * no distortion will occur however you must make sure your application works on different
     * aspect ratios
     */
    public static FIXED_WIDTH: number;

    /**
     * @memberOf ResolutionPolicy#
     * @name UNKNOWN
     * @constant
     * @type Number
     * @static
     * Unknow policy
     */
    public static UNKNOWN: number;

    /**
     * Constructor of ResolutionPolicy
     * @param {ContainerStrategy} containerStg
     * @param {ContentStrategy} contentStg
     */
    public constructor(containerStg: ContainerStrategy, contentStg: ContainerStrategy);

    /**
     * Manipulation before applying the resolution policy
     * @param {view} view The target view
     */
    public preApply(view: View): void;

    /**
     * Function to apply this resolution policy
     * The return value is {scale: [scaleX, scaleY], viewport: {Rect}},
     * The target view can then apply these value to itself, it's preferred not to modify directly its private variables
     * @param {view} view The target view
     * @param {Size} designedResolution The user defined design resolution
     * @return {object} An object contains the scale X/Y values and the viewport rect
     */
    /**
     * Function to apply this resolution policy
     * The return value is {scale: [scaleX, scaleY], viewport: {Rect}},
     * The target view can then apply these value to itself, it's preferred not to modify directly its private variables
     * @param {view} view The target view
     * @param {Size} designedResolution The user defined design resolution
     * @return {object} An object contains the scale X/Y values and the viewport rect
     */
    public apply(view: View, designedResolution: Size): ContainerStrategy;

    /**
     * Manipulation after appyling the strategy
     * @param {view} view The target view
     */
    public postApply(view: View): void;

    /**
     * Setup the container's scale strategy
     * @param {ContainerStrategy} containerStg
     */
    public setContainerStrategy(containerStg: ContainerStrategy): void;

    /**
     * Setup the content's scale strategy
     * @param {ContentStrategy} contentStg
     */
    public setContentStrategy(contentStg: ContainerStrategy): void;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // scenes
  ////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////
  // File: cocos2d/core/scenes/CCLoaderScene.js
  ////////////////////////////////////////////////////////////////////////////////
  /**
   * LoaderScene is a scene that you can load it when you loading files
   * LoaderScene can present thedownload progress
   * @class
   * @extends Scene
   * @example
   * var lc = new LoaderScene();
   */
  export class LoaderScene extends Scene {
    // static constructor
    /**
     * LoaderScene.preload can present a loaderScene with download progress.
     * when all the resource are downloaded it will invoke call function
     * @param resources
     * @param cb
     * @param target
     * @returns {LoaderScene|*}
     * @example
     * //Example
     * LoaderScene.preload(g_resources, function () {
                 director.runScene(new HelloWorldScene());
             }, this);
     */
    static preload(resources: any[], cb: (target: Class) => void, target: Class): LoaderScene;

    /**
     * init with resources
     * @param {Array} resources
     * @param {Function|String} cb
     * @param {Object} target
     */
    initWithResources(
      resources: any[],
      cb: (target: Class) => void | string,
      target: Class
    ): boolean;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // File: cocos2d/core/scenes/CCScene.js
  ////////////////////////////////////////////////////////////////////////////////
  /**
   * Scene is a subclass of Node that is used only as an abstract concept.
   *  Scene an Node are almost identical with the difference that Scene has it's
   * anchor point (by default) at the center of the screen.
   *
   * For the moment Scene has no other logic than that, but in future releases it might have
   * additional logic.
   *
   * It is a good practice to use and Scene as the parent of all your nodes.
   * @class
   * @extends Node
   * @example
   * var scene = new Scene();
   */
  export class Scene extends Node {}

  ////////////////////////////////////////////////////////////////////////////////
  // sprites
  ////////////////////////////////////////////////////////////////////////////////

  // NOTE:
  //  I ignored the following files in the sprites directory, I do not believe they alter Sprite's interface:
  //      - CCSpriteBatchNodeCanvas
  //      - CCSpriteBatchNodeWebGl
  //      - CCSpriteBatchNodeRenderCmd

  // +--------------------------------------------------------------------------------
  // + File: cocos2d/core/sprites/CCAnimation.js
  // +--------------------------------------------------------------------------------
  /**
   * <p>
   *    AnimationFrame
   *    A frame of the animation. It contains information like:
   *       - sprite frame name
   *       - # of delay units.
   *       - offset
   * </p>
   * @class
   * @extends Class
   * @param spriteFrame
   * @param delayUnits
   * @param userInfo
   * @returns {AnimationFrame}
   */
  export class AnimationFrame extends Class {
    public ctor(): void;
    public ctor(spriteFrame: SpriteFrame, delayUnits: number, userInfo: any): void;

    /**
     * Create a new animation frame and copy all contents into it
     * @returns {AnimationFrame}
     */
    public clone(): AnimationFrame;

    ///**
    // * Create a new animation frame and copy all contents into it
    // * @returns {AnimationFrame}
    // */
    //public copyWithZone(pZone:string):AnimationFrame;

    /**
     * Create a new animation frame and copy all contents into it
     * @returns {AnimationFrame}
     */
    public copy(): AnimationFrame;

    /**
     * initializes the animation frame with a spriteframe, number of delay units and a notification user info
     * @param {SpriteFrame} spriteFrame
     * @param {Number} delayUnits
     * @param {object} userInfo
     */
    public initWithSpriteFrame(
      spriteFrame: SpriteFrame,
      delayUnits: number,
      userInfo: any
    ): boolean;

    /**
     * Returns sprite frame to be used
     * @return {SpriteFrame}
     */
    public getSpriteFrame(): SpriteFrame;

    /**
     * Sets sprite frame to be used
     * @param {SpriteFrame} spriteFrame
     */
    public setSpriteFrame(spriteFrame: SpriteFrame): void;

    /**
     * Returns how many units of time the frame takes getter
     * @return {Number}
     */
    public getDelayUnits(): number;

    /**
     * Sets how many units of time the frame takes setter
     * @param delayUnits
     */
    public setDelayUnits(delayUnits: number): void;

    /**
     * Returns the user custom information
     * @return {object}
     */
    public getUserInfo(): any;

    /**
     * Sets the user custom information
     * @param {object} userInfo
     */
    public setUserInfo(userInfo: any): void;
  }

  /**
   * <p>
   *     A Animation object is used to perform animations on the Sprite objects.<br/>
   *     <br/>
   *      The Animation object contains SpriteFrame objects, and a possible delay between the frames. <br/>
   *      You can animate a Animation object by using the Animate action.
   * </p>
   * @class
   * @extends Class
   * @param {Array} frames
   * @param {Number} delay
   * @param {Number} [loops=1]
   *
   * @example
   * // 1. Creates an empty animation
   * var animation1 = new Animation();
   *
   * // 2. Create an animation with sprite frames, delay and loops.
   * var spriteFrames = [];
   * var frame = spriteFrameCache.getSpriteFrame("grossini_dance_01.png");
   * spriteFrames.push(frame);
   * var animation1 = new Animation(spriteFrames);
   * var animation2 = new Animation(spriteFrames, 0.2);
   * var animation2 = new Animation(spriteFrames, 0.2, 2);
   *
   * // 3. Create an animation with animation frames, delay and loops.
   * var animationFrames = [];
   * var frame =  new AnimationFrame();
   * animationFrames.push(frame);
   * var animation1 = new Animation(animationFrames);
   * var animation2 = new Animation(animationFrames, 0.2);
   * var animation3 = new Animation(animationFrames, 0.2, 2);
   *
   * //create an animate with this animation
   * var action = animate(animation1);
   *
   * //run animate
   * sprite.runAction(action);
   */
  export class Animation extends Class {
    constructor(frames: any[], delay?: number, loops?: number);

    /**
     * Creates an animation.
     * @param {Array} frames
     * @param {Number} delay
     * @param {Number} loops
     * @return {cc.Animation}
     * @example
     * //Creates an animation
     * var animation1 = cc.Animation.create();
     *
     * //Create an animation with sprite frames
     * var animFrames = [];
     * var frame = cache.getSpriteFrame("grossini_dance_01.png");
     * animFrames.push(frame);
     * var animation2 = cc.Animation.create(animFrames);
     *
     * //Create an animation with sprite frames and delay
     * var animation3 = cc.Animation.create(animFrames, 0.2);
     */
    static create(frames: AnimationFrame[], delay?: number, loops?: number): Animation;

    public ctor(): void;
    public ctor(frames: SpriteFrame[], delay: number, loops: number): void;

    /**
     * Returns the array of animation frames
     * @return {Array}
     */
    public getFrames(): SpriteFrame[];

    /**
     * Sets array of animation frames
     * @param {Array} frames
     */
    public setFrames(frames: SpriteFrame[]): void;

    /**
     * Adds a frame to a Animation, the frame will be added with one "delay unit".
     * @param {SpriteFrame} frame
     */
    public addSpriteFrame(frame: SpriteFrame): void;

    /**
     * Adds a frame with an image filename. Internally it will create a SpriteFrame and it will add it. The frame will be added with one "delay unit".
     * @param {String} fileName
     */
    public addSpriteFrameWithFile(fileName: string): void;

    /**
     * Adds a frame with a texture and a rect. Internally it will create a SpriteFrame and it will add it. The frame will be added with one "delay unit".
     * @param {Texture2D} texture
     * @param {Rect} rect
     */
    public addSpriteFrameWithTexture(texture: Texture2D, rect: Rect): void;

    /**
     * Initializes a Animation with AnimationFrame, do not call this method yourself, please pass parameters to constructor to initialize.
     * @param {Array} arrayOfAnimationFrames
     * @param {Number} delayPerUnit
     * @param {Number} [loops=1]
     */
    public initWithAnimationFrames(
      arrayOfAnimationFrames: AnimationFrame[],
      delayPerUnit: number,
      loops?: number
    ): boolean;

    /**
     * Clone the current animation
     * @return {Animation}
     */
    public clone(): Animation;

    ///**
    // * Clone the current animation
    // * @return {Animation}
    // */
    //copyWithZone:function (pZone) {
    //    var pCopy = new Animation();
    //    pCopy.initWithAnimationFrames(this._copyFrames(), this._delayPerUnit, this._loops);
    //    pCopy.setRestoreOriginalFrame(this._restoreOriginalFrame);
    //    return pCopy;
    //},

    /**
     * Clone the current animation
     * @returns {Animation}
     */
    public copy(): Animation;

    /**
     * Returns how many times the animation is going to loop. 0 means animation is not animated. 1, animation is executed one time, ...
     * @return {Number}
     */
    public getLoops(): number;

    /**
     * Sets how many times the animation is going to loop. 0 means animation is not animated. 1, animation is executed one time, ...
     * @param {Number} value
     */
    public setLoops(value: number): void;

    /**
     * Sets whether or not it shall restore the original frame when the animation finishes
     * @param {Boolean} restOrigFrame
     */
    public setRestoreOriginalFrame(restOrigFrame: boolean): void;

    /**
     * Returns whether or not it shall restore the original frame when the animation finishes
     * @return {Boolean}
     */
    public getRestoreOriginalFrame(): boolean;

    /**
     * Returns duration in seconds of the whole animation. It is the result of totalDelayUnits * delayPerUnit
     * @return {Number}
     */
    public getDuration(): number;

    /**
     * Returns delay in seconds of the "delay unit"
     * @return {Number}
     */
    public getDelayPerUnit(): number;

    /**
     * Sets delay in seconds of the "delay unit"
     * @param {Number} delayPerUnit
     */
    public setDelayPerUnit(delayPerUnit: number): void;

    /**
     * Returns total delay units of the Animation.
     * @return {Number}
     */
    public getTotalDelayUnits(): number;

    /**
     * Initializes a Animation with frames and a delay between frames, do not call this method yourself, please pass parameters to constructor to initialize.
     * @param {Array} frames
     * @param {Number} delay
     * @param {Number} [loops=1]
     */
    public initWithSpriteFrames(frames: SpriteFrame[], delay: number, loops?: number): boolean;

    /**
     * <p>Currently JavaScript Bindings (JSB), in some cases, needs to use retain and release. This is a bug in JSB,
     * and the ugly workaround is to use retain/release. So, these 2 methods were added to be compatible with JSB.
     * This is a hack, and should be removed once JSB fixes the retain/release bug<br/>
     * You will need to retain an object if you created an engine object and haven't added it into the scene graph during the same frame.<br/>
     * Otherwise, JSB's native autorelease pool will consider this object a useless one and release it directly,<br/>
     * when you want to use it later, a "Invalid Native Object" error will be raised.<br/>
     * The retain function can increase a reference count for the native object to avoid it being released,<br/>
     * you need to manually invoke release function when you think this object is no longer needed, otherwise, there will be memory learks.<br/>
     * retain and release function call should be paired in developer's game code.</p>
     * @function
     * @see Animation#release
     */
    public retain(): void;

    /**
     * <p>Currently JavaScript Bindings (JSB), in some cases, needs to use retain and release. This is a bug in JSB,
     * and the ugly workaround is to use retain/release. So, these 2 methods were added to be compatible with JSB.
     * This is a hack, and should be removed once JSB fixes the retain/release bug<br/>
     * You will need to retain an object if you created an engine object and haven't added it into the scene graph during the same frame.<br/>
     * Otherwise, JSB's native autorelease pool will consider this object a useless one and release it directly,<br/>
     * when you want to use it later, a "Invalid Native Object" error will be raised.<br/>
     * The retain function can increase a reference count for the native object to avoid it being released,<br/>
     * you need to manually invoke release function when you think this object is no longer needed, otherwise, there will be memory learks.<br/>
     * retain and release function call should be paired in developer's game code.</p>
     * @function
     * @see Animation#retain
     */
    public release(): void;
  }

  // +--------------------------------------------------------------------------------
  // + File: cocos2d/core/sprites/CCAnimationCache.js
  // +--------------------------------------------------------------------------------
  /**
   * <p>
   *     animationCache is a singleton object that manages the Animations.<br/>
   *     It saves in a cache the animations. You should use this class if you want to save your animations in a cache.<br/>
   * <br/>
   * example<br/>
   * animationCache.addAnimation(animation,"animation1");<br/>
   * </p>
   * @class
   * @name animationCache
   */
  export namespace animationCache {
    /**
     * Adds a Animation with a name.
     * @param {Animation} animation
     * @param {String} name
     */
    export function addAnimation(animation: Animation, name: string): void;

    /**
     * Deletes a Animation from the cache.
     * @param {String} name
     */
    export function removeAnimation(name: string): void;

    /**
     * <p>
     *     Returns a Animation that was previously added.<br/>
     *      If the name is not found it will return nil.<br/>
     *      You should retain the returned copy if you are going to use it.</br>
     * </p>
     * @param {String} name
     * @return {Animation}
     */
    export function getAnimation(name: string): Animation;

    /**
     * <p>
     *    Adds an animations from a plist file.<br/>
     *    Make sure that the frames were previously loaded in the SpriteFrameCache.
     * </p>
     * @param {String} plist
     */
    export function addAnimations(plist: string): void;
  }

  // +--------------------------------------------------------------------------------
  // + File: cocos2d/core/sprites/CCBakeSprite.js
  // +--------------------------------------------------------------------------------
  /****************************************************************************
   Copyright (c) 2013-2014 Chukong Technologies Inc.

   http://www.cocos2d-x.org

   Permission is hereby granted, free of charge, to any person obtaining a copy
   of _t software and associated documentation files (the "Software"), to deal
   in the Software without restriction, including without limitation the rights
   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   copies of the Software, and to permit persons to whom the Software is
   furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in
   all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   THE SOFTWARE.
   ****************************************************************************/

  /**
   * BakeSprite is a type of sprite that will be cached.
   * @class
   * @extend Sprite
   */
  export class BakeSprite extends Sprite {
    public ctor(): void;

    // TODO: Figure out (and define if necessary) the proper return types for these methods
    //public getCacheContext():CanvasContextWrapper;
    //public getCacheCanvas():???;

    /**
     * reset the cache canvas size
     * @param {Size|Number} sizeOrWidth  size or width
     * @param {Number} [height]
     */
    public resetCanvasSize(sizeOrWidth: Size | number, height?: number): void;
  }

  // +--------------------------------------------------------------------------------
  // + File: cocos2d/core/sprites/CCSprite.js
  // +--------------------------------------------------------------------------------

  /**
   * Sprite is a 2d image ( http://en.wikipedia.org/wiki/Sprite_(computer_graphics) )
   *
   * Sprite can be created with an image, or with a sub-rectangle of an image.
   *
   * If the parent or any of its ancestors is a SpriteBatchNode then the following features/limitations are valid
   *    - Features when the parent is a BatchNode:
   *        - MUCH faster rendering, specially if the SpriteBatchNode has many children. All the children will be drawn in a single batch.
   *
   *    - Limitations
   *        - Camera is not supported yet (eg: CCOrbitCamera action doesn't work)
   *        - GridBase actions are not supported (eg: CCLens, CCRipple, CCTwirl)
   *        - The Alias/Antialias property belongs to CCSpriteBatchNode, so you can't individually set the aliased property.
   *        - The Blending function property belongs to CCSpriteBatchNode, so you can't individually set the blending function property.
   *        - Parallax scroller is not supported, but can be simulated with a "proxy" sprite.
   *
   *  If the parent is an standard Node, then Sprite behaves like any other Node:
   *    - It supports blending functions
   *    - It supports aliasing / antialiasing
   *    - But the rendering will be slower: 1 draw per children.
   *
   * The default anchorPoint in Sprite is (0.5, 0.5).
   * @class
   * @extends Node
   *
   * @param {String|SpriteFrame|HTMLImageElement|Texture2D} fileName  The string which indicates a path to image file, e.g., "scene1/monster.png".
   * @param {Rect} rect  Only the contents inside rect of pszFileName's texture will be applied for this sprite.
   * @param {Boolean} [rotated] Whether or not the texture rectangle is rotated.
   * @example
   *
   * 1.Create a sprite with image path and rect
   * var sprite1 = new Sprite("res/HelloHTML5World.png");
   * var sprite2 = new Sprite("res/HelloHTML5World.png",rect(0,0,480,320));
   *
   * 2.Create a sprite with a sprite frame name. Must add "#" before frame name.
   * var sprite = new Sprite('#grossini_dance_01.png');
   *
   * 3.Create a sprite with a sprite frame
   * var spriteFrame = spriteFrameCache.getSpriteFrame("grossini_dance_01.png");
   * var sprite = new Sprite(spriteFrame);
   *
   * 4.Create a sprite with an existing texture contained in a CCTexture2D object
   *      After creation, the rect will be the size of the texture, and the offset will be (0,0).
   * var texture = textureCache.addImage("HelloHTML5World.png");
   * var sprite1 = new Sprite(texture);
   * var sprite2 = new Sprite(texture, rect(0,0,480,320));
   *
   * @property {Boolean}              dirty               - Indicates whether the sprite needs to be updated.
   * @property {Boolean}              flippedX            - Indicates whether or not the sprite is flipped on x axis.
   * @property {Boolean}              flippedY            - Indicates whether or not the sprite is flipped on y axis.
   * @property {Number}               offsetX             - <@readonly> The offset position on x axis of the sprite in texture. Calculated automatically by editors like Zwoptex.
   * @property {Number}               offsetY             - <@readonly> The offset position on x axis of the sprite in texture. Calculated automatically by editors like Zwoptex.
   * @property {Number}               atlasIndex          - The index used on the TextureAtlas.
   * @property {Texture2D}         texture             - Texture used to render the sprite.
   * @property {Boolean}              textureRectRotated  - <@readonly> Indicate whether the texture rectangle is rotated.
   * @property {TextureAtlas}      textureAtlas        - The weak reference of the TextureAtlas when the sprite is rendered using via SpriteBatchNode.
   * @property {SpriteBatchNode}   batchNode           - The batch node object if this sprite is rendered by SpriteBatchNode.
   * @property {V3F_C4B_T2F_Quad}  quad                - <@readonly> The quad (tex coords, vertex coords and color) information.
   */
  export class Sprite extends Node {
    public dirty: boolean;
    public flippedX: boolean;
    public flippedY: boolean;
    public offsetX: number;
    public offsetY: number;
    public atlasIndex: number;
    public texture: Texture2D;
    public textureRectRotated: boolean;
    public textureAtlas: TextureAtlas;
    public batchNode: SpriteBatchNode;
    public quad: V3F_C4B_T2F_Quad;

    /**
     * Sprite invalid index on the SpriteBatchNode
     * @constant
     * @type {Number}
     */
    public static INDEX_NOT_INITIALIZED: number;

    public constructor(fileName: string, rect?: Rect, rotated?: boolean);

    static create(fileName: string, rect?: Rect): Sprite;

    /**
     * Returns whether the texture have been loaded
     * @returns {boolean}
     */
    public textureLoaded(): boolean;

    /**
     * Add a event listener for texture loaded event.
     * @param {Function} callback
     * @param {Object} target
     * @deprecated since 3.1, please use addEventListener instead
     */

    /**
     * Returns whether or not the Sprite needs to be updated in the Atlas
     * @return {Boolean} True if the sprite needs to be updated in the Atlas, false otherwise.
     */
    public isDirty(): boolean;

    /**
     * Makes the sprite to be updated in the Atlas.
     * @param {Boolean} bDirty
     */
    public setDirty(bDirty: boolean): void;

    /**
     * Returns whether or not the texture rectangle is rotated.
     * @return {Boolean}
     */
    public isTextureRectRotated(): boolean;

    /**
     * Returns the index used on the TextureAtlas.
     * @return {Number}
     */
    public getAtlasIndex(): number;

    /**
     * Sets the index used on the TextureAtlas.
     * @warning Don't modify this value unless you know what you are doing
     * @param {Number} atlasIndex
     */
    public setAtlasIndex(atlasIndex: number): void;

    /**
     * Returns the rect of the Sprite in points
     * @return {Rect}
     */
    public getTextureRect(): Rect;

    /**
     * Returns the weak reference of the TextureAtlas when the sprite is rendered using via SpriteBatchNode
     * @return {TextureAtlas}
     */
    public getTextureAtlas(): TextureAtlas;

    /**
     * Sets the weak reference of the TextureAtlas when the sprite is rendered using via SpriteBatchNode
     * @param {TextureAtlas} textureAtlas
     */
    public setTextureAtlas(textureAtlas: TextureAtlas): void;

    /**
     * Returns the offset position of the sprite. Calculated automatically by editors like Zwoptex.
     * @return {Point}
     */
    public getOffsetPosition(): Point;

    /**
     * Returns the blend function
     * @return {BlendFunc}
     */
    public getBlendFunc(): BlendFunc;

    /**
     * Initializes a sprite with a SpriteFrame. The texture and rect in SpriteFrame will be applied on this sprite.
     * Please pass parameters to the constructor to initialize the sprite, do not call this function yourself,
     * @param {SpriteFrame} spriteFrame A CCSpriteFrame object. It should includes a valid texture and a rect
     * @return {Boolean}  true if the sprite is initialized properly, false otherwise.
     */
    public initWithSpriteFrame(spriteFrame: SpriteFrame): boolean;

    /**
     * Initializes a sprite with a sprite frame name.
     * A SpriteFrame will be fetched from the SpriteFrameCache by name.
     * If the SpriteFrame doesn't exist it will raise an exception.
     * Please pass parameters to the constructor to initialize the sprite, do not call this function yourself.
     * @param {String} spriteFrameName A key string that can fected a valid SpriteFrame from SpriteFrameCache
     * @return {Boolean} true if the sprite is initialized properly, false otherwise.
     * @example
     * var sprite = new Sprite();
     * sprite.initWithSpriteFrameName("grossini_dance_01.png");
     */
    public initWithSpriteFrameName(spriteFrameName: string): boolean;

    /**
     * Tell the sprite to use batch node render.
     * @param {SpriteBatchNode} batchNode
     */
    public useBatchNode(batchNode: SpriteBatchNode): boolean;

    /**
     *
     *    set the vertex rect.
     *    It will be called internally by setTextureRect.
     *    Useful if you want to create 2x images from SD images in Retina Display.
     *    Do not call it manually. Use setTextureRect instead.
     *    (override this method to generate "double scale" sprites)
     *
     * @param {Rect} rect
     */
    public setVertexRect(rect: Rect): void;

    /**
     * Sets whether the sprite should be flipped horizontally or not.
     * @param {Boolean} flippedX true if the sprite should be flipped horizontally, false otherwise.
     */
    public setFlippedX(flippedX: boolean): void;

    /**
     * Sets whether the sprite should be flipped vertically or not.
     * @param {Boolean} flippedY true if the sprite should be flipped vertically, false otherwise.
     */
    public setFlippedY(flippedY: boolean): void;

    /**
     *
     * Returns the flag which indicates whether the sprite is flipped horizontally or not.
     *
     * It only flips the texture of the sprite, and not the texture of the sprite's children.
     * Also, flipping the texture doesn't alter the anchorPoint.
     * If you want to flip the anchorPoint too, and/or to flip the children too use:
     *      sprite.setScaleX(sprite.getScaleX() * -1);
     * @return {Boolean} true if the sprite is flipped horizontally, false otherwise.
     */
    public isFlippedX(): boolean;

    /**
     *
     *     Return the flag which indicates whether the sprite is flipped vertically or not.
     *
     *      It only flips the texture of the sprite, and not the texture of the sprite's children.
     *      Also, flipping the texture doesn't alter the anchorPoint.
     *      If you want to flip the anchorPoint too, and/or to flip the children too use:
     *         sprite.setScaleY(sprite.getScaleY() * -1);
     * @return {Boolean} true if the sprite is flipped vertically, false otherwise.
     */
    public isFlippedY(): boolean;

    // Animation

    /**
     * Changes the display frame with animation name and index.
     * The animation name will be get from the CCAnimationCache
     * @param {String} animationName
     * @param {Number} frameIndex
     */
    public setDisplayFrameWithAnimationName(animationName: string, frameIndex: number): void;

    /**
     * Returns the batch node object if this sprite is rendered by SpriteBatchNode
     * @returns {SpriteBatchNode|null} The SpriteBatchNode object if this sprite is rendered by SpriteBatchNode, null if the sprite isn't used batch node.
     */
    public getBatchNode(): SpriteBatchNode;

    // CCTextureProtocol
    /**
     * Returns the texture of the sprite node
     * @returns {Texture2D}
     */
    public getTexture(): Texture2D;

    /**
     * Returns the quad (tex coords, vertex coords and color) information.
     * @return {V3F_C4B_T2F_Quad|null} Returns a V3F_C4B_T2F_Quad object when render mode is WebGL, returns null when render mode is Canvas.
     */
    public getQuad(): V3F_C4B_T2F_Quad;

    /**
     * conforms to TextureProtocol protocol
     * @function
     * @param {Number|BlendFunc} src
     * @param {Number} dst
     */
    public setBlendFunc(src: BlendFunc | number, dst?: number): void;

    /**
     *
     *     Initializes a sprite with an image filename.
     *
     *     This method will find pszFilename from local file system, load its content to CCTexture2D,
     *     then use CCTexture2D to create a sprite.
     *     After initialization, the rect used will be the size of the image. The offset will be (0,0).
     *     Please pass parameters to the constructor to initialize the sprite, do not call this function yourself.
     *
     * @param {String} filename The path to an image file in local file system
     * @param {Rect} rect The rectangle assigned the content area from texture.
     * @return {Boolean} true if the sprite is initialized properly, false otherwise.
     */
    public initWithFile(filename: string, rect: Rect): boolean;

    /**
     * Initializes a sprite with a texture and a rect in points, optionally rotated.
     * After initialization, the rect used will be the size of the texture, and the offset will be (0,0).
     * Please pass parameters to the constructor to initialize the sprite, do not call this function yourself.
     * @function
     * @param {Texture2D|HTMLImageElement|HTMLCanvasElement} texture A pointer to an existing CCTexture2D object. You can use a CCTexture2D object for many sprites.
     * @param {Rect} [rect] Only the contents inside rect of this texture will be applied for this sprite.
     * @param {Boolean} [rotated] Whether or not the texture rectangle is rotated.
     * @param {Boolean} [counterclockwise=true] Whether or not the texture rectangle rotation is counterclockwise (texture package is counterclockwise, spine is clockwise).
     * @return {Boolean} true if the sprite is initialized properly, false otherwise.
     */
    public initWithTexture(
      texture: HTMLCanvasElement,
      rect?: Rect,
      rotated?: boolean,
      counterclockwise?: boolean
    ): boolean;
    public initWithTexture(
      texture: HTMLImageElement,
      rect?: Rect,
      rotated?: boolean,
      counterclockwise?: boolean
    ): boolean;
    public initWithTexture(
      texture: Texture2D,
      rect?: Rect,
      rotated?: boolean,
      counterclockwise?: boolean
    ): boolean;

    /**
     * Updates the texture rect of the CCSprite in points.
     * @function
     * @param {Rect} rect a rect of texture
     * @param {Boolean} [rotated] Whether or not the texture is rotated
     * @param {Size} [untrimmedSize] The original pixels size of the texture
     * @param {Boolean} [needConvert] contentScaleFactor switch
     */
    public setTextureRect(
      rect: Rect,
      rotated?: boolean,
      untrimmedSize?: Size,
      needConvert?: boolean
    ): boolean;

    // Frames
    /**
     * Sets a new sprite frame to the sprite.
     * @function
     * @param {SpriteFrame|String} newFrame
     */
    public setSpriteFrame(newFrame: string | SpriteFrame): void;

    /**
     * Sets a new display frame to the sprite.
     * @param {SpriteFrame|String} newFrame
     * @deprecated
     */
    public setDisplayFrame(newFrame: string | SpriteFrame): SpriteFrame;

    /**
     * Returns whether or not a SpriteFrame is being displayed
     * @function
     * @param {SpriteFrame} frame
     * @return {Boolean}
     */
    public isFrameDisplayed(frame: SpriteFrame): boolean;

    /**
     * Returns the current displayed frame.
     * @return {SpriteFrame}
     */
    public getSpriteFrame(): SpriteFrame;

    /**
     * Sets the batch node to sprite
     * @function
     * @param {SpriteBatchNode|null} spriteBatchNode
     * @example
     *  var batch = new SpriteBatchNode("Images/grossini_dance_atlas.png", 15);
     *  var sprite = new Sprite(batch.texture, rect(0, 0, 57, 57));
     *  batch.addChild(sprite);
     *  layer.addChild(batch);
     */
    public setBatchNode(spriteBatchNode?: SpriteBatchNode): void;

    // CCTextureProtocol
    /**
     * Sets the texture of sprite
     * @function
     * @param {Texture2D|String} texture
     */
    public setTexture(texture: string | Texture2D): void;

    // apply by EventHelper

    public addEventListener(type: string, listener: (...args) => {}, target: any);

    public hasEventListener(type: string, listener: (...args) => {}, target: any);

    public removeEventListener(type: string, listener: (...args) => {}, target: any);

    public dispatchEvent(event: string, clearAfterDispatch?: boolean);
  }

  // +--------------------------------------------------------------------------------
  // + File: cocos2d/core/sprites/CCSpriteBatchNode.js
  // +--------------------------------------------------------------------------------

  /**
   *
   *     A SpriteBatchNode can reference one and only one texture (one image file, one texture atlas).
   *     Only the Sprites that are contained in that texture can be added to the SpriteBatchNode.
   *     All Sprites added to a SpriteBatchNode are drawn in one WebGL draw call.
   *     If the Sprites are not added to a SpriteBatchNode then an WebGL draw call will be needed for each one, which is less efficient.
   *
   *     Limitations:
   *       - The only object that is accepted as child (or grandchild, grand-grandchild, etc...) is Sprite or any subclass of Sprite.
   *          eg: particles, labels and layer can't be added to a SpriteBatchNode.
   *       - Either all its children are Aliased or Antialiased. It can't be a mix.
   *          This is because "alias" is a property of the texture, and all the sprites share the same texture.
   *
   * @class
   * @extends Node
   *
   * @param {String|Texture2D} fileImage
   * @param {Number} capacity
   * @example
   *
   * // 1. create a SpriteBatchNode with image path
   * var spriteBatchNode = new SpriteBatchNode("res/animations/grossini.png", 50);
   *
   * // 2. create a SpriteBatchNode with texture
   * var texture = textureCache.addImage("res/animations/grossini.png");
   * var spriteBatchNode = new SpriteBatchNode(texture,50);
   *
   * @property {TextureAtlas}  textureAtlas    - The texture atlas
   * @property {Array}            descendants     - <@readonly> Descendants of sprite batch node
   */
  export class SpriteBatchNode extends Node {
    /**
     * @constant
     * @type Number
     */
    public static DEFAULT_CAPACITY: number;
    public texture: Texture2D;
    public textureAtlas: TextureAtlas;

    public ctor(fileImage?: string | Texture2D, capacity?: number): void;

    /**
     *
     *    This is the opposite of "addQuadFromSprite.
     *    It add the sprite to the children and descendants array, but it doesn't update add it to the texture atlas
     *
     * @param {Sprite} child
     * @param {Number} z zOrder
     * @param {Number} aTag
     * @return {SpriteBatchNode}
     */
    public addSpriteWithoutQuad(child: Sprite, z: number, aTag: number): SpriteBatchNode;

    // property
    /**
     * Return TextureAtlas of SpriteBatchNode
     * @return {TextureAtlas}
     */
    public getTextureAtlas(): TextureAtlas;

    /**
     * TextureAtlas of SpriteBatchNode setter
     * @param {TextureAtlas} textureAtlas
     */
    public setTextureAtlas(textureAtlas: TextureAtlas): void;

    /**
     * Return Descendants of SpriteBatchNode
     * @return {Array}
     */
    public getDescendants(): Sprite[];

    /**
     *
     *    Initializes a SpriteBatchNode with a file image (.png, .jpeg, .pvr, etc) and a capacity of children.
     *    The capacity will be increased in 33% in runtime if it run out of space.
     *    The file will be loaded using the TextureMgr.
     *    Please pass parameters to constructor to initialize the sprite batch node, do not call this function yourself.
     *
     * @param {String} fileImage
     * @param {Number} capacity
     * @return {Boolean}
     */
    public initWithFile(fileImage: string, capacity: number): boolean;

    /**
     *
     *    initializes a SpriteBatchNode with a file image (.png, .jpeg, .pvr, etc) and a capacity of children.
     *    The capacity will be increased in 33% in runtime if it run out of space.
     *    The file will be loaded using the TextureMgr.
     *    Please pass parameters to constructor to initialize the sprite batch node, do not call this function yourself.
     *
     *    NOTE: Parameters are optional so that Node::init() can be properly overridden.
     *
     * @param {String} [fileImage]
     * @param {Number} [capacity]
     * @return {Boolean}
     */
    init(fileImage?: string, capacity?: number): boolean;

    /**
     * Increase Atlas Capacity
     */
    public increaseAtlasCapacity(): void;

    /**
     * Removes a child given a certain index. It will also cleanup the running actions depending on the cleanup parameter.
     * @warning Removing a child from a SpriteBatchNode is very slow
     * @param {Number} index
     * @param {Boolean} doCleanup
     */
    public removeChildAtIndex(index: number, doCleanup?: boolean): void;

    /**
     * Rebuild index in order for child
     * @param {Sprite} pobParent
     * @param {Number} index
     * @return {Number}
     */
    public rebuildIndexInOrder(pobParent: Sprite, index: number): number;

    /**
     * Returns highest atlas index in child
     * @param {Sprite} sprite
     * @return {Number}
     */
    public highestAtlasIndexInChild(sprite: Sprite): number;

    /**
     * Returns lowest atlas index in child
     * @param {Sprite} sprite
     * @return {Number}
     */
    public lowestAtlasIndexInChild(sprite: Sprite): number;

    /**
     * Returns atlas index for child
     * @param {Sprite} sprite
     * @param {Number} nZ
     * @return {Number}
     */
    public atlasIndexForChild(sprite: Sprite, nZ: number): number;

    /**
     * Sprites use this to start sortChildren, don't call this manually
     * @param {Boolean} reorder
     */
    public reorderBatch(reorder: boolean): void;

    /**
     * Sets the source and destination blending function for the texture
     * @param {Number | BlendFunc} src
     * @param {Number} dst
     */
    public setBlendFunc(src: BlendFunc | number, dst?: number): void;

    /**
     * Returns the blending function used for the texture
     * @return {BlendFunc}
     */
    public getBlendFunc(): BlendFunc;

    ///**
    // * Reorder children (override reorderChild of Node)
    // * @override
    // * @param {Sprite} child
    // * @param {Number} zOrder
    // */
    //public reorderChild(child:Node, zOrder:number):void;
    //
    ///**
    // * Removes a child from SpriteBatchNode (override removeChild of Node)
    // * @param {Sprite} child
    // * @param {Boolean} cleanup
    // */
    //public removeChild(child:Node, cleanup?:boolean):void;
    ////public removeChild(child:Sprite, cleanup?:boolean):void;

    /**
     *
     *   Updates a quad at a certain index into the texture atlas. The CCSprite won't be added into the children array.
     *   This method should be called only when you are dealing with very big AtlasSrite and when most of the Sprite won't be updated.
     *   For example: a tile map (TMXMap) or a label with lots of characters (BitmapFontAtlas)
     *
     * @function
     * @param {Sprite} sprite
     * @param {Number} index
     */
    public updateQuadFromSprite(sprite: Sprite, index: number): void;

    /**
     *
     *    Inserts a quad at a certain index into the texture atlas. The Sprite won't be added into the children array.
     *    This method should be called only when you are dealing with very big AtlasSprite and when most of the Sprite won't be updated.
     *    For example: a tile map (TMXMap) or a label with lots of characters (LabelBMFont)
     *
     * @function
     * @param {Sprite} sprite
     * @param {Number} index
     */
    public insertQuadFromSprite(sprite: Sprite, index: number): void;

    /**
     *
     *    Initializes a SpriteBatchNode with a texture2d and capacity of children.
     *    The capacity will be increased in 33% in runtime if it run out of space.
     *    Please pass parameters to constructor to initialize the sprite batch node, do not call this function yourself.
     *
     * @function
     * @param {Texture2D} tex
     * @param {Number} [capacity]
     * @return {Boolean}
     */
    public initWithTexture(tex: Texture2D, capacity?: number): boolean;

    /**
     * Insert a child
     * @param {Sprite} sprite The child sprite
     * @param {Number} index The insert index
     */
    public insertChild(sprite: Sprite, index: number): void;

    /**
     * Add child at the end, faster than insert child
     * @function
     * @param {Sprite} sprite
     */
    public appendChild(sprite: Sprite): void;

    /**
     * Removes sprite from TextureAtlas
     * @function
     * @param {Sprite} sprite
     */
    public removeSpriteFromAtlas(sprite: Sprite): void;

    // CCTextureProtocol
    /**
     * Returns texture of the sprite batch node
     * @function
     * @return {Texture2D}
     */
    public getTexture(): Texture2D;

    /**
     * Sets the texture of the sprite batch node.
     * @function
     * @param {Texture2D} texture
     */
    public setTexture(texture: Texture2D): void;
  }

  // +--------------------------------------------------------------------------------
  // + File: cocos2d/core/sprites/CCSpriteFrame.js
  // +--------------------------------------------------------------------------------
  /**
   *
   *    A SpriteFrame has:
   *      - texture: A Texture2D that will be used by the Sprite
   *      - rectangle: A rectangle of the texture
   *
   *    You can modify the frame of a Sprite by doing:
   *
   * @class
   * @extends Class
   *
   * @param {String|Texture2D} filename
   * @param {Rect} rect If parameters' length equal 2, rect in points, else rect in pixels
   * @param {Boolean} [rotated] Whether the frame is rotated in the texture
   * @param {Point} [offset] The offset of the frame in the texture
   * @param {Size} [originalSize] The size of the frame in the texture
   *
   * @example
   * // 1. Create a SpriteFrame with image path
   * var frame1 = new SpriteFrame("res/grossini_dance.png",rect(0,0,90,128));
   * var frame2 = new SpriteFrame("res/grossini_dance.png",rect(0,0,90,128),false,0,size(90,128));
   *
   * // 2. Create a SpriteFrame with a texture, rect, rotated, offset and originalSize in pixels.
   * var texture = textureCache.addImage("res/grossini_dance.png");
   * var frame1 = new SpriteFrame(texture, rect(0,0,90,128));
   * var frame2 = new SpriteFrame(texture, rect(0,0,90,128),false,0,size(90,128));
   */
  export class SpriteFrame {
    public constructor(
      filename: string | Texture2D,
      rect: Rect,
      rotated: boolean,
      offset: Point,
      originalSize: Size
    );

    /**
     * Returns whether the texture have been loaded
     * @returns {boolean}
     */
    public textureLoaded(): boolean;

    /**
     * Gets the rect of the frame in the texture
     * @return {Rect}
     */
    public getRectInPixels(): Rect;

    /**
     * Sets the rect of the frame in the texture
     * @param {Rect} rectInPixels
     */
    public setRectInPixels(rectInPixels: Rect): void;

    /**
     * Returns whether the sprite frame is rotated in the texture.
     * @return {Boolean}
     */
    public isRotated(): boolean;

    /**
     * Set whether the sprite frame is rotated in the texture.
     * @param {Boolean} bRotated
     */
    public setRotated(bRotated: boolean): void;

    /**
     * Returns the rect of the sprite frame in the texture
     * @return {Rect}
     */
    public getRect(): Rect;

    /**
     * Sets the rect of the sprite frame in the texture
     * @param {Rect} rect
     */
    public setRect(rect: Rect): void;

    /**
     * Returns the offset of the sprite frame in the texture in pixel
     * @return {Point}
     */
    public getOffsetInPixels(): Point;

    /**
     * Sets the offset of the sprite frame in the texture in pixel
     * @param {Point} offsetInPixels
     */
    public setOffsetInPixels(offsetInPixels: Point): void;

    /**
     * Returns the original size of the trimmed image
     * @return {Size}
     */
    public getOriginalSizeInPixels(): Size;

    /**
     * Sets the original size of the trimmed image
     * @param {Size} sizeInPixels
     */
    public setOriginalSizeInPixels(sizeInPixels: Size): void;

    /**
     * Returns the original size of the trimmed image
     * @return {Size}
     */
    public getOriginalSize(): Size;

    /**
     * Sets the original size of the trimmed image
     * @param {Size} sizeInPixels
     */
    public setOriginalSize(sizeInPixels: Size): void;

    /**
     * Returns the texture of the frame
     * @return {Texture2D}
     */
    public getTexture(): Texture2D;

    /**
     * Sets the texture of the frame, the texture is retained automatically
     * @param {Texture2D} texture
     */
    public setTexture(texture: Texture2D): void;

    /**
     * Returns the offset of the frame in the texture
     * @return {Point}
     */
    public getOffset(): Point;

    /**
     * Sets the offset of the frame in the texture
     * @param {Point} offset
     */
    public setOffset(offset: Point): void;

    /**
     * Clone the sprite frame
     * @returns {SpriteFrame}
     */
    public clone: SpriteFrame;

    ///**
    // * TODO: Figure out if this is even needed, it seems like some strange Obj-C artifact that shouldn't exist
    // *       in the cocos2d-js codebase (or cocos2d-x C++ either, for that matter).
    // * Copy the sprite frame
    // * @return {SpriteFrame}
    // */
    //public copyWithZone():SpriteFrame;
    //
    ///**
    // * Copy the sprite frame
    // * @returns {SpriteFrame}
    // */
    //public copy():SpriteFrame;

    /**
     * Initializes SpriteFrame with Texture, rect, rotated, offset and originalSize in pixels.
     * Please pass parameters to the constructor to initialize the sprite, do not call this function yourself.
     * @param {String|Texture2D} texture
     * @param {Rect} rect if parameters' length equal 2, rect in points, else rect in pixels
     * @param {Boolean} [rotated=false]
     * @param {Point} [offset=p(0,0)]
     * @param {Size} [originalSize=rect.size]
     * @return {Boolean}
     */
    //initWithTexture:function (texture, rect, rotated, offset, originalSize) {
    public initWithTexture(
      texture: string | Texture2D,
      rect: Rect,
      rotated: boolean,
      offset: Point,
      originalSize: Size
    ): boolean;

    // apply by EventHelper

    public addEventListener(type: string, listener: (...args) => {}, target: any);

    public hasEventListener(type: string, listener: (...args) => {}, target: any);

    public removeEventListener(type: string, listener: (...args) => {}, target: any);

    public dispatchEvent(event: string, clearAfterDispatch?: boolean);
  }

  // +--------------------------------------------------------------------------------
  // + File: cocos2d/core/sprites/CCSpriteFrameCache.js
  // +--------------------------------------------------------------------------------
  /**
   *
   * spriteFrameCache is a singleton that handles the loading of the sprite frames. It saves in a cache the sprite frames.
   *
   * example
   * // add SpriteFrames to spriteFrameCache With File
   * spriteFrameCache.addSpriteFrames(s_grossiniPlist);
   *
   * @class
   * @name spriteFrameCache
   */
  //export namespace spriteFrameCache = /** @lends spriteFrameCache# */{
  export namespace spriteFrameCache {
    /**
     *
     *   Adds multiple Sprite Frames from a plist or json file.
     *   A texture will be loaded automatically. The texture name will composed by replacing the .plist or .json suffix with .png
     *   If you want to use another texture, you should use the addSpriteFrames:texture method.
     *
     * @param {String} url file path
     * @param {HTMLImageElement|Texture2D|string} texture
     * @example
     * // add SpriteFrames to SpriteFrameCache With File
     * spriteFrameCache.addSpriteFrames(s_grossiniPlist);
     * spriteFrameCache.addSpriteFrames(s_grossiniJson);
     */
    export function addSpriteFrames(
      url: string,
      texture?: HTMLImageElement | Texture2D | string
    ): void;

    /**
     *
     *  Adds an sprite frame with a given name.
     *  If the name already exists, then the contents of the old name will be replaced with the new one.
     *
     * @param {SpriteFrame} frame
     * @param {String} frameName
     */
    export function addSpriteFrame(frame: SpriteFrame, frameName: string): void;

    /**
     *
     *   Purges the dictionary of loaded sprite frames.
     *   Call this method if you receive the "Memory Warning".
     *   In the short term: it will free some resources preventing your app from being killed.
     *   In the medium term: it will allocate more resources.
     *   In the long term: it will be the same.
     *
     */
    export function removeSpriteFrames(): void;

    /**
     * Deletes an sprite frame from the sprite frame cache.
     * @param {String} name
     */
    export function removeSpriteFrameByName(name: string): void;

    /**
     *
     *     Removes multiple Sprite Frames from a plist file.
     *     Sprite Frames stored in this file will be removed.
     *     It is convinient to call this method when a specific texture needs to be removed.
     *
     * @param {String} url Plist filename
     */
    export function removeSpriteFramesFromFile(url: string): void;

    /**
     *
     *    Removes all Sprite Frames associated with the specified textures.
     *    It is convenient to call this method when a specific texture needs to be removed.
     *
     * @param {HTMLImageElement|HTMLCanvasElement|Texture2D} texture
     */
    export function removeSpriteFramesFromTexture(
      texture: HTMLImageElement | HTMLCanvasElement | Texture2D
    ): void;

    /**
     *
     *   Returns an Sprite Frame that was previously added.
     *   If the name is not found it will return nil.
     *   You should retain the returned copy if you are going to use it.
     *
     * @param {String} name name of SpriteFrame
     * @return {SpriteFrame}
     * @example
     * //get a SpriteFrame by name
     * var frame = spriteFrameCache.getSpriteFrame("grossini_dance_01.png");
     */
    export function getSpriteFrame(name: string): SpriteFrame;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // support
  ////////////////////////////////////////////////////////////////////////////////

  // +--------------------  CCPointExtension.js  --------------------+
  /**
   * Point extensions based on Chipmunk's cpVect file.
   * These extensions work both with Point
   *
   * The "ccp" prefix means: "CoCos2d Point"
   *
   *  //Examples:
   * - pAdd( p(1,1), p(2,2) ); // preferred cocos2d way
   * - pAdd( p(1,1), p(2,2) ); // also ok but more verbose
   * - pAdd( cpv(1,1), cpv(2,2) ); // mixing chipmunk and cocos2d (avoid)
   */

  /**
   * smallest such that 1.0+FLT_EPSILON != 1.0
   * @constant
   * @type Number
   */
  const POINT_EPSILON: number;

  /**
   * Returns opposite of point.
   * @param {Point} point
   * @return {Point}
   */
  export function pNeg(point: Point): Point;

  /**
   * Calculates sum of two points.
   * @param {Point} v1
   * @param {Point} v2
   * @return {Point}
   */
  export function pAdd(v1: Point, v2: Point): Point;

  /**
   * Calculates difference of two points.
   * @param {Point} v1
   * @param {Point} v2
   * @return {Point}
   */
  //pSub = function (v1, v2) {
  //    return p(v1.x - v2.x, v1.y - v2.y);
  //};
  export function pSub(v1: Point, v2: Point): Point;

  /**
   * Returns point multiplied by given factor.
   * @param {Point} point
   * @param {Number} factor
   * @return {Point}
   */
  //pMult = function (point, floatVar) {
  //    return p(point.x * floatVar, point.y * floatVar);
  //};
  export function pMult(point: Point, factor: number): Point;

  /**
   * Calculates midpoint between two points.
   * @param {Point} v1
   * @param {Point} v2
   * @return {Point}
   */
  //pMidpoint = function (v1, v2) {
  //    return pMult(pAdd(v1, v2), 0.5);
  //};
  export function pMidpoint(v1: Point, v2: Point): Point;

  /**
   * Calculates dot product of two points.
   * @param {Point} v1
   * @param {Point} v2
   * @return {Number}
   */
  //pDot = function (v1, v2) {
  //    return v1.x * v2.x + v1.y * v2.y;
  //};
  export function pDot(v1: Point, v2: Point): number;

  /**
   * Calculates cross product of two points.
   * @param {Point} v1
   * @param {Point} v2
   * @return {Number}
   */
  //pCross = function (v1, v2) {
  //    return v1.x * v2.y - v1.y * v2.x;
  //};
  export function pCross(v1: Point, v2: Point): number;

  /**
   * Calculates perpendicular of v, rotated 90 degrees counter-clockwise -- cross(v, perp(v)) >= 0
   * @param {Point} point
   * @return {Point}
   */
  //pPerp = function (point) {
  //    return p(-point.y, point.x);
  //};
  export function pPerp(point: Point): Point;

  /**
   * Calculates perpendicular of v, rotated 90 degrees clockwise -- cross(v, rperp(v)) <= 0
   * @param {Point} point
   * @return {Point}
   */
  //pRPerp = function (point) {
  //    return p(point.y, -point.x);
  //};
  export function pRPerp(point: Point): Point;

  /**
   * Calculates the projection of v1 over v2.
   * @param {Point} v1
   * @param {Point} v2
   * @return {pMult}
   */
  //pProject = function (v1, v2) {
  //    return pMult(v2, pDot(v1, v2) / pDot(v2, v2));
  //};
  export function pProject(v1: Point, v2: Point): Point;

  /**
   * Rotates two points.
   * @param  {Point} v1
   * @param  {Point} v2
   * @return {Point}
   */
  //pRotate = function (v1, v2) {
  //    return p(v1.x * v2.x - v1.y * v2.y, v1.x * v2.y + v1.y * v2.x);
  //};
  export function pRotate(v1: Point, v2: Point): Point;

  /**
   * Unrotates two points.
   * @param  {Point} v1
   * @param  {Point} v2
   * @return {Point}
   */
  //pUnrotate = function (v1, v2) {
  //    return p(v1.x * v2.x + v1.y * v2.y, v1.y * v2.x - v1.x * v2.y);
  //};
  export function pUnrotate(v1: Point, v2: Point): Point;

  /**
   * Calculates the square length of a Point (not calling sqrt() )
   * @param  {Point} point
   *@return {number}
   */
  //pLengthSQ = function (v) {
  //    return pDot(v, v);
  //};
  export function pLengthSQ(point: Point): number;

  /**
   * Calculates the square distance between two points (not calling sqrt() )
   * @param {Point} point1
   * @param {Point} point2
   * @return {number}
   */
  //pDistanceSQ = function (point1, point2) {
  //    return pLengthSQ(pSub(point1, point2));
  //};
  export function pDistanceSQ(point1: Point, point2: Point): number;

  /**
   * Calculates distance between point an origin
   * @param  {Point} point
   * @return {number}
   */
  //pLength = function (v) {
  //    return Math.sqrt(pLengthSQ(v));
  //};
  export function pLength(point: Point): number;

  /**
   * Calculates the distance between two points
   * @param {Point} point1
   * @param {Point} point2
   * @return {Number}
   */
  //pDistance = function (v1, v2) {
  //    return pLength(pSub(v1, v2));
  //};
  export function pDistance(point1: Point, point2: Point): number;

  /**
   * Returns point multiplied to a length of 1.
   * @param {Point} point
   * @return {Point}
   */
  //pNormalize = function (v) {
  //    var n = pLength(v);
  //    return n === 0 ? p(v) : pMult(v, 1.0 / n);
  //};
  export function pNormalize(point: Point): Point;

  /**
   * Converts radians to a normalized vector.
   * @param {Number} radians
   * @return {Point}
   */
  //pForAngle = function (a) {
  //    return p(Math.cos(a), Math.sin(a));
  //};
  export function pForAngle(radians: number): Point;

  /**
   * Converts a vector to radians.
   * @param {Point} point
   * @return {number}
   */
  //pToAngle = function (v) {
  //    return Math.atan2(v.y, v.x);
  //};
  export function pToAngle(point: Point): number;

  /**
   * Clamp a value between from and to.
   * @param {number} value
   * @param {number} min_inclusive
   * @param {number} max_inclusive
   * @return {number}
   */
  //clampf = function (value, min_inclusive, max_inclusive) {
  //    if (min_inclusive > max_inclusive) {
  //        var temp = min_inclusive;
  //        min_inclusive = max_inclusive;
  //        max_inclusive = temp;
  //    }
  //    return value < min_inclusive ? min_inclusive : value < max_inclusive ? value : max_inclusive;
  //};
  export function clampf(value: number, min_inclusive: number, max_inclusive: number): number;

  /**
   * Clamp a point between from and to.
   * @param {Point} point
   * @param {Point} min_inclusive
   * @param {Point} max_inclusive
   * @return {Point}
   */
  //pClamp = function (p, min_inclusive, max_inclusive) {
  //    return p(clampf(p.x, min_inclusive.x, max_inclusive.x), clampf(p.y, min_inclusive.y, max_inclusive.y));
  //};
  export function pClamp(point: Point, min_inclusive: Point, max_inclusive: Point): Point;

  /**
   * Quickly convert Size to a Point
   * @param {Size} size
   * @return {Point}
   */
  //pFromSize = function (s) {
  //    return p(s.width, s.height);
  //};
  export function pFromSize(size: Size): Point;

  /**
   * Run a math operation function on each point component
   * Math.abs, Math.floor, Math.ceil, Math.round.
   * @param {Point} point
   * @param {Function} opFunc
   * @return {Point}
   * @example
   * //For example: let's try to take the floor of x,y
   * var p = pCompOp(p(10,10),Math.abs);
   */
  //pCompOp = function (p, opFunc) {
  //    return p(opFunc(p.x), opFunc(p.y));
  //};
  export function pCompOp(point: Point, opFunc: (arg: number) => number): Point;

  /**
   * Linear Interpolation between two points a and b
   * alpha == 0 ? a
   * alpha == 1 ? b
   * otherwise a value between a..b
   * @param {Point} point1
   * @param {Point} point2
   * @param {number} alpha
   * @return {Point}
   */
  //pLerp = function (a, b, alpha) {
  //    return pAdd(pMult(a, 1 - alpha), pMult(b, alpha));
  //};
  export function pLerp(point1: Point, point2: Point, alpha: number): Point;

  /**
   * @param {Point} point1
   * @param {Point} point2
   * @param {number} variance
   * @return {boolean} if points have fuzzy equality which means equal with some degree of variance.
   */
  //pFuzzyEqual = function (a, b, variance) {
  //    if (a.x - variance <= b.x && b.x <= a.x + variance) {
  //        if (a.y - variance <= b.y && b.y <= a.y + variance)
  //            return true;
  //    }
  //    return false;
  //};
  export function pFuzzyEqual(point1: Point, point2: Point, variance: number): boolean;

  /**
   * Multiplies a and b components, a.x*b.x, a.y*b.y
   * @param {Point} point1
   * @param {Point} point2
   * @return {Point}
   */
  //pCompMult = function (a, b) {
  //    return p(a.x * b.x, a.y * b.y);
  //};
  export function pCompMult(point1: Point, point2: Point): Point;

  /**
   * @param {Point} point1
   * @param {Point} point2
   * @return {number} the signed angle in radians between two vector directions
   */
  //pAngleSigned = function (a, b) {
  //    var a2 = pNormalize(a);
  //    var b2 = pNormalize(b);
  //    var angle = Math.atan2(a2.x * b2.y - a2.y * b2.x, pDot(a2, b2));
  //    if (Math.abs(angle) < POINT_EPSILON)
  //        return 0.0;
  //    return angle;
  //};
  export function pAngleSigned(point1: Point, point2: Point): number;

  /**
   * @param {Point} point1
   * @param {Point} point2
   * @return {Number} the angle in radians between two vector directions
   */
  //pAngle = function (a, b) {
  //    var angle = Math.acos(pDot(pNormalize(a), pNormalize(b)));
  //    if (Math.abs(angle) < POINT_EPSILON) return 0.0;
  //    return angle;
  //};
  export function pAngle(point1: Point, point2: Point): number;

  /**
   * Rotates a point counter clockwise by the angle around a pivot
   * @param {Point} point point is the point to rotate
   * @param {Point} pivot pivot is the pivot, naturally
   * @param {number} radians angle is the angle of rotation cw in radians
   * @return {Point} the rotated point
   */
  //pRotateByAngle = function (v, pivot, angle) {
  //    var r = pSub(v, pivot);
  //    var cosa = Math.cos(angle), sina = Math.sin(angle);
  //    var t = r.x;
  //    r.x = t * cosa - r.y * sina + pivot.x;
  //    r.y = t * sina + r.y * cosa + pivot.y;
  //    return r;
  //};
  export function pRotateByAngle(point: Point, pivot: Point, radians: number): Point;

  /**
   * A general line-line intersection test
   * indicating successful intersection of a line
   * note that to truly test intersection for segments we have to make
   * sure that s & t lie within [0..1] and for rays, make sure s & t > 0
   * the hit point is        p3 + t * (p4 - p3);
   * the hit point also is    p1 + s * (p2 - p1);
   * @param {Point} a a is the startpoint for the first line P1 = (p1 - p2).
   * @param {Point} b b is the endpoint for the first line P1 = (p1 - p2).
   * @param {Point} c c is the startpoint for the second line P2 = (p3 - p4).
   * @param {Point} d d is the endpoint for the second line P2 = (p3 - p4).
   * @param {Point} retP retP.x is the range for a hitpoint in P1 (pa = p1 + s*(p2 - p1)),
   * retP.y is the range for a hitpoint in P3 (pa = p2 + t*(p4 - p3)).
   * @return {boolean}
   */
  //pLineIntersect = function (A, B, C, D, retP) {
  //    if ((A.x === B.x && A.y === B.y) || (C.x === D.x && C.y === D.y)) {
  //        return false;
  //    }
  //    var BAx = B.x - A.x;
  //    var BAy = B.y - A.y;
  //    var DCx = D.x - C.x;
  //    var DCy = D.y - C.y;
  //    var ACx = A.x - C.x;
  //    var ACy = A.y - C.y;
  //
  //    var denom = DCy * BAx - DCx * BAy;
  //
  //    retP.x = DCx * ACy - DCy * ACx;
  //    retP.y = BAx * ACy - BAy * ACx;
  //
  //    if (denom === 0) {
  //        if (retP.x === 0 || retP.y === 0) {
  //            // Lines incident
  //            return true;
  //        }
  //        // Lines parallel and not incident
  //        return false;
  //    }
  //
  //    retP.x = retP.x / denom;
  //    retP.y = retP.y / denom;
  //
  //    return true;
  //};
  export function pLineIntersect(a: Point, b: Point, c: Point, d: Point, retP: Point): boolean;

  /**
   * ccpSegmentIntersect return YES if Segment A-B intersects with segment C-D.
   * @param {Point} a
   * @param {Point} b
   * @param {Point} c
   * @param {Point} d
   * @return {Boolean}
   */
  //pSegmentIntersect = function (A, B, C, D) {
  //    var retP = p(0, 0);
  //    if (pLineIntersect(A, B, C, D, retP))
  //        if (retP.x >= 0.0 && retP.x <= 1.0 && retP.y >= 0.0 && retP.y <= 1.0)
  //            return true;
  //    return false;
  //};
  export function pSegmentIntersect(a: Point, b: Point, c: Point, d: Point): boolean;

  /**
   * ccpIntersectPoint return the intersection point of line A-B, C-D
   * @param {Point} a
   * @param {Point} b
   * @param {Point} c
   * @param {Point} d
   * @return {Point}
   */
  //pIntersectPoint = function (A, B, C, D) {
  //    var retP = p(0, 0);
  //
  //    if (pLineIntersect(A, B, C, D, retP)) {
  //        // Point of intersection
  //        var P = p(0, 0);
  //        P.x = A.x + retP.x * (B.x - A.x);
  //        P.y = A.y + retP.x * (B.y - A.y);
  //        return P;
  //    }
  //
  //    return p(0, 0);
  //};
  export function pIntersectPoint(a: Point, b: Point, c: Point, d: Point): Point;

  /**
   * check to see if both points are equal
   * @param {Point} a a ccp a
   * @param {Point} b b ccp b to be compared
   * @return {boolean} the true if both ccp are same
   */
  //pSameAs = function (A, B) {
  //    if ((A != null) && (B != null)) {
  //        return (A.x === B.x && A.y === B.y);
  //    }
  //    return false;
  //};
  export function pIntersectPoint(a: Point, b: Point): boolean;

  // High Perfomance In Place Operationrs ---------------------------------------

  /**
   * sets the position of the point to 0
   * @param {Point} point
   */
  //pZeroIn = function (v) {
  //    v.x = 0;
  //    v.y = 0;
  //};
  export function pZeroIn(point: Point): void;

  /**
   * copies the position of one point to another
   * @param {Point} point1
   * @param {Point} point2
   */
  //pIn = function (v1, v2) {
  //    v1.x = v2.x;
  //    v1.y = v2.y;
  //};
  export function pIn(point1: Point, point2: Point): void;

  /**
   * multiplies the point with the given factor (inplace)
   * @param {Point} point
   * @param {Number} factor
   */
  //pMultIn = function (point, floatVar) {
  //    point.x *= floatVar;
  //    point.y *= floatVar;
  //};
  export function pMultIn(point: Point, factor: number): void;

  /**
   * subtracts one point from another (inplace)
   * @param {Point} point1
   * @param {Point} point2
   */
  //pSubIn = function (v1, v2) {
  //    v1.x -= v2.x;
  //    v1.y -= v2.y;
  //};
  export function pSubIn(point1: Point, point2: Point): void;

  /**
   * adds one point to another (inplace)
   * @param {Point} point1
   * @param {Point} point2
   */
  //pAddIn = function (v1, v2) {
  //    v1.x += v2.x;
  //    v1.y += v2.y;
  //};
  export function pAddIn(point1: Point, point2: Point): void;

  /**
   * normalizes the point (inplace)
   * @param {Point} point
   */
  //pNormalizeIn = function (v) {
  //    pMultIn(v, 1.0 / Math.sqrt(v.x * v.x + v.y * v.y));
  //};
  export function pNormalizeIn(point: Point): void;

  ////////////////////////////////////////////////////////////////////////////////
  // TextureCache
  ////////////////////////////////////////////////////////////////////////////////

  /**
   * textureCache is a singleton object, it's the global cache for Texture2D
   */
  export const textureCache: TextureCache;

  /**
   * textureCache is a singleton object, it's the global cache for Texture2D
   * @class
   * @name textureCache
   */
  export class TextureCache extends Class {
    constructor();

    init(): boolean;

    /**
     * Cache the image data
     * @param path
     * @param texture
     */
    cacheImage(path: string, texture: Image | HTMLImageElement | HTMLCanvasElement): void;

    /** Returns "<TextureCache | Number of textures = " + this._textures.length + ">"
     * @return string
     */
    description(): string;

    /**
     * Output to log the current contents of this TextureCache
     * This will attempt to calculate the size of each texture, and the total texture memory in use.
     */
    dumpCachedTextureInfo(): void;

    /**
     * @param texture
     * @example
     * //var key = textureCache.getKeyByTexture(texture);
     */
    getKeyByTexture(texture: Image): String | null;

    /**
     * Returns an already created texture. Returns null if the texture doesn't exist.
     * @param textureKeyName
     */
    getTextureForKey(textureKeyName: string): Texture2D | null;

    /**
     * Purges the dictionary of loaded textures.
     * Call this method if you receive the "Memory Warning"
     * In the short term: it will free some resources preventing your app from being killed
     * In the medium term: it will allocate more resources
     * In the long term: it will be the same
     */
    removeAllTextures(): void;

    /**
     * Deletes a texture from the cache given a texture
     * @param texture
     */
    removeTexture(texture: Image): void;

    /**
     * Deletes a texture from the cache given a its key name
     * @param textureKeyName
     * @example
     * `textureCache.removeTexture("hello.png");`
     */
    removeTextureForKey(textureKeyName: string): void;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // Texture
  ////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////
  // File: cocos2d/core/sprites/CCTexture2D.js
  ////////////////////////////////////////////////////////////////////////////////
  //CONSTANTS:

  /**
   * Horizontal center and vertical center.
   * @constant
   * @type Number
   */
  const ALIGN_CENTER: number;

  /**
   * Horizontal center and vertical top.
   * @constant
   * @type Number
   */
  const ALIGN_TOP: number;

  /**
   * Horizontal right and vertical top.
   * @constant
   * @type Number
   */
  const ALIGN_TOP_RIGHT: number;

  /**
   * Horizontal right and vertical center.
   * @constant
   * @type Number
   */
  const ALIGN_RIGHT: number;

  /**
   * Horizontal right and vertical bottom.
   * @constant
   * @type Number
   */
  const ALIGN_BOTTOM_RIGHT: number;

  /**
   * Horizontal center and vertical bottom.
   * @constant
   * @type Number
   */
  const ALIGN_BOTTOM: number;

  /**
   * Horizontal left and vertical bottom.
   * @constant
   * @type Number
   */
  const ALIGN_BOTTOM_LEFT: number;

  /**
   * Horizontal left and vertical center.
   * @constant
   * @type Number
   */
  const ALIGN_LEFT: number;

  /**
   * Horizontal left and vertical top.
   * @constant
   * @type Number
   */
  const ALIGN_TOP_LEFT: number;
  //----------------------Possible texture pixel formats----------------------------

  // By default PVR images are treated as if they don't have the alpha channel premultiplied
  const PVRHaveAlphaPremultiplied_: boolean;

  //Texture2DWebGL move to TextureWebGL.js

  /**
   *
   * This class allows to easily create OpenGL or Canvas 2D textures from images, text or raw data.
   * The created Texture2D object will always have power-of-two dimensions.
   * Depending on how you create the Texture2D object, the actual image area of the texture might be smaller than the texture dimensions
   *  i.e. "contentSize" != (pixelsWide, pixelsHigh) and (maxS, maxT) != (1.0, 1.0).
   * Be aware that the content of the generated textures will be upside-down!
   * @name Texture2D
   * @class
   * @extends Class
   *
   * @property {WebGLTexture}     name            - <@readonly> WebGLTexture Object
   * @property {Number}           pixelFormat     - <@readonly> Pixel format of the texture
   * @property {Number}           pixelsWidth     - <@readonly> Width in pixels
   * @property {Number}           pixelsHeight    - <@readonly> Height in pixels
   * @property {Number}           width           - Content width in points
   * @property {Number}           height          - Content height in points
   * @property {GLProgram}     shaderProgram   - The shader program used by drawAtPoint and drawInRect
   * @property {Number}           maxS            - Texture max S
   * @property {Number}           maxT            - Texture max T
   */

  export class Texture2D extends Class {
    public isLoaded(): boolean;

    public readonly name: WebGLTexture; //- <@readonly> WebGLTexture Object
    public readonly pixelFormat: number; //- <@readonly> Pixel format of the texture
    public readonly pixelsWidth: number; //- <@readonly> Width in pixels
    public readonly pixelsHeight: number; //- <@readonly> Height in pixels
    public width: number; //- Content width in points
    public height: number; //- Content height in points
    public shaderProgram: Function; //GLProgram - The shader program used by drawAtPoint and drawInRect
    public maxS: number; //- Texture max S
    public maxT: number; //- Texture max T

    // apply by EventHelper
    public addEventListener(type: string, listener: (...args) => {}, target: any);

    public hasEventListener(type: string, listener: (...args) => {}, target: any);

    public removeEventListener(type: string, listener: (...args) => {}, target: any);

    public dispatchEvent(event: string, clearAfterDispatch?: boolean);
  }

  ////////////////////////////////////////////////////////////////////////////////
  // File: cocos2d/core/textures/CCTextureAtlas.js
  ////////////////////////////////////////////////////////////////////////////////
  /**
   * A class that implements a Texture Atlas.
   * Supported features:
   * The atlas file can be a PNG, JPG.
   * Quads can be updated in runtime
   * Quads can be added in runtime
   * Quads can be removed in runtime
   * Quads can be re-ordered in runtime
   * The TextureAtlas capacity can be increased or decreased in runtime.
   * @class
   * @extends Class
   *
   * @property {Boolean}  dirty           - Indicates whether or not the array buffer of the VBO needs to be updated.
   * @property {Image}    texture         - Image texture for TextureAtlas.
   * @property {Number}   capacity        - <@readonly> Quantity of quads that can be stored with the current texture atlas size.
   * @property {Number}   totalQuads      - <@readonly> Quantity of quads that are going to be drawn.
   * @property {Array}    quads           - <@readonly> Quads that are going to be rendered
   */
  //TextureAtlas = Class.extend(/** @lends TextureAtlas# */{  //WebGL only
  export class TextureAtlas extends Class {
    //public get totalQuads(): number;
    //public get capacity(): number;
    //public get quads(): V3F_C4B_T2F_Quad[];
    //public set quads(quads:V3F_C4B_T2F_Quad[]);
    public totalQuads: number;
    public capacity: number;
    public quads: V3F_C4B_T2F_Quad[];

    //public quads(quads:V3F_C4B_T2F_Quad[]);

    /**
     * Creates a TextureAtlas with an filename and with an initial capacity for Quads.
     * The TextureAtlas capacity can be increased in runtime.
     * Constructor of TextureAtlas
     * @param {String|Texture2D} fileName
     * @param {Number} capacity
     * @example
     * 1.
     * //creates a TextureAtlas with  filename
     * var textureAtlas = new TextureAtlas("res/hello.png", 3);
     * 2.
     * //creates a TextureAtlas with texture
     * var texture = textureCache.addImage("hello.png");
     * var textureAtlas = new TextureAtlas(texture, 3);
     */
    public constructor(fileName: string, capacity: number);
    public constructor(fileName: Texture2D, capacity: number);

    /**
     * Quantity of quads that are going to be drawn.
     * @return {Number}
     */
    public getTotalQuads(): number;

    /**
     * Quantity of quads that can be stored with the current texture atlas size
     * @return {Number}
     */
    public getCapacity(): number;

    /**
     * Texture of the texture atlas
     * @return {Image}
     */
    public getTexture(): Image;

    /**
     * @param {Image} texture
     */
    public setTexture(texture: Image): void;

    /**
     * specify if the array buffer of the VBO needs to be updated
     * @param {Boolean} dirty
     */
    public setDirty(dirty: boolean): void;

    /**
     * whether or not the array buffer of the VBO needs to be updated
     * @returns {boolean}
     */
    public isDirty(): boolean;

    /**
     * Quads that are going to be rendered
     * @return {Array}
     */
    public getQuads(): V3F_C4B_T2F_Quad[];

    /**
     * @param {Array} quads
     */
    public setQuads(quads: V3F_C4B_T2F_Quad[]): void;

    /**
     * Description
     * @return {String}
     */
    description(): string;

    /**
     * Initializes a TextureAtlas with a filename and with a certain capacity for Quads.
     * The TextureAtlas capacity can be increased in runtime.
     * WARNING: Do not reinitialize the TextureAtlas because it will leak memory.
     * @param {String} file
     * @param {Number} capacity
     * @return {Boolean}
     * @example
     * //example
     * var textureAtlas = new TextureAtlas();
     * textureAtlas.initWithTexture("hello.png", 3);
     */
    public initWithFile(file: string, capacity: number): boolean;

    /**
     * Initializes a TextureAtlas with a previously initialized Texture2D object, and
     * with an initial capacity for Quads.
     * The TextureAtlas capacity can be increased in runtime.
     * WARNING: Do not reinitialize the TextureAtlas because it will leak memory
     * @param {Image} texture
     * @param {Number} capacity
     * @return {Boolean}
     * @example
     * //example
     * var texture = textureCache.addImage("hello.png");
     * var textureAtlas = new TextureAtlas();
     * textureAtlas.initWithTexture(texture, 3);
     */
    public initWithTexture(texture: Image, capacity: number): boolean;

    /**
     * Updates a Quad (texture, vertex and color) at a certain index
     * index must be between 0 and the atlas capacity - 1
     * @param {V3F_C4B_T2F_Quad} quad
     * @param {Number} index
     */
    public updateQuad(quad: V3F_C4B_T2F_Quad, index: number): void;

    /**
     * Inserts a Quad (texture, vertex and color) at a certain index
     * index must be between 0 and the atlas capacity - 1
     * @param {V3F_C4B_T2F_Quad} quad
     * @param {Number} index
     */
    public insertQuad(quad: V3F_C4B_T2F_Quad, index: number): void;

    /**
     *
     *      Inserts a c array of quads at a given index
     *      index must be between 0 and the atlas capacity - 1
     *      this method doesn't enlarge the array when amount + index > totalQuads
     *
     * @param {Array} quads
     * @param {Number} index
     * @param {Number} amount
     */
    public insertQuads(quads: V3F_C4B_T2F_Quad[], index: number, amount: number): void;

    /**
     * Removes the quad that is located at a certain index and inserts it at a new index
     * This operation is faster than removing and inserting in a quad in 2 different steps
     * @param {Number} fromIndex
     * @param {Number} newIndex
     */
    public insertQuadFromIndex(fromIndex: number, newIndex: number): void;

    /**
     * Removes a quad at a given index number.
     * The capacity remains the same, but the total number of quads to be drawn is reduced in 1
     * @param {Number} index
     */
    public removeQuadAtIndex(index: number): void;

    /**
     * Removes a given number of quads at a given index
     * @param {Number} index
     * @param {Number} amount
     */
    public removeQuadsAtIndex(index: number, amount: number): void;

    /**
     * Removes all Quads.
     * The TextureAtlas capacity remains untouched. No memory is freed.
     * The total number of quads to be drawn will be 0
     */
    removeAllQuads(): void;

    /**
     * Resize the capacity of the CCTextureAtlas.
     * The new capacity can be lower or higher than the current one
     * It returns YES if the resize was successful.
     * If it fails to resize the capacity it will return NO with a new capacity of 0.
     * no used for js
     * @param {Number} newCapacity
     * @return {Boolean}
     */
    public resizeCapacity(newCapacity: number): boolean;

    /**
     * Used internally by CCParticleBatchNode
     * don't use this unless you know what you're doing
     * @param {Number} amount
     */
    public increaseTotalQuadsWith(amount: number): void;

    /**
     * Moves an amount of quads from oldIndex at newIndex
     * @param {Number} oldIndex
     * @param {Number} amount
     * @param {Number} newIndex
     */
    public moveQuadsFromIndex(oldIndex: number, amount: number, newIndex: number): void;

    /**
     * Ensures that after a realloc quads are still empty
     * Used internally by CCParticleBatchNode
     * @param {Number} index
     * @param {Number} amount
     */
    public fillWithEmptyQuadsFromIndex(index: number, amount: number): void;

    // TextureAtlas - Drawing

    /**
     * Draws all the Atlas's Quads
     */
    public drawQuads(): void;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // ClippingNode
  ////////////////////////////////////////////////////////////////////////////////

  // +--------------------------------------------------------------------------------
  // + File: cocos2d/core/base-nodes/CCClippingNode.js
  // +--------------------------------------------------------------------------------
  /**
   * the value of stencil bits.
   * @type Number
   */
  export const stencilBits: number;

  /**
   *
   *     ClippingNode is a subclass of Node.
   *     It draws its content (children) clipped using a stencil.
   *     The stencil is an other Node that will not be drawn.
   *     The clipping is done using the alpha part of the stencil (adjusted with an alphaThreshold).
   *
   * @class
   * @extends Node
   * @param {Node} [stencil=null]
   *
   * @property {Number}   alphaThreshold  - Threshold for alpha value.
   * @property {Boolean}  inverted        - Indicate whether in inverted mode.
   * @property {Node}  stencil         - he Node to use as a stencil to do the clipping.
   */
  export class ClippingNode extends Node {
    //alphaThreshold: 0,
    //inverted: false,
    public alphaThreshold: number;
    public inverted: boolean;
    public stencil: Node;

    public constructor(stencil?: Node);

    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @param {Node} [stencil=null]
     */
    public ctor(stencil?: Node): void;

    /**
     * Initialization of the node, please do not call this function by yourself, you should pass the parameters to constructor to initialize it .
     * @function
     * @param {Node} [stencil=null]
     */
    public init(stencil?: Node): boolean;

    /**
     *
     * The alpha threshold.
     * The content is drawn only where the stencil have pixel with alpha greater than the alphaThreshold.
     * Should be a float between 0 and 1.
     * This default to 1 (so alpha test is disabled).
     * </P>
     * @return {Number}
     */
    public getAlphaThreshold(): number;

    /**
     * set alpha threshold.
     * @param {Number} alphaThreshold
     */
    public setAlphaThreshold(alphaThreshold: number): void;

    /**
     *
     *     Inverted. If this is set to YES,
     *     the stencil is inverted, so the content is drawn where the stencil is NOT drawn.
     *     This default to NO.
     *
     * @return {Boolean}
     */
    public isInverted(): boolean;

    /**
     * set whether or not invert of stencil
     * @param {Boolean} inverted
     */
    public setInverted(inverted: boolean): void;

    /**
     * The Node to use as a stencil to do the clipping.
     * The stencil node will be retained. This default to nil.
     * @return {Node}
     */
    public getStencil(): Node;

    /**
     * Set stencil.
     * @function
     * @param {Node} stencil
     */
    public setStencil(stencil: Node): void;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // menus
  ////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////
  // File: cocos2d/menus/CCMenu.js
  ////////////////////////////////////////////////////////////////////////////////
  /**
   * @constant
   * @type Number
   */
  export const MENU_STATE_WAITING: number;

  /**
   * @constant
   * @type Number
   */
  export const MENU_STATE_TRACKING_TOUCH: number;

  /**
   * @constant
   * @type Number
   */
  export const MENU_HANDLER_PRIORITY: number;

  /**
   * @constant
   * @type Number
   */
  export const DEFAULT_PADDING: number;

  /**
   * Features and Limitation:
   *  - You can add MenuItem objects in runtime using addChild:
   *  - But the only accepted children are MenuItem objects
   * @class
   * @extends Layer
   * @param {...MenuItem|null} menuItems}
   * @example
   * var layer = new Menu(menuitem1, menuitem2, menuitem3);
   */
  export class Menu extends Layer {
    /**
     * Constructor of Menu override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @param {...MenuItem|null} menuItems
     */
    public constructor(...menuItems: MenuItem[]);

    /**
     * initializes a Menu with it's items
     * @param {Array} menuItems
     * @return {Boolean}
     */
    public initWithItems(...menuItems: MenuItem[]): boolean;

    public initWithArray(menuItems: MenuItem[]): boolean;

    /**
     * return whether or not the menu will receive events
     * @return {Boolean}
     */
    public isEnabled(): boolean;

    /**
     * set whether or not the menu will receive events
     * @param {Boolean} enabled
     */
    public setEnabled(enabled: boolean): void;

    /**
     * add a child for  Menu
     * @param {Node} child
     * @param {Number|Null} [zOrder=] zOrder for the child
     * @param {Number|Null} [tag=] tag for the child
     */
    public addChild(child: MenuItem, zOrder?: number, tag?: number): void;

    /**
     * align items vertically with default padding
     */
    public alignItemsVertically(): void;

    /**
     * align items vertically with specified padding
     * @param {Number} padding
     */
    public alignItemsVerticallyWithPadding(padding: number): void;

    /**
     * align items horizontally with default padding
     */
    public alignItemsHorizontally(): void;

    /**
     * align items horizontally with specified padding
     * @param {Number} padding
     */
    public alignItemsHorizontallyWithPadding(padding: number): void;

    /**
     * align items in columns
     * @example
     * // Example
     * menu.alignItemsInColumns(3,2,3)// this will create 3 columns, with 3 items for first column, 2 items for second and 3 for third
     *
     * menu.alignItemsInColumns(3,3)//this creates 2 columns, each have 3 items
     */
    public alignItemsInColumns(...args: Number[]): void;

    /**
     * align menu items in rows
     * @param {Number} args Arguments
     * @example
     * // Example
     * menu.alignItemsInRows(5,3)//this will align items to 2 rows, first row with 5 items, second row with 3
     *
     * menu.alignItemsInRows(4,4,4,4)//this creates 4 rows each have 4 items
     */
    public alignItemsInRows(...args: Number[]): void;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // File: cocos2d/menus/CCMenuItem.js
  ////////////////////////////////////////////////////////////////////////////////

  /**
   * Subclass MenuItem (or any subclass) to create your custom MenuItem objects.
   * @class
   * @extends Node
   * @param {function|String} callback
   * @param  {Node} target
   */
  export class MenuItem extends Node {
    public enabled: boolean;

    /**
     * Constructor of MenuItem
     * @param {function|String} callback
     * @param {Node} target
     */
    public constructor(callback: string | ccMenuItemCallback, target: Node);

    public ctor(callback?: string | ccMenuItemCallback, target?: Node): void;

    /**
     * return whether MenuItem is selected
     * @return {Boolean}
     */
    public isSelected(): boolean;

    /**
     * return whether MenuItem is Enabled
     * @return {Boolean}
     */
    public isEnabled(): boolean;

    /**
     * set enable value of MenuItem
     * @param {Boolean} enable
     */
    public setEnabled(enable: boolean): void;

    /**
     * initializes a MenuItem with callback
     * @param {function|String} callback
     * @param {Node} target
     * @return {Boolean}
     */
    public initWithCallback(callback: ccMenuItemCallback, target: Node): boolean;

    /**
     * return rect value of MenuItem
     * @return {Rect}
     */
    public rect(): Rect;

    /**
     * set the MenuItem selected same as setIsSelected(true)
     */
    public selected(): void;

    /**
     * set the MenuItem unselected same as setIsSelected(false)
     */
    public unselected(): void;

    /**
     * set the callback to the menu item
     * @param {function|String} callback
     * @param {Node} target
     */
    public setCallback(callback: ccMenuItemCallback, target: Node): void;

    /**
     * call the selector with target
     */
    public activate(): void;
  }

  /**
   *  Any Node that supports the LabelProtocol protocol can be added.
   * Supported nodes:
   * - BitmapFontAtlas
   * - LabelAtlas
   * - LabelTTF
   * @class
   * @extends MenuItem
   * @param {Node} label
   * @param {function|String} selector
   * @param {Node} target
   * @example
   * var menuitemLabel = new MenuItemLabel(label,selector,target);
   *
   * @property {String}   string          - Content string of label item
   * @property {Node}  label           - Label of label item
   * @property {Color} disabledColor   - Color of label when it's disabled
   */
  export class MenuItemLabel extends MenuItem {
    public string: string;
    public disabledColor: Color;
    public label: Node;

    /**
     * Constructor of MenuItemLabel
     * @param {Node} label
     * @param {function|String} callback
     * @param {Node} target
     */
    public constructor(label: Node, callback?: string | ccMenuItemCallback, target?: Node);

    /**
     * initializes a MenuItemLabel with a label
     * @param {Node} label
     * @param {function|String} callback
     * @param {Node} target
     * @return {Boolean}
     */
    public initWithLabel(label: Node, callback: string | ccMenuItemCallback, target: Node): boolean;

    /**
     * return the disable color for this MenuItemLabel
     * @return {Color}
     */
    public getDisabledColor(): Color;

    /**
     * set the disable color for this MenuItemLabel
     * @param {Color} color
     */
    public setDisabledColor(color: Color): void;

    /**
     * return label of MenuItemLabel
     * @return {Node}
     */
    public getLabel(): Node;

    /**
     * set a label for MenuItemLabel
     * @param {Node} label
     */
    public setLabel(label: Node): void;

    /**
     * set the string for  MenuItemLabel
     * @param {String} label
     */
    public setString(label: string): void;

    /**
     * return the string of MenuItemLabel
     * @returns {*|string|_p.string|ret.string|q.string|String}
     */
    public getString(): string;
  }

  /**
   * Helper class that creates a MenuItemLabel class with a LabelAtlas
   * @class
   * @extends MenuItemLabel
   * @param {String} value
   * @param {String} charMapFile
   * @param {Number} itemWidth
   * @param {Number} itemHeight
   * @param {String} startCharMap a single character
   * @param {function|String|Null} callback
   * @param {Node|Null} target
   * @example
   * var menuItem = new MenuItemAtlasFont(param1,param2...);
   */
  export class MenuItemAtlasFont extends MenuItemLabel {
    /**
     * the contructor of MenuItemAtlasFont
     * @param {String} value
     * @param {String} charMapFile
     * @param {Number} itemWidth
     * @param {Number} itemHeight
     * @param {String} startCharMap a single character
     * @param {function|String|Null} callback
     * @param {Node|Null} target
     */
    public constructor(
      value: string,
      charMapFile: string,
      itemWidth: number,
      itemHeight: number,
      startCharMap: string,
      callback?: string | ccMenuItemCallback,
      target?: Node
    );

    /**
     * initializes a MenuItemAtlasFont with string
     * @param {String} value
     * @param {String} charMapFile
     * @param {Number} itemWidth
     * @param {Number} itemHeight
     * @param {String} startCharMap a single character
     * @param {function|String|Null} callback
     * @param {Node|Null} target
     * @return {Boolean}
     */
    public initWithString(
      value: string,
      charMapFile: string,
      itemWidth: number,
      itemHeight: number,
      startCharMap: string,
      callback?: string | ccMenuItemCallback,
      target?: Node
    ): boolean;
  }

  /**
   * Helper class that creates a CCMenuItemLabel class with a Label
   * @class
   * @extends MenuItemLabel
   * @param {String} value text for the menu item
   * @param {function|String} callback
   * @param {Node} target
   * @example
   * var menuItem = new MenuItemFont(value, callback, target);
   *
   * @property {Number}   fontSize    - Font size of font item
   * @property {String}   fontName    - Font name of font item
   */
  export class MenuItemFont extends MenuItemLabel {
    public fontName: string;
    public fontSize: number;

    /**
     * Constructor of MenuItemFont
     * @param {String} value text for the menu item
     * @param {function|String} callback
     * @param {Node} target
     */
    public constructor(value: string, callback?: string | ccMenuItemCallback, target?: Node);

    /**
     * initializes MenuItemFont with  string
     * @param {String} value text for the menu item
     * @param {function|String} callback
     * @param {Node} target
     * @return {Boolean}
     */
    public initWithString(
      value: string,
      callback?: string | ccMenuItemCallback,
      target?: Node
    ): boolean;

    /**
     * set the font size for MenuItemFont
     * @param {Number} size
     */
    public setFontSize(size: number): void;

    /**
     *return the font size of MenuItemFont
     * @return {Number}
     */
    public getFontSize(): number;

    /**
     * set the font name for MenuItemFont
     * @param {String} name
     */
    public setFontName(name: string): void;

    /**
     * return the font name for MenuItemFont
     * @return {String}
     */
    public getFontName(): string;
  }

  /**
   * CCMenuItemSprite accepts CCNode<CCRGBAProtocol> objects as items.
   * The images has 3 different states:
   *   - unselected image
   *   - selected image
   *   - disabled image
   * @class
   * @extends MenuItem
   * @param {Image|Null} normalSprite normal state image
   * @param {Image|Null} selectedSprite selected state image
   * @param {Image|Node|Null} three disabled state image OR target node
   * @param {String|function|Node|Null} four callback function name in string or actual function, OR target Node
   * @param {String|function|Null} five callback function name in string or actual function
   *
   * @example
   * var item = new MenuItemSprite(normalImage)//create a menu item from a sprite with no functionality
   * var item = new MenuItemSprite(normalImage, selectedImage)//create a menu Item, nothing will happen when clicked
   * var item = new MenuItemSprite(normalImage, SelectedImage, disabledImage)//same above, but with disabled state image
   * var item = new MenuItemSprite(normalImage, SelectedImage, 'callback', targetNode)//create a menu item, when clicked runs targetNode.callback()
   * var item = new MenuItemSprite(normalImage, SelectedImage, disabledImage, targetNode.callback, targetNode)
   * //same as above, but with disabled image, and passing in callback function
   *
   * @property {Sprite}    normalImage     - Sprite in normal state
   * @property {Sprite}    selectedImage     - Sprite in selected state
   * @property {Sprite}    disabledImage     - Sprite in disabled state
   */
  export class MenuItemSprite extends MenuItem {
    public normalImage: Sprite;
    public selectedImage: Sprite;
    public disabledImage: Sprite;

    /**
     * Constructor of MenuItemSprite
     * @param {Image|Null} normalSprite normal state image
     * @param {Image|Null} selectedSprite selected state image
     * @param {Image|Node|Null} three disabled state image OR target node
     * @param {String|function|Node|Null} four callback function name in string or actual function, OR target Node
     * @param {String|function|Null} five callback function name in string or actual function
     */
    public constructor(
      normalSprite: Sprite,
      selectedSprite: Sprite,
      three?: Node | ccMenuItemCallback,
      four?: string | ccMenuItemCallback | Node,
      five?: Node
    );

    /**
     * initializes MenuItemSprite with a Sprite
     * @param {Node} normalSprite
     * @param {Node} selectedSprite
     * @param {Node} disabledSprite
     * @param {function|String} callback
     * @param {Node} target
     * @return {Boolean}
     */
    public initWithNormalSprite(
      normalSprite: Sprite,
      selectedSprite: Sprite,
      disabledSprite: Sprite,
      callback: string | ccMenuItemCallback,
      target: Node
    ): boolean;

    /**
     * return the normal status image(Sprite)
     * @return {Sprite}
     */
    public getNormalImage(): Sprite;

    /**
     * set the normal status image(Sprite)
     * @param {Sprite} normalImage
     */
    public setNormalImage(normalImage: Sprite): void;

    /**
     * return the selected status image(Sprite) of MenuItemSprite
     * @return {Sprite}
     */
    public getSelectedImage(): Sprite;

    /**
     * set the selected status image(Sprite)
     * @param {Sprite} selectedImage
     */
    public setSelectedImage(selectedImage: Sprite): void;

    /**
     * return the disabled status of MenuItemSprite
     * @return {Sprite}
     */
    public getDisabledImage(): Sprite;

    /**
     * set the disabled status image(Sprite)
     * @param {Sprite} disabledImage
     */
    public setDisabledImage(disabledImage: Sprite): void;
  }

  /**
   * MenuItemImage accepts images as items.
   * The images has 3 different states:
   * - unselected image
   * - selected image
   * - disabled image
   *
   * For best results try that all images are of the same size
   * @class
   * @extends MenuItemSprite
   * @param {string|null} normalImage
   * @param {string|null} selectedImage
   * @param {string|null} disabledImage
   * @param {function|string|null} callback
   * @param {Node|null} target
   * @example
   * var menuItem = new MenuItemImage(normalImage, selectedImage, three, four, five);
   */
  export class MenuItemImage extends MenuItemSprite {
    /**
     * Constructor of MenuItemImage
     * @param {string|null} normalImage
     * @param {string|null} selectedImage
     * @param {string|null} disabledImage
     * @param {function|string|null} callback
     * @param {Node|null} target
     */
    public constructor(
      normalImage?: string,
      selectedImage?: string,
      disabledImage?: string,
      callback?: string | ccMenuItemCallback,
      target?: Node
    );

    /**
     * initializes a MenuItemImage
     * @param {string|null} normalImage
     * @param {string|null} selectedImage
     * @param {string|null} disabledImage
     * @param {function|string|null} callback
     * @param {Node|null} target
     * @returns {boolean}
     */
    public initWithNormalImage(
      normalImage?: string,
      selectedImage?: string,
      disabledImage?: string,
      callback?: string | ccMenuItemCallback,
      target?: Node
    ): boolean;

    /**
     * sets the sprite frame for the normal image
     * @param {SpriteFrame} frame
     */
    public setNormalSpriteFrame(frame: SpriteFrame): void;

    /**
     * sets the sprite frame for the selected image
     * @param {SpriteFrame} frame
     */
    public setSelectedSpriteFrame(frame: SpriteFrame): void;

    /**
     * sets the sprite frame for the disabled image
     * @param {SpriteFrame} frame
     */
    public setDisabledSpriteFrame(frame: SpriteFrame): void;
  }

  /**
   * A simple container class that "toggles" it's inner items
   * The inner items can be any MenuItem
   * @class
   * @extends MenuItem
   *
   * @property {Array}    subItems        - Sub items
   * @property {Number}   selectedIndex   - Index of selected sub item
   *
   *@example
   * // Example
   * //create a toggle item with 2 menu items (which you can then toggle between them later)
   * var toggler = new MenuItemToggle( new MenuItemFont("On"), new MenuItemFont("Off"), this.callback, this)
   * //Note: the first param is the target, the second is the callback function, afterwards, you can pass in any number of menuitems
   *
   * //if you pass only 1 variable, then it must be a MenuItem
   * var notYetToggler = new MenuItemToggle(MenuItemFont("On"));//it is useless right now, until you add more stuff to it
   * notYetToggler.addSubItem(new MenuItemFont("Off"));
   * //this is useful for constructing a toggler without a callback function (you wish to control the behavior from somewhere else)
   */
  export class MenuItemToggle extends MenuItem {
    public selectedIndex: number;
    public subItems: MenuItem[];

    /**
     * Constructor of MenuItemToggle
     */
    //public constructor(...args:MenuItem[]);
    public constructor();

    public ctor(...args: MenuItem[]): void;
    public ctor(): void;

    /**
     * initializes a MenuItemToggle with items
     * @param {MenuItem} args[0...last-2] the rest in the array are MenuItems
     * @param {function|String} args[last-1] the second item in the args array is the callback
     * @param {Node} args[last] the first item in the args array is a target
     * @return {Boolean}
     */
    public initWithItems(...args: MenuItem[]): boolean;

    /**
     * return the index of selected
     * @return {Number}
     */
    public getSelectedIndex(): number;

    /**
     * set the seleceted index for MenuItemToggle
     * @param {Number} selectedIndex
     */
    public setSelectedIndex(selectedIndex: number): void;

    /**
     * similar to get children,return the sumItem array.
     * @return {Array}
     */
    public getSubItems(): MenuItem[];

    /**
     * set the subitem for MenuItemToggle
     * @param {MenuItem} subItems
     */
    public setSubItems(...subItems: MenuItem[]): void;

    /**
     * add the subitem for MenuItemToggle
     * @param {MenuItem} item
     */
    public addSubItem(item: MenuItem): void;

    /**
     * returns the selected item   (deprecated in -x, please use getSelectedItem instead.)
     * @return {MenuItem}
     */
    public selectedItem(): MenuItem;

    /**
     * returns the selected item.
     * @return {MenuItem}
     */
    public getSelectedItem(): MenuItem;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // render-texture
  ////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////
  // File: cocos2d/render-texture/CCRenderTexture.js
  ////////////////////////////////////////////////////////////////////////////////

  /**
   * enum for jpg
   * @const {number} IMAGE_FORMAT_JPEG
   */
  export const IMAGE_FORMAT_JPEG: number;

  /**
   * enum for png
   * @const {number} IMAGE_FORMAT_PNG
   */
  export const IMAGE_FORMAT_PNG: number;

  /**
   * enum for raw
   * @const {number} IMAGE_FORMAT_RAWDATA
   */
  export const IMAGE_FORMAT_RAWDATA: number;

  /**
   * @param {number} x
   * @return {number}
   * Constructor
   */
  export function NextPOT(x: number): number;

  /**
   * RenderTexture is a generic rendering target. To render things into it,<br/>
   * simply construct a render target, call begin on it, call visit on any cocos<br/>
   * scenes or objects to render them, and call end. For convenience, render texture<br/>
   * adds a sprite as it's display child with the results, so you can simply add<br/>
   * the render texture to your scene and treat it like any other CocosNode.<br/>
   * There are also functions for saving the render texture to disk in PNG or JPG format.
   * @class
   * @extends Node
   *
   * @property {Sprite}    sprite          - The sprite.
   * @property {Sprite}    clearFlags      - Code for "auto" update.
   * @property {number}       clearDepthVal   - Clear depth value.
   * @property {boolean}      autoDraw        - Indicate auto draw mode activate or not.
   * @property {number}       clearStencilVal - Clear stencil value.
   * @property {Color}     clearColorVal   - Clear color value, valid only when "autoDraw" is true.
   */
  export class RenderTexture extends Node {
    /**
     * The sprite
     * @member {Sprite} sprite
     */
    public sprite: Sprite;

    /**
     * Valid flags: GL_COLOR_BUFFER_BIT, GL_DEPTH_BUFFER_BIT, GL_STENCIL_BUFFER_BIT. They can be OR'ed. Valid when "autoDraw is YES.
     * @member {number} clearFlags
     */
    public clearFlags: number;

    /**
     * Value for clearDepth. Valid only when autoDraw is true.
     * @member {number} clearDepthVal
     */
    public clearDepthVal: number;

    /**
     * When enabled, it will render its children into the texture automatically. Disabled by default for compatiblity reasons. <br/>
     * Will be enabled in the future.
     * @member {boolean} autoDraw
     */
    public autoDraw: boolean;

    /**
     * Value for clear Stencil. Valid only when autoDraw is true
     * @member {number} clearStencilVal
     */
    public clearStencilVal: number;

    /**
     * Clear color value. Valid only when "autoDraw" is true.
     * @member {Color} clearColorVal
     */
    public clearColorVal: Color;

    /**
     * creates a RenderTexture object with width and height in Points and a pixel format, only RGB and RGBA formats are valid
     * Constructor of RenderTexture for Canvas
     * @param {number} width
     * @param {number} height
     * @param {IMAGE_FORMAT_JPEG|IMAGE_FORMAT_PNG|IMAGE_FORMAT_RAWDATA} [format=Texture2D.PIXEL_FORMAT_RGBA8888]
     * @param {number} [depthStencilFormat=0]
     * @example
     * // Example
     * var rt = new RenderTexture(width, height, format, depthStencilFormat)
     * @function
     */
    public constructor(width: number, height: number, format?: number, depthStencilFormat?: number);

    /**
     * Clear RenderTexture.
     * @function
     */
    public cleanup(): void;

    /**
     * Used for grab part of screen to a texture.
     * @param {Point} rtBegin
     * @param {Rect} fullRect
     * @param {Rect} fullViewport
     */
    public setVirtualViewport(rtBegin: Point, fullRect: Rect, fullViewport: Rect): void;

    /**
     * Initializes the instance of RenderTexture
     * @function
     * @param {number} width
     * @param {number} height
     * @param {IMAGE_FORMAT_JPEG|IMAGE_FORMAT_PNG|IMAGE_FORMAT_RAWDATA} [format]
     * @param {number} [depthStencilFormat]
     * @return {boolean}
     */
    public initWithWidthAndHeight(
      width: number,
      height: number,
      format: number,
      depthStencilFormat: number
    ): boolean;

    /**
     * starts grabbing
     * @function
     */
    public begin(): void;

    /**
     * starts rendering to the texture while clearing the texture first.<br/>
     * This is more efficient then calling -clear first and then -begin
     * @param {number} r red 0-255
     * @param {number} g green 0-255
     * @param {number} b blue 0-255
     * @param {number} a alpha 0-255 0 is transparent
     * @param {number} [depthValue=]
     * @param {number} [stencilValue=]
     */
    public beginWithClear(
      r: number,
      g: number,
      b: number,
      a: number,
      depthValue?: number,
      stencilValue?: number
    ): void;

    /**
     * ends grabbing
     * @function
     */
    public end(): void;

    /**
     * clears the texture with a color
     * @param {number} r red 0-1
     * @param {number} g green 0-1
     * @param {number} b blue 0-1
     * @param {number} a alpha 0-1
     */
    public clear(r: number, g: number, b: number, a: number): void;

    /**
     * clears the texture with rect.
     * @function
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     */
    public clearRect(x: number, y: number, width: number, height: number): void;

    /**
     * clears the texture with a specified depth value
     * @function
     * @param {number} depthValue
     */
    public clearDepth(depthValue: number): void;

    /**
     * clears the texture with a specified stencil value
     * @function
     * @param {number} stencilValue
     */
    public clearStencil(stencilValue: number): void;

    /**
     * saves the texture into a file using JPEG format. The file will be saved in the Documents folder.
     * Returns YES if the operation is successful.
     * (doesn't support in HTML5)
     * @param {number} filePath
     * @param {number} format
     */
    public saveToFile(filePath: string, format: number): void;

    /**
     * creates a new CCImage from with the texture's data. Caller is responsible for releasing it by calling delete.
     * @return {Image}
     */
    public newCCImage(flipImage: boolean): Image;

    /**
     * Listen "come to background" message, and save render texture. It only has effect on Android.
     * @param {Class} obj
     */
    public listenToBackground(obj: Class): void;

    /**
     * Listen "come to foreground" message and restore the frame buffer object. It only has effect on Android.
     * @param {Class} obj
     */
    public listenToForeground(obj: Class): void;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // shape-nodes
  ////////////////////////////////////////////////////////////////////////////////

  // +--------------------------------------------------------------------------------
  // + File: cocos2d/core/base-nodes/CCDrawNode.js
  // +--------------------------------------------------------------------------------
  /**
   * Code copied & pasted from SpacePatrol game https://github.com/slembcke/SpacePatrol
   *
   * Renamed and added some changes for cocos2d
   *
   */
  export function v2fzero(): Point;

  export function v2f(x: number, y: number): Point;

  export function v2fadd(v0: number, v1: number): Point;

  export function v2fsub(v0: number, v1: number): Point;

  export function v2fmult(v: number, s: number): Point;

  export function v2fperp(p0: number): Point;

  export function v2fneg(p0: number): Point;

  export function v2fdot(p0: number, p1: number): Point;

  export function v2fforangle(a: number): Point;

  export function v2fnormalize(p: Point): Point;

  //export function __v2f(v:Point):Point;
  //
  //export function __t(v:Point):Point;

  /**
   * CCDrawNode
   * Node that draws dots, segments and polygons.
   * Faster than the "drawing primitives" since they it draws everything in one single batch.
   * @class
   * @name DrawNode
   * @extends Node
   */
  export class DrawNode extends Node {
    public static TYPE_DOT: number;
    public static TYPE_SEGMENT: number;
    public static TYPE_POLY: number;

    /**
     * Gets the blend func
     * @returns {Object}
     */
    public getBlendFunc(): BlendFunc;

    /**
     * Set the blend func
     * @param blendFunc
     * @param dst
     */
    public setBlendFunc(blendFunc: BlendFunc | number, dst?: number): void;

    /**
     * line width setter
     * @param {Number} width
     */
    public setLineWidth(width: number): void;

    /**
     * line width getter
     * @returns {Number}
     */
    public getLineWidth(): number;

    /**
     * draw color setter
     * @param {Color} color
     */
    public setDrawColor(color: Color): void;

    /**
     * draw color getter
     * @returns {Color}
     */
    public getDrawColor(): Color;

    /**
     * draws a rectangle given the origin and destination point measured in points.
     * @param {Point} origin
     * @param {Point} destination
     * @param {Color} fillColor
     * @param {Number} lineWidth
     * @param {Color} lineColor
     */
    public drawRect(
      origin: Point,
      destination: Point,
      fillColor?: Color,
      lineWidth?: number,
      lineColor?: Color
    ): void;

    /**
     * draws a circle given the center, radius and number of segments.
     * @override
     * @param {Point} center center of circle
     * @param {Number} radius
     * @param {Number} angle angle in radians
     * @param {Number} segments
     * @param {Boolean} drawLineToCenter
     * @param {Number} lineWidth
     * @param {Color} color
     */
    public drawCircle(
      center: Point,
      radius: number,
      angle: number,
      segments: number,
      drawLineToCenter?: boolean,
      lineWidth?: number,
      color?: Color
    ): void;

    /**
     * draws a quad bezier path
     * @override
     * @param {Point} origin
     * @param {Point} control
     * @param {Point} destination
     * @param {Number} segments
     * @param {Number} lineWidth
     * @param {Color} color
     */
    public drawQuadBezier(
      origin: Point,
      control: Point,
      destination: Point,
      segments: number,
      lineWidth?: number,
      color?: Color
    ): void;

    /**
     * draws a cubic bezier path
     * @override
     * @param {Point} origin
     * @param {Point} control1
     * @param {Point} control2
     * @param {Point} destination
     * @param {Number} segments
     * @param {Number} lineWidth
     * @param {Color} color
     */
    public drawCubicBezier(
      origin: Point,
      control1: Point,
      control2: Point,
      destination: Point,
      segments: number,
      lineWidth?: number,
      color?: Color
    ): void;

    /**
     * draw a CatmullRom curve
     * @override
     * @param {Array} points
     * @param {Number} segments
     * @param {Number} lineWidth
     * @param {Color} color
     */
    public drawCatmullRom(
      points: Point[],
      segments: number,
      lineWidth?: number,
      color?: Color
    ): void;

    /**
     * draw a cardinal spline path
     * @override
     * @param {Array} config
     * @param {Number} tension
     * @param {Number} segments
     * @param {Number} lineWidth
     * @param {Color} color
     */
    public drawCardinalSpline(
      config: Point[],
      tension: number,
      segments: number,
      lineWidth?: number,
      color?: Color
    ): void;

    /**
     * draw a dot at a position, with a given radius and color
     * @param {Point} pos
     * @param {Number} radius
     * @param {Color} color
     */
    public drawDot(pos: Point, radius: number, color?: Color): void;

    /**
     * draws an array of points.
     * @override
     * @param {Array} points point of array
     * @param {Number} radius
     * @param {Color} color
     */
    public drawDots(points: Point[], radius: number, color?: Color): void;

    /**
     * draw a segment with a radius and color
     * @param {Point} from
     * @param {Point} to
     * @param {Number} lineWidth
     * @param {Color} color
     */
    public drawSegment(from: Point, to: Point, lineWidth?: number, color?: Color): void;

    /**
     * draw a polygon with a fill color and line color, copying the vertex list
     * @param {Array} verts
     * @param {Color} fillColor
     * @param {Number} lineWidth
     * @param {Color} color
     */
    public drawPoly(verts: Point[], fillColor?: Color, lineWidth?: number, color?: Color): void;

    /**
     * Clear the geometry in the node's buffer.
     */
    public clear(): void;
  }

  ///////////////////////////////////////////
  /// tilemap/layer
  /////////////////////////////////////////

  // +--------------------------------------------------------------------------------
  // + File: cocos2d/tilemap/CCTMXLayer.js
  // +--------------------------------------------------------------------------------

  /**
   * <p>TMXLayer represents the TMX layer. </p>
   *
   * <p>It is a subclass of SpriteBatchNode. By default the tiles are rendered using a TextureAtlas. <br />
   * If you modify a tile on runtime, then, that tile will become a Sprite, otherwise no Sprite objects are created. <br />
   * The benefits of using Sprite objects as tiles are: <br />
   * - tiles (Sprite) can be rotated/scaled/moved with a nice API </p>
   *
   * <p>If the layer contains a property named "vertexz" with an integer (in can be positive or negative), <br />
   * then all the tiles belonging to the layer will use that value as their OpenGL vertex Z for depth. </p>
   *
   * <p>On the other hand, if the "vertexz" property has the "automatic" value, then the tiles will use an automatic vertex Z value. <br />
   * Also before drawing the tiles, GL_ALPHA_TEST will be enabled, and disabled after drawing them. The used alpha func will be:  </p>
   *
   * glAlphaFunc( GL_GREATER, value ) <br />
   *
   * <p>"value" by default is 0, but you can change it from Tiled by adding the "cc_alpha_func" property to the layer. <br />
   * The value 0 should work for most cases, but if you have tiles that are semi-transparent, then you might want to use a different value, like 0.5.</p>
   * @class
   * @extends SpriteBatchNode
   *
   * @property {Sprite[]}          tiles               - Tiles for layer
   * @property {TMXTilesetInfo}    tileset             - Tileset for layer
   * @property {number}               layerOrientation    - Layer orientation
   * @property {any[]}                properties          - Properties from the layer. They can be added using tilemap editors
   * @property {string}               layerName           - Name of the layer
   * @property {number}               layerWidth          - Width of the layer
   * @property {number}               layerHeight         - Height of the layer
   * @property {number}               tileWidth           - Width of a tile
   * @property {number}               tileHeight          - Height of a tile
   */
  export class TMXLayer extends SpriteBatchNode {
    /**
     * Pointer to the map of tiles
     * @member {Sprite[]} tiles
     */
    tiles: Sprite[];

    /**
     * Tile set information for the layer
     * @member {TMXTilesetInfo} tileset
     */
    tileset: TMXTilesetInfo;

    /**
     * Layer orientation, which is the same as the map orientation
     * @member {number} layerOrientation
     */
    layerOrientation: number;

    /**
     * properties from the layer. They can be added using Tiled
     * @member {any[]} properties
     */
    properties: any[];

    /**
     * The layer name
     * @member {string} layerName
     */
    layerName: string;

    /**
     * Texture of SpriteBatchNode
     * @member {Texture2D} texture
     */
    texture: Texture2D;

    /**
     * Width of the layer
     * @member {number} layerWidth
     */
    layerWidth: number;

    /**
     * Height of the layer
     * @member {number} layerHeight
     */
    layerHeight: number;

    /**
     * Width of a tile
     * @member {number} tileWidth
     */
    tileWidth: number;

    /**
     * Height of a tile
     * @member {number} tileHeight
     */
    tileHeight: number;

    /**
     * Creates a TMXLayer with an tile set info, a layer info and a map info   <br/>
     * Constructor of TMXLayer
     * @param {TMXTilesetInfo} tilesetInfo
     * @param {TMXLayerInfo} layerInfo
     * @param {TMXMapInfo} mapInfo
     */
    constructor(tilesetInfo: TMXTilesetInfo, layerInfo: TMXLayerInfo, mapInfo: TMXMapInfo);

    /**
     * Sets the untransformed size of the TMXLayer.
     * @override
     * @param {Size|number} size The untransformed size of the TMXLayer or The untransformed size's width of the TMXLayer.
     * @param {number} [height] The untransformed size's height of the TMXLayer.
     */
    setContentSize(size: Size | number, height: number): void;

    /**
     * Gets layer size.
     * @return {Size}
     */
    getLayerSize(): Size;

    /**
     * Set layer size
     * @param {Size} Var
     */
    setLayerSize(Var: Size): void;

    /**
     * Size of the map's tile (could be different from the tile's size)
     * @return {Size}
     */
    getMapTileSize(): Size;

    /**
     * Set the map tile size.
     * @param {Size} Var
     */
    setMapTileSize(Var: Size): void;

    /**
     * Initializes a TMXLayer with a tileset info, a layer info and a map info
     * @param {TMXTilesetInfo} tilesetInfo
     * @param {TMXLayerInfo} layerInfo
     * @param {TMXMapInfo} mapInfo
     * @return {boolean}
     */
    initWithTilesetInfo(
      tilesetInfo: TMXTilesetInfo,
      layerInfo: TMXLayerInfo,
      mapInfo: TMXMapInfo
    ): boolean;

    /**
     * <p>Dealloc the map that contains the tile position from memory. <br />
     * Unless you want to know at runtime the tiles positions, you can safely call this method. <br />
     * If you are going to call layer.getTileGIDAt() then, don't release the map</p>
     */
    releaseMap(): void;

    /**
     * <p>Returns the tile (Sprite) at a given a tile coordinate. <br/>
     * The returned Sprite will be already added to the TMXLayer. Don't add it again.<br/>
     * The Sprite can be treated like any other Sprite: rotated, scaled, translated, opacity, color, etc. <br/>
     * You can remove either by calling: <br/>
     * - layer.removeChild(sprite, cleanup); <br/>
     * - or layer.removeTileAt(ccp(x,y)); </p>
     * @param {Point|number} pos or x
     * @param {number} [y]
     * @return {Sprite}
     */
    getTileAt(pos: Point | number, y: number): Sprite;

    /**
     * Returns the tile gid at a given tile coordinate. <br />
     * if it returns 0, it means that the tile is empty. <br />
     * This method requires the the tile map has not been previously released (eg. don't call layer.releaseMap())<br />
     * @param {Point|number} pos or x
     * @param {number} [y]
     * @return {number}
     */
    getTileGIDAt(pos: Point | number, y: number): number;

    /**
     *  lipped tiles can be changed dynamically
     * @param {Point|number} pos or x
     * @param {number} [y]
     * @return {number}
     */
    getTileFlagsAt(pos: Point | number, y: number): number;

    /**
     * <p>Sets the tile gid (gid = tile global id) at a given tile coordinate.<br />
     * The Tile GID can be obtained by using the method "tileGIDAt" or by using the TMX editor . Tileset Mgr +1.<br />
     * If a tile is already placed at that position, then it will be removed.</p>
     * @param {number} gid
     * @param {Point|number} posOrX position or x
     * @param {number} flagsOrY flags or y
     * @param {number} [flags]
     */
    setTileGID(gid: number, posOrX: Point | number, flagsOrY: number, flags: number): void;

    /**
     * Removes a tile at given tile coordinate
     * @param {Point|number} pos position or x
     * @param {number} [y]
     */
    removeTileAt(pos: Point | number, y: number): void;

    /**
     * Returns the position in pixels of a given tile coordinate
     * @param {Point|number} pos position or x
     * @param {number} [y]
     * @return {Point}
     */
    getPositionAt(pos: Point | number, y: number): Point;

    /**
     * Return the value for the specific property name
     * @param {string} propertyName
     * @return {any}
     */
    getProperty(propertyName: string): any;

    /**
     * Creates the tiles
     */
    setupTiles(): void;

    /**
     * Remove child
     * @param  {Sprite} sprite
     * @param  {boolean} cleanup
     */
    removeChild(sprite: Sprite, cleanup: boolean): void;
  }

  ///////////////////////////////////////////
  /// tilemap/object-group
  /////////////////////////////////////////

  // +--------------------------------------------------------------------------------
  // + File: cocos2d/tilemap/CCTMXObjectGroup.js
  // +--------------------------------------------------------------------------------

  /**
   * TMXObjectGroup represents the TMX object group.
   * @class
   * @extends Class
   *
   * @property {any[]}    properties  - Properties from the group. They can be added using tilemap editors
   * @property {string}   groupName   - Name of the group
   */
  export class TMXObjectGroup extends Class {
    /**
     * Properties from the group. They can be added using tilemap editors
     * @member {any[]} properties
     */
    properties: any[];

    /**
     * Name of the group
     * @member {string} groupName
     */
    groupName: string;

    /**
     * <p>The TMXObjectGroup's constructor. <br/>
     * This function will automatically be invoked when you create a node using new construction: "var node = new TMXObjectGroup()".<br/>
     * Override it to extend its behavior, remember to call "this._super()" in the extended "ctor" function.</p>
     */
    constructor();

    /**
     * Offset position of child objects
     * @return {Point}
     */
    getPositionOffset(): Point;

    /**
     * Offset position of child objects
     * @param {Point} offset
     */
    setPositionOffset(offset: Point): void;

    /**
     * List of properties stored in a dictionary
     * @param {any} Var
     */
    setProperties(Var: any): void;

    /**
     * Return the value for the specific property name
     * @param {string} propertyName
     * @return {any}
     */
    propertyNamed(propertyName: string): any;

    /**
     * <p>Return the dictionary for the specific object name. <br />
     * It will return the 1st object found on the array for the given name.</p>
     * @param {string} objectName
     * @return {any|null}
     */
    getObject(objectName: string): any;

    /**
     * Gets the objects.
     * @return {any[]}
     */
    getObjects(): any[];

    /**
     * Set the objects.
     * @param {any} objects
     */
    setObjects(objects: any): void;
  }

  ///////////////////////////////////////////
  /// tilemap/tiled-map
  /////////////////////////////////////////

  // +--------------------------------------------------------------------------------
  // + File: cocos2d/tilemap/CCTMXTiledMap.js
  // +--------------------------------------------------------------------------------

  /**
   Orthogonal orientation
   * @const {number} TMX_ORIENTATION_ORTHO
   */
  export const TMX_ORIENTATION_ORTHO: number;

  /**
   * Hexagonal orientation
   * @const {number} TMX_ORIENTATION_HEX
   */

  export const TMX_ORIENTATION_HEX: number;

  /**
   * Isometric orientation
   * @const {number} TMX_ORIENTATION_ISO
   */
  export const TMX_ORIENTATION_ISO: number;

  /**
   * <p>TMXTiledMap knows how to parse and render a TMX map.</p>
   *
   * <p>It adds support for the TMX tiled map format used by http://www.mapeditor.org <br />
   * It supports isometric, hexagonal and orthogonal tiles.<br />
   * It also supports object groups, objects, and properties.</p>
   * @class
   * @extends Node
   * @param {string} tmxFile tmxFile fileName or content string
   * @param {string} resourcePath   If tmxFile is a file name ,it is not required.If tmxFile is content string ,it is must required.

   *
   * @property {any[]}               properties      - Properties from the map. They can be added using tilemap editors
   * @property {number}              mapOrientation  - Map orientation
   * @property {TMXObjectGroup[]}    objectGroups    - Object groups of the map
   * @property {number}              mapWidth        - Width of the map
   * @property {number}              mapHeight       - Height of the map
   * @property {number}              tileWidth       - Width of a tile
   * @property {number}              tileHeight      - Height of a tile
   *
   * @example
   * //example
   * 1.
   * //create a TMXTiledMap with file name
   * var tmxTiledMap = new TMXTiledMap("res/orthogonal-test1.tmx");
   * 2.
   * //create a TMXTiledMap with content string and resource path
   * var resources = "res/TileMaps";
   * var filePath = "res/TileMaps/orthogonal-test1.tmx";
   * var xmlStr = loader.getRes(filePath);
   * var tmxTiledMap = new TMXTiledMap(xmlStr, resources);
   */
  export class TMXTiledMap extends Node {
    /**
     * The properties
     * @member {any[]} properties
     */
    properties: any[];

    /**
     * Map orientation
     * @member {number} mapOrientation
     */
    mapOrientation: number;

    /**
     * Object groups
     * @member {TMXObjectGroup[]} objectGroups
     */
    objectGroups: TMXObjectGroup[];

    /**
     * Width of the map
     * @member {number} mapWidth
     */
    mapWidth: number;

    /**
     * Height of the map
     * @member {number} mapHeight
     */
    mapHeight: number;

    /**
     * Width of a tile
     * @member {number} tileWidth
     */
    tileWidth: number;

    /**
     * Height of a tile
     * @member {number} tileHeight
     */
    tileHeight: number;

    /**
     * Creates a TMX Tiled Map with a TMX file  or content string. <br/>
     * Constructor of TMXTiledMap
     * @param {string} tmxFile tmxFile fileName or content string
     * @param {string} resourcePath   If tmxFile is a file name ,it is not required.If tmxFile is content string ,it is must required.
     */
    constructor(tmxFile: string, resourcePath?: string);

    /**
     * Gets the map size.
     * @return {Size}
     */
    getMapSize(): Size;

    /**
     * Set the map size.
     * @param {Size} Var
     */
    setMapSize(Var: Size): void;

    /**
     * Gets the tile size.
     * @return {Size}
     */
    getTileSize(): Size;

    /**
     * Set the tile size
     * @param {Size} Var
     */
    setTileSize(Var: Size): void;

    /**
     * Initializes the instance of TMXTiledMap with tmxFile
     * @param {string} tmxFile
     * @return {boolean} Whether the initialization was successful.
     * @example
     * //example
     * var map = new TMXTiledMap()
     * map.initWithTMXFile("hello.tmx");
     */
    initWithTMXFile(tmxFile: string): boolean;

    /**
     * Initializes the instance of TMXTiledMap with tmxString
     * @param {string} tmxString
     * @param {string} resourcePath
     * @return {boolean} Whether the initialization was successful.
     */
    initWithXML(tmxString: string, resourcePath: string): boolean;

    /**
     * Return All layers array.
     * @returns {TMXLayer[]}
     */
    allLayers(): TMXLayer[];

    /**
     * return the TMXLayer for the specific layer
     * @param {string} layerName
     * @return {TMXLayer}
     */
    getLayer(layerName: string): TMXLayer;

    /**
     * Return the TMXObjectGroup for the specific group
     * @param {string} groupName
     * @return {TMXObjectGroup}
     */
    getObjectGroup(groupName: string): TMXObjectGroup;

    /**
     * Return the value for the specific property name
     * @param {string} propertyName
     * @return {string}
     */
    getProperty(propertyName: string): string;

    /**
     * Return properties dictionary for tile GID
     * @param {number} GID
     * @return {any}
     */
    getPropertiesForGID(GID: number): any;
  }

  ///////////////////////////////////////////
  /// tilemap/xml-parser
  /////////////////////////////////////////

  // +--------------------------------------------------------------------------------
  // + File: cocos2d/tilemap/CCTMXXMLParser.js
  // +--------------------------------------------------------------------------------

  /**
   * @const {number} TMX_PROPERTY_NONE
   */
  export const TMX_PROPERTY_NONE: number;

  /**
   * @const {number} TMX_PROPERTY_MAP
   */
  export const TMX_PROPERTY_MAP: number;

  /**
   * @const {number} TMX_PROPERTY_LAYER
   */
  export const TMX_PROPERTY_LAYER: number;

  /**
   * @const {number} TMX_PROPERTY_OBJECTGROUP
   */
  export const TMX_PROPERTY_OBJECTGROUP: number;

  /**
   * @const {number} TMX_PROPERTY_OBJECT
   */
  export const TMX_PROPERTY_OBJECT: number;

  /**
   * @const {number} TMX_PROPERTY_TILE
   */
  export const TMX_PROPERTY_TILE: number;

  /**
   * @const {number} TMX_TILE_HORIZONTAL_FLAG
   */
  export const TMX_TILE_HORIZONTAL_FLAG: number;

  /**
   * @const {number} TMX_TILE_VERTICAL_FLAG
   */
  export const TMX_TILE_VERTICAL_FLAG: number;

  /**
   * @const {number} TMX_TILE_DIAGONAL_FLAG
   */
  export const TMX_TILE_DIAGONAL_FLAG: number;

  /**
   * @const {number} TMX_TILE_FLIPPED_ALL
   */
  export const TMX_TILE_FLIPPED_ALL: number;

  /**
   * @const {number} TMX_TILE_FLIPPED_MASK
   */
  export const TMX_TILE_FLIPPED_MASK: number;

  /**
   * <p>TMXLayerInfo contains the information about the layers like: <br />
   * - Layer name<br />
   * - Layer size <br />
   * - Layer opacity at creation time (it can be modified at runtime)  <br />
   * - Whether the layer is visible (if it's not visible, then the CocosNode won't be created) <br />
   *  <br />
   * This information is obtained from the TMX file.</p>
   * @class
   * @extends Class
   *
   * @property {any[]}    properties  - Properties of the layer info.
   */
  export class TMXLayerInfo extends Class {
    /**
     * The Properties.
     * @member {any[]} properties
     */
    properties: any[];

    /**
     * @member {boolean} visible
     */
    visible: boolean;

    /**
     * @member {boolean} ownTiles
     */
    ownTiles: boolean;

    /**
     * @member {number} offset
     */
    offset: number;

    constructor();

    /**
     * @const {number} ATTRIB_NONE
     */
    static ATTRIB_NONE: number;

    /**
     * @const {number} ATTRIB_BASE64
     */
    static ATTRIB_BASE64: number;

    /**
     * @const {number} ATTRIB_GZIP
     */
    static ATTRIB_GZIP: number;
    /**
     * @const {number} ATTRIB_ZLIB
     */
    static ATTRIB_ZLIB: number;
  }

  /**
   * <p>TMXTilesetInfo contains the information about the tilesets like: <br />
   * - Tileset name<br />
   * - Tileset spacing<br />
   * - Tileset margin<br />
   * - size of the tiles<br />
   * - Image used for the tiles<br />
   * - Image size<br />
   *
   * This information is obtained from the TMX file. </p>
   * @class
   * @extends Class
   *
   * @property {string} name - Tileset name
   * @property {number} firstGid - First gid
   * @property {number} spacing - Spacing
   * @property {number} margin - Margin
   * @property {string} sourceImage - Filename containing the tiles (should be sprite sheet / texture atlas)
   * @property {Size|null} imageSize - Size in pixels of the image
   */
  export class TMXTilesetInfo extends Class {
    /**
     * Tileset name
     * @member {string} name
     */
    name: string;

    /**
     * First gid
     * @member {number} firstGid
     */
    firstGid: number;

    /**
     * Spacing
     * @member {number} spacing
     */
    spacing: number;

    /**
     * Margin
     * @member {number} margin
     */
    margin: number;

    /**
     * Filename containing the tiles (should be sprite sheet / texture atlas)
     * @member {string} sourceImage
     */
    sourceImage: string;

    /**
     * Size in pixels of the image
     * @member {Size|null} imageSize
     */
    imageSize: Size;

    constructor();

    /**
     * Return rect
     * @param {number} gid
     * @return {Rect}
     */
    rectForGID(gid: number): Rect;
  }

  /**
   * A SAX Parser
   * @class
   * @name saxParser
   * @extends Class
   */
  class SAXParser {}

  /**
   *
   * plistParser is a singleton object for parsing plist files
   * @class
   * @name plistParser
   * @extends SAXParser
   */
  class PlistParser extends SAXParser {}

  /**
   * <p>TMXMapInfo contains the information about the map like: <br/>
   *- Map orientation (hexagonal, isometric or orthogonal)<br/>
   *- Tile size<br/>
   *- Map size</p>
   *
   * <p>And it also contains: <br/>
   * - Layers (an array of TMXLayerInfo objects)<br/>
   * - Tilesets (an array of TMXTilesetInfo objects) <br/>
   * - ObjectGroups (an array of TMXObjectGroupInfo objects) </p>
   *
   * <p>This information is obtained from the TMX file. </p>
   * @class
   * @extends saxParser
   *
   * @property {any[]}    properties          - Properties of the map info.
   * @property {number}   orientation         - Map orientation.
   * @property {any}      parentElement       - Parent element.
   * @property {number}   parentGID           - Parent GID.
   * @property {any}      layerAttrs          - Layer attributes.
   * @property {boolean}  storingCharacters   - Is reading storing characters stream.
   * @property {string}   tmxFileName         - TMX file name.
   * @property {string}   currentString       - Current string stored from characters stream.
   * @property {number}   mapWidth            - Width of the map
   * @property {number}   mapHeight           - Height of the map
   * @property {number}   tileWidth           - Width of a tile
   * @property {number}   tileHeight          - Height of a tile
   *
   * @param {string} tmxFile fileName or content string
   * @param {string} resourcePath  If tmxFile is a file name ,it is not required.If tmxFile is content string ,it is must required.
   * @example
   * 1.
   * //create a TMXMapInfo with file name
   * var tmxMapInfo = new TMXMapInfo("res/orthogonal-test1.tmx");
   * 2.
   * //create a TMXMapInfo with content string and resource path
   * var resources = "res/TileMaps";
   * var filePath = "res/TileMaps/orthogonal-test1.tmx";
   * var xmlStr = loader.getRes(filePath);
   * var tmxMapInfo = new TMXMapInfo(xmlStr, resources);
   */
  export class TMXMapInfo extends SAXParser {
    /**
     * Properties of the map info.
     * @member {any[]} properties
     */
    properties: any[];

    /**
     * Map orientation.
     * @member {number} orientation
     */
    orientation: number;

    /**
     * Parent element
     * @member {any} parentElement
     */
    parentElement: any;

    /**
     * Parent GID
     * @member {number} parentGID
     */
    parentGID: number;

    /**
     * Layer attributes.
     * @member {any} layerAttrs
     */
    layerAttrs: any;

    /**
     * Is reading storing characters stream.
     * @member {boolean} storingCharacters
     */
    storingCharacters: boolean;

    /**
     * TMX file name.
     * @member {string} tmxFileName
     */
    tmxFileName: string;

    /**
     * Current string stored from characters stream.
     * @member {string} currentString
     */
    currentString: string;

    /**
     * Creates a TMX Format with a tmx file or content string                           <br/>
     * Constructor of TMXMapInfo
     * @param {string} tmxFile fileName or content string
     * @param {string} resourcePath  If tmxFile is a file name ,it is not required.If tmxFile is content string ,it is must required.
     */
    constructor(tmxFile: string, resourcePath: string);

    /**
     * Map width & height
     * @return {Size}
     */
    getMapSize(): Size;

    /**
     * Map width & height
     * @param {Size} value
     */
    setMapSize(value: Size): void;

    /**
     * Tiles width & height
     * @return {Size}
     */
    getTileSize(): Size;

    /**
     * Tiles width & height
     * @param {Size} value
     */
    setTileSize(value: Size): void;

    /**
     * Layers
     * @return {TMXLayerInfo[]}
     */
    getLayers(): TMXLayerInfo[];

    /**
     * Layers
     * @param {TMXLayerInfo} value
     */
    setLayers(value: TMXLayerInfo): void;

    /**
     * tilesets
     * @return {TMXTilesetInfo[]}
     */
    getTilesets(): TMXTilesetInfo[];

    /**
     * tilesets
     * @param {TMXTilesetInfo} value
     */
    setTilesets(value: TMXTilesetInfo): void;

    /**
     * ObjectGroups
     * @return {TMXObjectGroup[]}
     */
    getObjectGroups(): TMXObjectGroup[];

    /**
     * ObjectGroups
     * @param {TMXObjectGroup} value
     */
    setObjectGroups(value: TMXObjectGroup): void;

    /**
     * Initializes a TMX format with a  tmx file
     * @param {string} tmxFile
     * @return {Element}
     */
    initWithTMXFile(tmxFile: string): Element;

    /**
     * initializes a TMX format with an XML string and a TMX resource path
     * @param {string} tmxString
     * @param {string} resourcePath
     * @return {boolean}
     */
    initWithXML(tmxString: string, resourcePath: string): boolean;

    /** Initalises parsing of an XML file, either a tmx (Map) file or tsx (Tileset) file
     * @param {string} tmxFile
     * @param {boolean} [isXmlString=false]
     * @return {Element}
     */
    parseXMLFile(tmxFile: string, isXmlString: boolean): Element;

    /**
     * initializes parsing of an XML string, either a tmx (Map) string or tsx (Tileset) string
     * @param {string} xmlString
     * @return {boolean}
     */
    parseXMLString(xmlString: string): boolean;

    /**
     * Gets the tile properties.
     * @return {any[]}
     */
    getTileProperties(): any[];

    /**
     * Set the tile properties.
     * @param {any} tileProperties
     */
    setTileProperties(tileProperties: any): void;

    /**
     * Width of the map
     * @member {number} mapWidth
     */
    mapWidth: number;

    /**
     * Height of the map
     * @member {number} mapHeight
     */
    mapHeight: number;

    /**
     * Width of a tile
     * @member {number} tileWidth
     */
    tileWidth: number;

    /**
     * Height of a tile
     * @member {number} tileHeight
     */
    tileHeight: number;
  }
}
