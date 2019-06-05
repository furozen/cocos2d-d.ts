/// <reference path="../../index.d.ts" />

/* tslint:disable no-namespace */
declare namespace ccui {
  /**
   * The base class for ccui controls and layout
   * @sample
   * var uiWidget = new ccui.Widget();
   * this.addChild(uiWidget);
   * @class
   * @extends ccui.ProtectedNode
   *
   * @property {number}           xPercent        - Position x in percentage of width
   * @property {number}           yPercent        - Position y in percentage of height
   * @property {number}           widthPercent    - Width in percentage of parent width
   * @property {number}           heightPercent   - Height in percentage of parent height
   * @property {ccui.Widget}      widgetParent    - <@readonly> The direct parent when it's a widget also, otherwise equals null
   * @property {boolean}          enabled         - Indicate whether the widget is enabled
   * @property {boolean}          focused         - Indicate whether the widget is focused
   * @property {ccui.Widget.SIZE_ABSOLUTE|ccui.Widget.SIZE_PERCENT}     sizeType        - The size type of the widget
   * @property {ccui.Widget.TYPE_WIDGET|ccui.Widget.TYPE_CONTAINER}   widgetType      - <@readonly> The type of the widget
   * @property {boolean}          touchEnabled    - Indicate whether touch events are enabled
   * @property {boolean}          updateEnabled   - Indicate whether the update function is scheduled
   * @property {boolean}          bright          - Indicate whether the widget is bright
   * @property {string}           name            - The name of the widget
   * @property {number}           actionTag       - The action tag of the widget
   */
  class Widget extends mz.Node {
    xPercent: number;
    yPercent: number;
    widthPercent: number;
    heightPercent: number;
    widgetParent: ccui.Widget;
    enabled: boolean;
    focused: boolean;
    sizeType: any; //ccui.Widget.SIZE_ABSOLUTE | ccui.Widget.SIZE_PERCENT
    widgetType: any; //ccui.Widget.TYPE_WIDGET | ccui.Widget.TYPE_CONTAINER
    touchEnabled: boolean;
    updateEnabled: boolean;
    bright: boolean;
    name: string;
    actionTag: number;

    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @function
     */
    ctor();

    /**
     * initializes state of widget.
     * @returns {boolean}
     */
    init(): boolean;

    /**
     * Calls updateSizeAndPosition and its parent's onEnter
     * @override
     */
    onEnter();

    /**
     * Calls unscheduleUpdate and its parent's onExit
     * @override
     */
    onExit();

    /**
     * The direct parent when it's a widget also, otherwise equals null
     * @returns {ccui.Widget|null}
     */
    getWidgetParent(): ccui.Widget | null;

    /**
     * Allow widget touch events to propagate to its parents. Set false will disable propagation
     * @since v3.2
     * @param {boolean} isPropagate
     */
    setPropagateTouchEvents(isPropagate: boolean);

    /**
     * Return whether the widget is propagate touch events to its parents or not
     * @since v3.2
     * @returns {boolean}
     */
    isPropagateTouchEvents(): boolean;

    /**
     * Specify widget to swallow touches or not
     * @since v3.2
     * @param {boolean} swallow
     */
    setSwallowTouches(swallow: boolean);

    /**
     * Return whether the widget is swallowing touch or not
     * @since v3.2
     * @returns {boolean}
     */
    isSwallowTouches(): boolean;

    /**
     * <p>
     *     Sets whether the widget is enabled                                                                                    <br/>
     *     true if the widget is enabled, widget may be touched , false if the widget is disabled, widget cannot be touched.     <br/>
     *     The default value is true, a widget is default to enabled
     * </p>
     * @param {boolean} enabled
     */
    setEnabled(enabled: boolean);

    /**
     * Sets _customSize of ccui.Widget, if ignoreSize is true, the content size is its renderer's contentSize, otherwise the content size is parameter.
     * and updates size percent by parent content size. At last, updates its children's size and position.
     * @param {cc.Size|number} contentSize content size or width of content size
     * @param {number} [height]
     * @override
     */
    setContentSize(contentSize: mz.Size | number, height: number);

