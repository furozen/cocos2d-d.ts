/// <reference path="../../../index.d.ts" />

/**
 * Added by hand :(
 * Doesn't exist on https://github.com/jamma/cocos2d-typescript-definitions
 */

declare namespace ccs {
  /**
   * ActionTimelineData
   * @name ccs.ActionTimelineData
   * @extend ccs.Class
   * @class
   *
   */
  export class ActionTimelineData extends mz.Class {
    //     _actionTag: 0,
    //
    //     ctor: function(actionTag){
    //         this._init(actionTag);
    //     },
    //
    //     _init: function(actionTag){
    //         this._actionTag = actionTag;
    //         return true;
    //     },
    //
    //     /**
    //      * Set the action tag.
    //      * @param {number} actionTag
    //      */
    //     setActionTag: function(actionTag){
    //         this._actionTag = actionTag;
    //     },
    //
    //     /**
    //      * Gets the action tag.
    //      */
    //     getActionTag: function(){
    //         return this._actionTag;
    //     }
  }

  export class AnimationInfo {
    name: string;
    startIndex: number;
    endIndex: number;
  }

  export class ComExtensionData extends mz.Component {
    //     _customProperty: null,
    //     _timelineData: null,
    //     _name: "ComExtensionData",
    //
    //     ctor: function(){
    //         this._customProperty = "";
    //         this._timelineData = new ccs.ActionTimelineData(0);
    //         return true;
    //     },
    //
    //     setActionTag: function(actionTag){
    //         this._timelineData.setActionTag(actionTag);
    //     },

    getActionTag(): number;

    //     setCustomProperty: function(customProperty){
    //         this._customProperty = customProperty;
    //     },

    getCustomProperty(): string;
  }

  /**
   * ActionTimeline
   * @class
   * @extend cc.Action
   *
   * @property gotoFrameAndPlay
   * @property gotoFrameAndPause
   */
  export class ActionTimeline extends mz.Action {
    //
    //     _timelineMap: null,
    //     _timelineList: null,
    //     _duration: 0,
    //     _time: null,
    //     _timeSpeed: 1,
    //     _frameInternal: 1/60,
    //     _playing: false,
    //     _currentFrame: 0,
    //     _startFrame: 0,
    //     _endFrame: 0,
    //     _loop: null,
    //     _frameEventListener: null,
    _animationInfos: { [key: string]: AnimationInfo };
    //     _lastFrameListener: null,
    //
    //     ctor: function(){
    //         cc.Action.prototype.ctor.call(this);
    //         this._timelineMap = {};
    //         this._timelineList = [];
    //         this._animationInfos = {};
    //         this.init();
    //     },
    //
    //     _gotoFrame: function(frameIndex){
    //         var size = this._timelineList.length;
    //         for(var i = 0; i < size; i++)
    //         {
    //             this._timelineList[i]._gotoFrame(frameIndex);
    //         }
    //     },
    //
    //     _stepToFrame: function(frameIndex){
    //         var size = this._timelineList.length;
    //         for(var i = 0; i < size; i++){
    //             this._timelineList[i]._stepToFrame(frameIndex);
    //         }
    //     },
    //
    //     //emit frame event, call it when enter a frame
    //     _emitFrameEvent: function(frame){
    //         if(this._frameEventListener){
    //             this._frameEventListener(frame);
    //         }
    //     },
    //
    //     init: function(){
    //         return true;
    //     },
    //
    /**
     * Goto the specified frame index, and start playing from this index.
     * @param startIndex The animation will play from this index.
     * @param [endIndex=] The animation will end at this index.
     * @param [currentFrameIndex=] set current frame index.
     * @param [loop=] Whether or not the animation need loop.
     */
    gotoFrameAndPlay(
      startIndex: number,
      endIndex?: number,
      currentFrameIndex?: number,
      loop?: boolean
    ): void;
    gotoFrameAndPlay(startIndex: number, loop?: boolean): void;

