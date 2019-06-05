/// <reference path="../../../index.d.ts" />

/**
 * Added by hand by converting .js files :(
 * Doesn't exist on https://github.com/jamma/cocos2d-typescript-definitions
 */

declare namespace ccs {
  /**
   * Timeline Frame.
   * base class
   * @class
   */
  export class Frame extends mz.Class {
    // _frameIndex: null,
    // _tween: null,
    // _timeline: null,
    // _node: null,
    // _tweenType: null,
    // _easingParam: null,
    // _enterWhenPassed: null,
    //
    // ctor: function(){
    //     this._frameIndex = 0;
    //     this._tween = true;
    //     this._timeline = null;
    //     this._node = null;
    //     this._enterWhenPassed = false;
    //     this._easingParam = [];
    // },
    //
    // _emitEvent: function(){
    //     if (this._timeline){
    //         this._timeline.getActionTimeline()._emitFrameEvent(this);
    //     }
    // },
    //
    // _cloneProperty: function(frame){
    //     this._frameIndex = frame.getFrameIndex();
    //     this._tween = frame.isTween();
    //     this._tweenType = frame.getTweenType();
    //     this.setEasingParams(frame.getEasingParams());
    // },
    //
    // /**
    //  * Set the frame index
    //  * @param {number} frameIndex
    //  */
    // setFrameIndex: function(frameIndex){
    //     this._frameIndex = frameIndex;
    // },

    /**
     * Get the frame index
     * @returns {null}
     */
    getFrameIndex(): number;

    // /**
    //  * Set timeline
    //  * @param timeline
    //  */
    // setTimeline: function(timeline){
    //     this._timeline = timeline;
    // },
    //
    // /**
    //  * Get timeline
    //  * @param timeline
    //  * @returns {ccs.timeline}
    //  */
    // getTimeline: function(timeline){
    //     return this._timeline;
    // },
    //
    // /**
    //  * Set Node
    //  * @param {cc.Node} node
    //  */
    // setNode: function(node){
    //     this._node = node;
    // },
    //
    // /**
    //  * gets the Node
    //  * @return node
    //  */
    // getNode: function(){
    //     return this._node;
    // },
    //
    // /**
    //  * set tween
    //  * @param tween
    //  */
    // setTween: function(tween){
    //     this._tween = tween;
    // },
    //
    // /**
    //  * Gets the tween
    //  * @returns {boolean | null}
    //  */
    // isTween: function(){
    //     return this._tween;
    // },
    //
    // /**
    //  * the execution of the callback
    //  * @override
    //  * @param {ccs.Frame} nextFrame
    //  */
    // onEnter: function(nextFrame){ // = 0
    // },
    //
    // /**
    //  * Each frame logic
    //  * @override
    //  * @param {number} percent
    //  */
    // apply: function(percent){
    //     if(!this._tween)
    //         return;
    //     if(this._tweenType !== ccs.FrameEaseType.TWEEN_EASING_MAX  && this._tweenType !==  ccs.FrameEaseType.LINEAR)
    //         percent = this.tweenPercent(percent);
    //     this._onApply(percent);
    // },
    //
    // _onApply: function(percent){
    //
    // },
    //
    // /**
    //  * to copy object with deep copy.
    //  * returns a clone of action.
    //  * @override
    //  * @return {ccs.Frame}
    //  */
    // clone: function(){ // = 0
    // },
    //
    // tweenPercent: function(percent){
    //     var func = ccs.Frame.tweenToMap[this._tweenType];
    //     if(func)
    //         return func(percent, this._easingParam);
    //     else
    //         return percent;
    // },
    //
    // setEasingParams: function(easingParams){
    //     if(easingParams){
    //         this._easingParam.length = 0;
    //         for(var i=0; i<easingParams.length; i++)
    //             this._easingParam[i] = easingParams[i];
    //     }
    // },
    //
    // getEasingParams: function(){
    //     return this._easingParam;
    // },
    //
    // setTweenType: function(tweenType){
    //     this._tweenType = tweenType;
    // },
    //
    // getTweenType: function(){
    //     return this._tweenType;
    // },
    //
    // isEnterWhenPassed: function(){
    //     return this._enterWhenPassed;
    // }
  }

  /**
   * Visible frame
   * To control the display state
   * @class
   * @extend ccs.Frame
   */
  export class VisibleFrame extends Frame {
    // _visible: true,
    //
    // ctor: function(){
    //   ccs.Frame.prototype.ctor.call(this);
    //   this._visible = true;
    // },
    //
    // /**
    //  * the execution of the callback
    //  * @param {ccs.Frame} nextFrame
    //  */
    // onEnter: function(nextFrame){
    //   if(this._node)
    //     this._node.setVisible(this._visible);
    // },
    //
    // /**
    //  * to copy object with deep copy.
    //  * returns a clone of action.
    //  * @return {ccs.VisibleFrame}
    //  */
    // clone: function(){
    //   var frame = new ccs.VisibleFrame();
    //   frame.setVisible(this._visible);
    //
    //   frame._cloneProperty(this);
    //
    //   return frame;
    // },
    //
    // /**
    //  * Set display state
    //  * @param {Boolean} visible
    //  */
    // setVisible: function(visible){
    //   this._visible = visible;
    // },

    /**
     * Get the display state
     * @returns {Boolean}
     */
    isVisible(): boolean;
  }
}