    /**
     * Changes the percent that is widget's percent size
     * @param {cc.Point} percent that is widget's percent size, width and height value from 0 to 1.
     */
    setSizePercent(percent: mz.Point);

    /**
     * updates its size by size type and its position by position type.
     * @param {cc.Size} [parentSize] parent size
     */
    updateSizeAndPosition(parentSize: mz.Size);

    /**TEXTURE_RES_TYPE
     * Changes the size type of widget.
     * @param {ccui.Widget.SIZE_ABSOLUTE|ccui.Widget.SIZE_PERCENT} type that is widget's size type
     */
    setSizeType(type: any);

    /**
     * Gets the size type of widget.
     * @returns {ccui.Widget.SIZE_ABSOLUTE|ccui.Widget.SIZE_PERCENT}
     */
    getSizeType(): any;

    /**
     * Ignore the widget size
     * @param {boolean} ignore true that widget will ignore it's size, use texture size, false otherwise. Default value is true.
     */
    ignoreContentAdaptWithSize(ignore: boolean);

    /**
     * Gets whether ignore the content size (custom size)
     * @returns {boolean}
     */
    isIgnoreContentAdaptWithSize(): boolean;

    /**
     * Get custom size of ccui.Widget
     * @returns {cc.Size}
     */
    getCustomSize(): mz.Size;

    /**
     * Gets layout size of ccui.Widget.
     * @returns {cc.Size}
     */
    getLayoutSize(): mz.Size;

    /**
     * Returns size percent of ccui.Widget
     * @returns {cc.Point}
     */
    getSizePercent(): mz.Point;

    /**
     *  Gets world position of ccui.Widget.
     * @returns {cc.Point}
     */
    getWorldPosition(): mz.Point;

    /**
     * Gets the Virtual Renderer of widget.
     * @returns {ccui.Widget}
     */
    getVirtualRenderer(): ccui.Widget;

    /**
     * Gets the content size of widget.  Content size is widget's texture size.
     */
    getVirtualRendererSize();

    /**
     * Sets whether the widget is touch enabled. The default value is false, a widget is default to touch disabled
     * @param {boolean} enable  true if the widget is touch enabled, false if the widget is touch disabled.
     */
    setTouchEnabled(enable: boolean);

    /**
     * Returns whether or not touch is enabled.
     * @returns {boolean}
     */
    isTouchEnabled(): boolean;

    /**
     * Determines if the widget is highlighted
     * @returns {boolean}
     */
    isHighlighted(): boolean;

    /**
     * Sets whether the widget is highlighted. The default value is false, a widget is default to not highlighted
     * @param highlight true if the widget is highlighted, false if the widget is not highlighted.
     */
    setHighlighted(highlight: boolean);

    /**
     * Determines if the widget is on focused
     * @returns {boolean}
     */
    isFocused(): boolean;

    /**
     * Sets whether the widget is on focused
     * The default value is false, a widget is default to not on focused
     * @param {boolean} focus  pass true to let the widget get focus or pass false to let the widget lose focus
     */
    setFocused(focus: boolean);

    /**
     * returns whether the widget could accept focus.
     * @returns {boolean}
     */
    isFocusEnabled(): boolean;

    /**
     * sets whether the widget could accept focus.
     * @param {boolean} enable true represent the widget could accept focus, false represent the widget couldn't accept focus
     */
    setFocusEnabled(enable: boolean);

    /**
     * <p>
     *     When a widget is in a layout, you could call this method to get the next focused widget within a specified direction. <br/>
     *     If the widget is not in a layout, it will return itself
     * </p>
     * @param direction the direction to look for the next focused widget in a layout
     * @param current  the current focused widget
     * @return  the next focused widget in a layout
     */
    findNextFocusedWidget(direction: any, current: any);

    /**
     * when a widget calls this method, it will get focus immediately.
     */
    requestFocus();

    /**
     * no matter what widget object you call this method on , it will return you the exact one focused widget
     */
    getCurrentFocusedWidget();

    /**
     * <p>
     *    When a widget lose/get focus, this method will be called. Be Caution when you provide your own version,       <br/>
     *    you must call widget.setFocused(true/false) to change the focus state of the current focused widget;
     * </p>
     */
    onFocusChanged: null | Function;