    /**
     * Goto the specified frame index, and pause at this index.
     * @param startIndex The animation will pause at this index.
     */
    gotoFrameAndPause(startIndex: number): void;

    //     /**
    //      * Pause the animation.
    //      */
    //     pause: function(){
    //         this._playing = false;
    //     },
    //
    //     /**
    //      * Resume the animation.
    //      */
    //     resume: function(){
    //         this._playing = true;
    //     },
    //
    //     /**
    //      * Whether or not Action is playing.
    //      */
    //     isPlaying: function(){
    //         return this._playing;
    //     },
    //
    //     /**
    //      * Set the animation speed, this will speed up or slow down the speed.
    //      * @param {number} speed
    //      */
    //     setTimeSpeed: function(speed){
    //         this._timeSpeed = speed;
    //     },
    //
    //     /**
    //      * Get current animation speed.
    //      * @returns {number}
    //      */
    //     getTimeSpeed: function(){
    //         return this._timeSpeed;
    //     },
    //
    //     /**
    //      * duration of the whole action
    //      * @param {number} duration
    //      */
    //     setDuration: function(duration){
    //         this._duration = duration;
    //     },
    //
    //     /**
    //      * Get current animation duration.
    //      * @returns {number}
    //      */
    //     getDuration: function(){
    //         return this._duration;
    //     },
    //
    //     /**
    //      * Start frame index of this action
    //      * @returns {number}
    //      */
    //     getStartFrame: function(){
    //         return this._startFrame;
    //     },
    //
    //     /**
    //      * End frame of this action.
    //      * When action play to this frame, if action is not loop, then it will stop,
    //      * or it will play from start frame again.
    //      * @returns {number}
    //      */
    //     getEndFrame: function(){
    //         return this._endFrame;
    //     },
    //
    //     /**
    //      * Set current frame index, this will cause action plays to this frame.
    //      */
    //     setCurrentFrame: function(frameIndex){
    //         if (frameIndex >= this._startFrame && frameIndex <= this._endFrame){
    //             this._currentFrame = frameIndex;
    //             this._time = this._currentFrame * this._frameInternal;
    //         }else{
    //             cc.log("frame index is not between start frame and end frame");
    //         }
    //
    //     },

    /**
     * Get current frame.
     * @returns {number}
     */
    getCurrentFrame(): number;

    //
    //     /**
    //      * add Timeline to ActionTimeline
    //      * @param {ccs.Timeline} timeline
    //      */
    //     addTimeline: function(timeline){
    //         var tag = timeline.getActionTag();
    //         if (!this._timelineMap[tag]) {
    //             this._timelineMap[tag] = [];
    //         }
    //
    //         if (this._timelineMap[tag].indexOf(timeline) === -1) {
    //             this._timelineList.push(timeline);
    //             this._timelineMap[tag].push(timeline);
    //             timeline.setActionTimeline(this);
    //         }
    //
    //     },
    //
    //     /**
    //      * remove Timeline to ActionTimeline
    //      * @param {ccs.Timeline} timeline
    //      */
    //     removeTimeline: function(timeline){
    //         var tag = timeline.getActionTag();
    //         if (this._timelineMap[tag]) {
    //             if(this._timelineMap[tag].some(function(item){
    //                 if(item === timeline)
    //                     return true;
    //             })) {
    //                 cc.arrayRemoveObject(this._timelineMap[tag], timeline);
    //                 cc.arrayRemoveObject(this._timelineList, timeline);
    //                 timeline.setActionTimeline(null);
    //             }
    //         }
    //     },

    /**
     * Gets the timeline list
     * @returns {array | null}
     */
    getTimelines(): ccs.Timeline[];

