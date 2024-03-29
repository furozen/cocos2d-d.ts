/// <reference path="../../../index.d.ts" />

/**
 * Added by hand by converting .js files :(
 * Doesn't exist on https://github.com/jamma/cocos2d-typescript-definitions
 */

declare namespace ccs {
  /**
   * timeline object
   * @class
   * @extend ccs.Class
   */
  export class Timeline extends mz.Class {
    // //{ccs.Frame}
    // _frames: null,
    // //{ccs.Frame}
    // _currentKeyFrame: null,
    // //{Number}
    // _currentKeyFrameIndex: null,
    // //{Number}
    // _fromIndex: null,
    // //{Number}
    // _toIndex: null,
    // //{Number}
    // _betweenDuration: null,
    // //{Number}
    // _actionTag: null,
    // //{ccs.ActionTimeline}
    // _ActionTimeline: null,
    // //{cc.Node}
    // _node: null,
    //
    // ctor: function() {
    //   this._frames = [];
    //   this._currentKeyFrame = null;
    //   this._currentKeyFrameIndex = 0;
    //   this._fromIndex = 0;
    //   this._toIndex = 0;
    //   this._betweenDuration = 0;
    //   this._actionTag = 0;
    //   this._ActionTimeline = null;
    //   this._node = null;
    // },
    //
    // _gotoFrame: function(frameIndex) {
    //   if (this._frames.length === 0)
    //     return;
    //
    //   this._binarySearchKeyFrame(frameIndex);
    //   this._apply(frameIndex);
    // },
    //
    // _stepToFrame: function(frameIndex) {
    //   if (this._frames.length === 0)
    //     return;
    //
    //   this._updateCurrentKeyFrame(frameIndex);
    //   this._apply(frameIndex);
    // },

    /**
     * Get the frame list
     * @returns {ccs.Frame}
     */
    getFrames(): ccs.Frame[];

    // /**
    //  * push frame to frame list
    //  * @param {ccs.Frame} frame
    //  */
    // addFrame: function(frame) {
    //   this._frames.push(frame);
    //   frame.setTimeline(this)
    // },
    //
    // /**
    //  * insert the frame to frame list
    //  * @param {ccs.Frame} frame
    //  * @param {Number} index
    //  */
    // insertFrame: function(frame, index) {
    //   this._frames.splice(index, 0, frame);
    //   frame.setTimeline(this);
    //
    // },
    //
    // /**
    //  * remove frame
    //  * @param {ccs.Frame} frame
    //  */
    // removeFrame: function(frame) {
    //   cc.arrayRemoveObject(this._frames, frame);
    //   frame.setTimeline(null);
    // },
    //
    // /**
    //  * Set the action tag
    //  * @param {Number} tag
    //  */
    // setActionTag: function(tag) {
    //   this._actionTag = tag;
    // },

    /**
     * Gets the action tag
     * return {Number}
     */
    getActionTag(): number;