    /**
     * use this function to manually specify the next focused widget regards to each direction
     */
    onNextFocusedWidget: null | Function;

    /**
     * Sends the touch event to widget's parent, its subclass will override it, e.g. ccui.ScrollView, ccui.PageView
     * @param {number}  eventType
     * @param {ccui.Widget} sender
     * @param {cc.Touch} touch
     */
    interceptTouchEvent(eventType: number, sender: ccui.Widget, touch: mz.Touch);

    /**
     * This method is called when a focus change event happens
     * @param {ccui.Widget} widgetLostFocus
     * @param {ccui.Widget} widgetGetFocus
     */
    onFocusChange(widgetLostFocus: ccui.Widget, widgetGetFocus: ccui.Widget);

    /**
     * Dispatch a EventFocus through a EventDispatcher
     * @param {ccui.Widget} widgetLostFocus
     * @param {ccui.Widget} widgetGetFocus
     */
    dispatchFocusEvent(widgetLostFocus: ccui.Widget, widgetGetFocus: ccui.Widget);

    /**
     *  Sets whether the widget is bright. The default value is true, a widget is default to bright
     * @param {boolean} bright true if the widget is bright, false if the widget is dark.
     */
    setBright(bright: boolean);

    /**
     * To set the bright style of ccui.Widget.
     * @param {number} style BRIGHT_NORMAL the widget is normal state, BRIGHT_HIGHLIGHT the widget is height light state.
     */
    setBrightStyle(style: number);

    /**
     * A call back function when widget lost of focus.
     */
    didNotSelectSelf();

    /**
     * <p>
     *    The callback of touch began event.                                                               <br/>
     *    If the bounding box of ccui.Widget contains the touch point, it will do the following things:    <br/>
     *      1. sets highlight state,                                                                       <br/>
     *      2. sends event to parent widget by interceptTouchEvent                                         <br/>
     *      3. calls the callback of touch began event.                                                    <br/>
     *      4. returns true,                                                                               <br/>
     *    otherwise returns false directly.                                                                <br/>
     * </p>
     * @override
     * @param {cc.Touch} touch
     * @param {cc.Event} event
     * @returns {boolean}
     */
    onTouchBegan(touch: mz.Touch, event: mz.Event): boolean;

    propagateTouchEvent(event, sender, touch);

    /**
     * <p>
     *    The callback of touch moved event.                                                                                                <br/>
     *    It sets the highlight state by touch, sends event to parent widget by interceptTouchEvent and calls the callback of touch moved event.
     * </p>
     * @param {cc.Touch} touch
     * @param {cc.Event} event
     */
    onTouchMoved(touch: mz.Touch, event: mz.Event);

    /**
     * <p>
     *      The callback of touch end event
     *      It sends event to parent widget by interceptTouchEvent,
     *      calls the callback of touch end event (highlight= true) or touch canceled event (highlight= false).
     *      sets the highlight state to false ,
     * </p>
     * @param touch
     * @param event
     */
    onTouchEnded(touch: any, event: any);

    /**
     * A call back function called when widget is selected, and on touch canceled.
     * @param {cc.Point} touchPoint
     */
    onTouchCancelled(touchPoint: mz.Point);

    /**
     * A call back function called when widget is selected, and on touch long clicked.
     * @param {cc.Point} touchPoint
     */
    onTouchLongClicked(touchPoint: mz.Point);

    longClickEvent();

    /**
     * Sets the touch event target/selector of the ccui.Widget
     * @param {Function} selector
     * @param {Object} target
     */
    addTouchEventListener(selector: Function, target: any);

    addClickEventListener(callback: Function);

    /**
     * Checks a point if is in widget's space
     * @param {cc.Point} pt
     * @returns {boolean}
     */
    hitTest(pt: mz.Point): boolean;

    /**
     * returns whether clipping parent widget contains point.
     * @param {cc.Point} pt location point
     * @returns {boolean}
     */
    isClippingParentContainsPoint(pt: mz.Point): boolean;