    //     /**
    //      * Set the Frame event
    //      * @param {function} listener
    //      */
    //     setFrameEventCallFunc: function(listener){
    //         this._frameEventListener = listener;
    //     },
    //
    //     /**
    //      * remove event
    //      */
    //     clearFrameEventCallFunc: function(){
    //         this._frameEventListener = null;
    //     },
    //
    //     /**
    //      * Clone this timeline
    //      * @returns {ccs.ActionTimeline}
    //      */
    //     clone: function(){
    //         var newAction = new ccs.ActionTimeline();
    //         newAction.setDuration(this._duration);
    //         newAction.setTimeSpeed(this._timeSpeed);
    //
    //         for (var a in this._timelineMap){
    //             var timelines = this._timelineMap[a];
    //             for(var b in timelines)
    //             {
    //                 var timeline = timelines[b];
    //                 var newTimeline = timeline.clone();
    //                 newAction.addTimeline(newTimeline);
    //             }
    //         }
    //
    //         return newAction;
    //
    //     },
    //
    //     /**
    //      * Reverse is not defined;
    //      * @returns {null}
    //      */
    //     reverse: function(){
    //         return null;
    //     },
    //
    //     /**
    //      * Stepping of this time line.
    //      * @param {number} delta
    //      */
    //     step: function(delta){
    //         if (!this._playing || this._timelineMap.length === 0 || this._duration === 0)
    //         {
    //             return;
    //         }
    //
    //         this._time += delta * this._timeSpeed;
    //         var endoffset = this._time - this._endFrame * this._frameInternal;
    //
    //         if(endoffset < this._frameInternal){
    //             this._currentFrame = Math.floor(this._time / this._frameInternal);
    //             this._stepToFrame(this._currentFrame);
    //             if(endoffset >= 0 && this._lastFrameListener)
    //                 this._lastFrameListener();
    //         }else{
    //             this._playing = this._loop;
    //             if(!this._playing){
    //                 this._time = this._endFrame * this._frameInternal;
    //                 if (this._currentFrame != this._endFrame){
    //                     this._currentFrame = this._endFrame;
    //                     this._stepToFrame(this._currentFrame);
    //                     if(this._lastFrameListener)
    //                         this._lastFrameListener();
    //                 }
    //             }else
    //                 this.gotoFrameAndPlay(this._startFrame, this._endFrame, this._loop);
    //         }
    //
    //     },
    //
    //     _foreachNodeDescendant: function(parent, callback){
    //         callback(parent);
    //
    //         var children = parent.getChildren();
    //         for (var i=0; i<children.length; i++)
    //         {
    //             var child = children[i];
    //             this._foreachNodeDescendant(child, callback);
    //         }
    //     },
    //
    //     /**
    //      * start with node.
    //      * @param {cc.Node} target
    //      */
    //     startWithTarget: function(target){
    //         cc.Action.prototype.startWithTarget.call(this, target);
    //
    //         var self = this;
    //         var callback = function(child){
    //             var data = child.getComponent("ComExtensionData");
    //
    //             if(data) {
    //                 var actionTag = data.getActionTag();
    //                 if(self._timelineMap[actionTag]) {
    //                     var timelines = self._timelineMap[actionTag];
    //                     for (var i=0; i<timelines.length; i++) {
    //                         var timeline = timelines[i];
    //                         timeline.setNode(child);
    //                     }
    //                 }
    //             }
    //         };
    //
    //         this._foreachNodeDescendant(target, callback);
    //     },
    //
    //     /**
    //      * Whether or not complete
    //      * @returns {boolean}
    //      */
    //     isDone: function(){
    //         return false;
    //     },
    //
    /**
     * @param {String} name
     * @param {Boolean} loop
     */
    play(name: string, loop: boolean): void;

    //     /**
    //      * Add animationInfo
    //      * @param {Object} info
    //      */
    //     addAnimationInfo: function(info){
    //         this._animationInfos[info.name] = info;
    //     },
    //
    //     /**
    //      * Remove animationInfo
    //      * @param {String} name
    //      */
    //     removeAnimationInfo: function(name){
    //         delete this._animationInfos[name];
    //     },
    //
    //     isAnimationInfoExists: function(name){
    //         return this._animationInfos[name];
    //     },

    getAnimationInfo(name: string): AnimationInfo;

    setLastFrameCallFunc(listener: Function): void;

    clearLastFrameCallFunc(): void;
  }
}