    // /**
    //  * Set the node
    //  * @param {cc.Node} node
    //  */
    // setNode: function(node) {
    //   for (var i = 0; i < this._frames.length; i++) {
    //     var frame = this._frames[i];
    //     frame.setNode(node);
    //   }
    // },
    //
    // /**
    //  * Gets the node
    //  * return {cc.Node}
    //  */
    // getNode: function() {
    //   return this._node;
    // },
    //
    // /**
    //  * Set the action timeline
    //  * @param {ccs.ActionTimeline} action
    //  */
    // setActionTimeline: function(action) {
    //   this._ActionTimeline = action;
    // },
    //
    // /**
    //  * get the action timeline
    //  * return {cc.Action}
    //  */
    // getActionTimeline: function() {
    //   return this._ActionTimeline;
    // },
    //
    // /**
    //  * to copy object with deep copy.
    //  * returns a clone of action.
    //  * @return {ccs.Timeline}
    //  */
    // clone: function() {
    //   var timeline = new ccs.Timeline();
    //   timeline._actionTag = this._actionTag;
    //
    //   for (var i = 0; i < this._frames.length; i++) {
    //     var frame = this._frames[i];
    //     var newFrame = frame.clone();
    //     timeline.addFrame(newFrame);
    //   }
    //
    //   return timeline;
    //
    // },
    //
    // _apply: function(frameIndex) {
    //   if (this._currentKeyFrame) {
    //     var currentPercent = this._betweenDuration <= 0 ? 0 : (frameIndex - this._currentKeyFrameIndex) / this._betweenDuration;
    //     this._currentKeyFrame.apply(currentPercent);
    //   }
    // },
    //
    // _binarySearchKeyFrame: function(frameIndex) {
    //   var from = null;
    //   var to = null;
    //
    //   var length = this._frames.length;
    //   var needEnterFrame = false;
    //
    //   do {
    //     if (frameIndex < this._frames[0].getFrameIndex()) {
    //       if (this._currentKeyFrameIndex >= this._frames[0].getFrameIndex())
    //         needEnterFrame = true;
    //
    //       this._fromIndex = 0;
    //       this._toIndex = 0;
    //
    //       from = to = this._frames[0];
    //       this._currentKeyFrameIndex = 0;
    //       this._betweenDuration = this._frames[0].getFrameIndex();
    //       break;
    //     } else if (frameIndex >= this._frames[length - 1].getFrameIndex()) {
    //       this._fromIndex = length - 1;
    //       this._toIndex = 0;
    //
    //       from = to = this._frames[length - 1];
    //       this._currentKeyFrameIndex = this._frames[length - 1].getFrameIndex();
    //       this._betweenDuration = 0;
    //       break;
    //     }
    //
    //     var target = -1;
    //     var low = 0,
    //       high = length - 1,
    //       mid = 0;
    //     while (low <= high) {
    //       mid = Math.ceil((low + high) / 2);
    //       if (frameIndex >= this._frames[mid].getFrameIndex() && frameIndex < this._frames[mid + 1].getFrameIndex()) {
    //         target = mid;
    //         break;
    //       }
    //       if (this._frames[mid].getFrameIndex() > frameIndex)
    //         high = mid - 1;
    //       else
    //         low = mid + 1;
    //     }
    //
    //     this._fromIndex = target;
    //
    //     if (length > 1)
    //       this._toIndex = (target + 1) | 0;
    //     else
    //       this._toIndex = (target) | 0;
    //
    //     from = this._frames[this._fromIndex];
    //     to = this._frames[this._toIndex];
    //
    //     from = this._frames[target];
    //     to = this._frames[target + 1];
    //
    //     if (target === 0 && this._currentKeyFrameIndex < from.getFrameIndex())
    //       needEnterFrame = true;
    //
    //     this._currentKeyFrameIndex = from.getFrameIndex();
    //     this._betweenDuration = to.getFrameIndex() - from.getFrameIndex();
    //   } while (0);
    //
    //   if (needEnterFrame || this._currentKeyFrame != from) {
    //     this._currentKeyFrame = from;
    //     this._currentKeyFrame.onEnter(to);
    //   }
    //
    // },
    //
    // _updateCurrentKeyFrame: function(frameIndex) {
    //   if (frameIndex > 60)
    //     var a = 0;
    //   //! If play to current frame's front or back, then find current frame again
    //   if (frameIndex < this._currentKeyFrameIndex || frameIndex >= this._currentKeyFrameIndex + this._betweenDuration) {
    //     var from = null;
    //     var to = null;
    //
    //     do {
    //       var length = this._frames.length;
    //
    //       if (frameIndex < this._frames[0].getFrameIndex()) {
    //         from = to = this._frames[0];
    //         this._currentKeyFrameIndex = 0;
    //         this._betweenDuration = this._frames[0].getFrameIndex();
    //         break;
    //       }
    //       else if (frameIndex >= this._frames[length - 1].getFrameIndex()) {
    //         var lastFrameIndex = this._frames[length - 1].getFrameIndex();
    //         if (this._currentKeyFrameIndex >= lastFrameIndex)
    //           return;
    //         frameIndex = lastFrameIndex;
    //       }
    //
    //       do {
    //         this._fromIndex = this._toIndex;
    //         from = this._frames[this._fromIndex];
    //         this._currentKeyFrameIndex = from.getFrameIndex();
    //
    //         this._toIndex = this._fromIndex + 1;
    //         if (this._toIndex >= length) {
    //           this._toIndex = 0;
    //         }
    //
    //         to = this._frames[this._toIndex];
    //
    //         if (frameIndex === from.getFrameIndex())
    //           break;
    //         if (frameIndex > from.getFrameIndex() && frameIndex < to.getFrameIndex())
    //           break;
    //         if (from.isEnterWhenPassed())
    //           from.onEnter(to);
    //       } while (true);
    //
    //       this._betweenDuration = to.getFrameIndex() - from.getFrameIndex();
    //
    //     } while (0);
    //
    //     this._currentKeyFrame = from;
    //     this._currentKeyFrame.onEnter(to);
    //   }
    // }
  }
}