    /**
     * Calls the checkChildInfo of widget's parent, its subclass will override it.
     * @param {number} handleState
     * @param {ccui.Widget} sender
     * @param {cc.Point} touchPoint
     */
    checkChildInfo(handleState: number, sender: ccui.Widget, touchPoint: mz.Point);

    /**
     * No override to Node needed for these
     */
    // setPosition(pos:mz.Point | number, posY:number);
    // setPositionX(x);
    // setPositionY(y);

    /**
     * Changes the position (x,y) of the widget
     * @param {cc.Point} percent
     */
    setPositionPercent(percent: mz.Point);

    /**
     * Gets the percent (x,y) of the widget
     * @returns {cc.Point}
     */
    getPositionPercent(): mz.Point;

    /**
     * Changes the position type of the widget
     * @param {number} type  the position type of widget
     */
    setPositionType(type: number);

    /**
     * Gets the position type of the widget
     * @returns {number}
     */
    getPositionType(): number;

    /**
     * Sets whether the widget should be flipped horizontally or not.
     * @param {boolean} flipX true if the widget should be flipped horizontally, false otherwise.
     */
    setFlippedX(flipX: boolean);

    /**
     * <p>
     *   Returns the flag which indicates whether the widget is flipped horizontally or not.             <br/>
     *   It only flips the texture of the widget, and not the texture of the widget's children.          <br/>
     *   Also, flipping the texture doesn't alter the anchorPoint.                                       <br/>
     *   If you want to flip the anchorPoint too, and/or to flip the children too use:                   <br/>
     *   widget.setScaleX(sprite.getScaleX() * -1);
     * </p>
     * @returns {boolean}
     */
    isFlippedX(): boolean;

    /**
     * Sets whether the widget should be flipped vertically or not.
     * @param {boolean} flipY  true if the widget should be flipped vertically, false otherwise.
     */
    setFlippedY(flipY: boolean);

    /**
     * <p>
     *     Return the flag which indicates whether the widget is flipped vertically or not.                <br/>
     *     It only flips the texture of the widget, and not the texture of the widget's children.          <br/>
     *     Also, flipping the texture doesn't alter the anchorPoint.                                       <br/>
     *     If you want to flip the anchorPoint too, and/or to flip the children too use:                   <br/>
     *     widget.setScaleY(widget.getScaleY() * -1);
     * </p>
     * @returns {boolean}
     */
    isFlippedY(): boolean;

    /**
     * Determines if the widget is enabled
     * @returns {boolean}
     */
    isEnabled(): boolean;

    /**
     * Gets the left boundary position of this widget.
     * @returns {number}
     */
    getLeftBoundary(): number;

    /**
     * Gets the bottom boundary position of this widget.
     * @returns {number}
     */
    getBottomBoundary(): number;

    /**
     * Gets the right boundary position of this widget.
     * @returns {number}
     */
    getRightBoundary(): number;

    /**
     * Gets the top boundary position of this widget.
     * @returns {number}
     */
    getTopBoundary(): number;

    /**
     * Gets the position of touch began event.
     * @returns {cc.Point}
     */
    getTouchBeganPosition(): mz.Point;

    /**
     * Gets the position of touch moved event
     * @returns {cc.Point}
     */
    getTouchMovePosition(): mz.Point;

    /**
     * Gets the position of touch end event
     * @returns {cc.Point}
     */
    getTouchEndPosition(): mz.Point;

    /**
     * get widget type
     * @returns {ccui.Widget.TYPE_WIDGET|ccui.Widget.TYPE_CONTAINER}
     */
    getWidgetType(): any;

    /**
     * Gets LayoutParameter of widget.
     * @param {ccui.LayoutParameter} parameter
     */
    setLayoutParameter(parameter: any);

    /**
     * Gets layout parameter
     * @param {ccui.LayoutParameter.NONE|ccui.LayoutParameter.LINEAR|ccui.LayoutParameter.RELATIVE} type
     * @returns {ccui.LayoutParameter}
     */
    getLayoutParameter(type: any): any;

    /**
     * Returns the "class name" of widget.
     * @returns {string}
     */
    getDescription(): string;

    /**
     * Clones a new widget.
     * @returns {ccui.Widget}
     */
    clone(): ccui.Widget;

    /*temp action*/
    setActionTag(tag);

    getActionTag();

    /**
     * Gets the left boundary position of this widget.
     * @deprecated since v3.0, please use getLeftBoundary instead.
     * @returns {number}
     */
    getLeftInParent(): number;

    /**
     * Gets the bottom boundary position of this widget.
     * @deprecated since v3.0, please use getBottomBoundary instead.
     * @returns {number}
     */
    getBottomInParent(): number;

    /**
     * Gets the right boundary position of this widget.
     * @deprecated since v3.0, please use getRightBoundary instead.
     * @returns {number}
     */
    getRightInParent(): number;

    /**
     * Gets the top boundary position of this widget.
     * @deprecated since v3.0, please use getTopBoundary instead.
     * @returns {number}
     */
    getTopInParent(): number;

    /**
     * Gets the touch end point of widget when widget is selected.
     * @deprecated since v3.0, please use getTouchEndPosition instead.
     * @returns {cc.Point}
     */
    getTouchEndPos(): mz.Point;

    /**
     *Gets the touch move point of widget when widget is selected.
     * @deprecated since v3.0, please use getTouchMovePosition instead.
     * @returns {cc.Point}
     */
    getTouchMovePos(): mz.Point;

    /**
     * Checks a point if in parent's area.
     * @deprecated since v3.0, please use isClippingParentContainsPoint instead.
     * @param {cc.Point} pt
     * @returns {boolean}
     */
    clippingParentAreaContainPoint(pt: mz.Point): boolean;

    /**
     * Gets the touch began point of widget when widget is selected.
     * @deprecated since v3.0, please use getTouchBeganPosition instead.
     * @returns {cc.Point}
     */
    getTouchStartPos(): mz.Point;

    /**
     * Changes the size that is widget's size
     * @deprecated since v3.0, please use setContentSize instead.
     * @param {cc.Size} size  that is widget's size
     */
    setSize(size: mz.Size);

    /**
     * Returns size of widget
     * @deprecated since v3.0, please use getContentSize instead.
     * @returns {cc.Size}
     */
    getSize(): mz.Size;

    /**
     * Adds a node for widget (this function is deleted in -x)
     * @param {cc.Node} node
     * @param {number} zOrder
     * @param {number} tag
     * @deprecated since v3.0, please use addChild instead.
     */
    addNode(node: mz.Node, zOrder: number, tag: number);

    /**
     * Gets node by tag
     * @deprecated since v3.0, please use getChildByTag instead.
     * @param {number} tag
     * @returns {cc.Node}
     */
    getNodeByTag(tag: number): mz.Node;

    /**
     * Returns all children.
     * @deprecated since v3.0, please use getChildren instead.
     * @returns {Array}
     */
    getNodes(): any[];

    /**
     * Removes a node from ccui.Widget
     * @deprecated since v3.0, please use removeChild instead.
     * @param {cc.Node} node
     * @param {boolean} cleanup
     */
    removeNode(node: mz.Node, cleanup: boolean);

    /**
     * Removes node by tag
     * @deprecated since v3.0, please use removeChildByTag instead.
     * @param {number} tag
     * @param {boolean} [cleanup]
     */
    removeNodeByTag(tag: number, cleanup: boolean);

    /**
     * Removes all node
     * @deprecated since v3.0, please use removeAllChildren instead.
     */
    removeAllNodes();

    /**
     * @since v3.2
     * @returns {boolean}
     */
    isUnifySizeEnabled(): boolean;

    /**
     * @since v3.2
     * @param {boolean} enable enable Unify Size of a widget
     */
    setUnifySizeEnabled(enable: boolean);

    /**
     * Set a event handler to the widget in order to use cocostudio editor and framework
     * @since v3.3
     * @param {function} callback
     */
    addCCSEventListener(callback: Function);

    getScaleX(): number;
    getScaleY(): number;
    getScale(): number;

    /**
     * Sets callback name to widget.
     * @since v3.3
     * @param {string} callbackName
     */
    setCallbackName(callbackName: string);

    /**
     * Gets callback name of widget
     * @since v3.3
     * @returns {string|null}
     */
    getCallbackName(): string | null;

    /**
     * Sets callback type to widget
     * @since v3.3
     * @param {string} callbackType
     */
    setCallbackType(callbackType: string);

    /**
     * Gets callback type of widget
     * @since v3.3
     * @returns {string|null}
     */
    getCallbackType(): string | null;

    /**
     * Whether enable layout component of a widget
     * @since v3.3
     * @param {boolean} enable enable layout Component of a widget
     */
    setLayoutComponentEnabled(enable: boolean);

    /**
     * Returns whether enable layout component of a widget
     * @return {boolean} true represent the widget use Layout Component, false represent the widget couldn't use Layout Component.
     */
    isLayoutComponentEnabled();

    /**
     * call this method with parameter true to enable the Android Dpad focus navigation feature
     * @note it doesn't implemented on Web
     * @param {boolean} enable set true to enable dpad focus navigation, otherwise disable dpad focus navigation
     */
    static enableDpadNavigation(enable: boolean);

    /**
     * Gets the focused widget of current stage.
     * @function
     * null|ccui.Widget @returns {null|ccui.Widget}
     */
    static getCurrentFocusedWidget(): null | ccui.Widget;

    // Constants
    //bright style
    /**
     * None bright style of ccui.Widget.
     * @constant
     * @type {number}
     */
    static BRIGHT_STYLE_NONE: number;
    /**
     * Normal bright style of ccui.Widget.
     * @constant
     * @type {number}
     */
    static BRIGHT_STYLE_NORMAL: number;
    /**
     * Light bright style of ccui.Widget.
     * @constant
     * @type {number}
     */
    static BRIGHT_STYLE_HIGH_LIGHT: number;

    //widget type
    /**
     * The type code of Widget for ccui controls.
     * @constant
     * @type {number}
     */
    static TYPE_WIDGET: number;
    /**
     * The type code of Container for ccui controls.
     * @constant
     * @type {number}
     */
    static TYPE_CONTAINER: number;

    //Focus Direction
    /**
     * The left of Focus direction for ccui.Widget
     * @constant
     * @type {number}
     */
    static LEFT: number;
    /**
     * The right of Focus direction for ccui.Widget
     * @constant
     * @type {number}
     */
    static RIGHT: number;
    /**
     * The up of Focus direction for ccui.Widget
     * @constant
     * @type {number}
     */
    static UP: number;
    /**
     * The down of Focus direction for ccui.Widget
     * @constant
     * @type {number}
     */
    static DOWN: number;

    //texture resource type
    /**
     * The image file texture type of ccui.Widget loads.
     * @constant
     * @type {number}
     */
    static LOCAL_TEXTURE: number;
    /**
     * The sprite frame texture type of ccui.Widget loads.
     * @constant
     * @type {number}
     */
    static PLIST_TEXTURE: number;

    //touch event type
    /**
     * The touch began type of ccui.Widget's touch event
     * @constant
     * @type {number}
     */
    static TOUCH_BEGAN: number;
    /**
     * The touch moved type of ccui.Widget's touch event
     * @constant
     * @type {number}
     */
    static TOUCH_MOVED: number;
    /**
     * The touch end type of ccui.Widget's touch event
     * @constant
     * @type {number}
     */
    static TOUCH_ENDED: number;
    /**
     * The touch canceled type of ccui.Widget's touch event
     * @constant
     * @type {number}
     */
    static TOUCH_CANCELED: number;

    //size type
    /**
     * The absolute of ccui.Widget's size type.
     * @constant
     * @type {number}
     */
    static SIZE_ABSOLUTE: number;
    /**
     * The percent of ccui.Widget's size type.
     * @constant
     * @type {number}
     */
    static SIZE_PERCENT: number;

    //position type
    /**
     * The absolute of ccui.Widget's position type.
     * @constant
     * @type {number}
     */
    static POSITION_ABSOLUTE: number;
    /**
     * The percent of ccui.Widget's position type.
     * @constant
     * @type {number}
     */
    static POSITION_PERCENT: number;
  }
}
