/// <reference path="../../index.d.ts" />
/// <reference path="./Widget.d.ts" />

/* tslint:disable no-namespace */
declare namespace ccui {
  export class Button extends ccui.Widget {
    /**
     * Allocates and initializes a UIButton.
     * Constructor of ccui.Button. override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @param {String} normalImage
     * @param {String} [selectedImage=""]
     * @param {String} [disableImage=""]
     * @param {Number} [texType=ccui.Widget.LOCAL_TEXTURE]
     * @example
     * // example
     * var uiButton = new ccui.Button();
     */
    ctor(normalImage?: string, selectedImage?: string, disableImage?: string, texType?: number);
    constructor(
      normalImage?: string,
      selectedImage?: string,
      disableImage?: string,
      texType?: number
    );

    setScale9Enabled(able: boolean);

    /**
     *  Returns button is using scale9 renderer or not.
     * @returns {Boolean}
     */
    isScale9Enabled(): boolean;

    /**
     * Sets whether ignore the widget size
     * @param {Boolean} ignore true that widget will ignore it's size, use texture size, false otherwise. Default value is true.
     * @override
     */
    ignoreContentAdaptWithSize(ignore: boolean);

    /**
     * Returns the renderer size.
     * @returns {cc.Size}
     */
    getVirtualRendererSize(): any;

    /**
     * Load textures for button.
     * @param {String} normal normal state of texture's filename.
     * @param {String} selected  selected state of texture's filename.
     * @param {String} disabled  disabled state of texture's filename.
     * @param {ccui.Widget.LOCAL_TEXTURE|ccui.Widget.PLIST_TEXTURE} texType
     */
    loadTextures(normal: string, selected: string, disabled: string, texType: any);

    /**
     * Load normal state texture for button.
     * @param {String} normal normal state of texture's filename.
     * @param {ccui.Widget.LOCAL_TEXTURE|ccui.Widget.PLIST_TEXTURE} texType
     */
    loadTextureNormal(normal: string, texType: any);

    /**
     * Load selected state texture for button.
     * @param {String} selected selected state of texture's filename.
     * @param {ccui.Widget.LOCAL_TEXTURE|ccui.Widget.PLIST_TEXTURE} texType
     */
    loadTexturePressed(selected: string, texType: any);

    /**
     * Load dark state texture for button.
     * @param {String} disabled disabled state of texture's filename.
     * @param {ccui.Widget.LOCAL_TEXTURE|ccui.Widget.PLIST_TEXTURE} texType
     */
    loadTextureDisabled(disabled: string, texType: any);

    /**
     * Sets capinsets for button, if button is using scale9 renderer.
     * @param {cc.Rect} capInsets
     */
    setCapInsets(capInsets: any);

    /**
     * Sets capinsets for button, if button is using scale9 renderer.
     * @param {cc.Rect} capInsets
     */
    setCapInsetsNormalRenderer(capInsets: any);

    /**
     *  Returns normal renderer cap insets.
     * @returns {cc.Rect}
     */
    getCapInsetsNormalRenderer(): any;

    /**
     * Sets capinsets for button, if button is using scale9 renderer.
     * @param {cc.Rect} capInsets
     */
    setCapInsetsPressedRenderer(capInsets: any);

    /**
     *  Returns pressed renderer cap insets.
     * @returns {cc.Rect}
     */
    getCapInsetsPressedRenderer(): any;

    /**
     * Sets capinsets for button, if button is using scale9 renderer.
     * @param {cc.Rect} capInsets
     */
    setCapInsetsDisabledRenderer(capInsets: any);

    /**
     * Returns disable renderer cap insets.
     * @returns {cc.Rect}
     */
    getCapInsetsDisabledRenderer(): any;

    /**
     * Gets the Virtual Renderer of widget.
     * @returns {cc.Node}
     */
    getVirtualRenderer(): any;

    /**
     * Changes if button can be clicked zoom effect.
     * @param {Boolean} enabled
     */
    setPressedActionEnabled(enabled: boolean);

    /**
     * Sets title text to ccui.Button
     * @param {String} text
     */
    setTitleText(text: string);

    /**
     * Returns title text of ccui.Button
     * @returns {String} text
     */
    getTitleText(): string;

    /**
     * Sets title color to ccui.Button.
     * @param {cc.Color} color
     */
    setTitleColor(color: any);

    /**
     * Returns title color of ccui.Button
     * @returns {cc.Color}
     */
    getTitleColor();

    /**
     * Sets title fontSize to ccui.Button
     * @param {cc.Size} size
     */
    setTitleFontSize(size: any);

    /**
     * Returns title fontSize of ccui.Button.
     * @returns {Number}
     */
    getTitleFontSize(): number;

    /**
     * When user pressed the button, the button will zoom to a scale.
     * The final scale of the button  equals (button original scale + _zoomScale)
     * @since v3.2
     * @param scale
     */
    setZoomScale(scale: any);

    /**
     * Returns a zoom scale
     * @since v3.2
     * @returns {number}
     */
    getZoomScale(): number;

    /**
     * Returns the normalize of texture size
     * @since v3.3
     * @returns {cc.Size}
     */
    getNormalTextureSize(): any;

    /**
     * Sets title fontName to ccui.Button.
     * @param {String} fontName
     */
    setTitleFontName(fontName: string);

    /**
     * Get the title renderer.
     * title ttf object.
     * @returns {cc.LabelTTF}
     */
    getTitleRenderer(): any;

    /**
     * Gets title fontName of ccui.Button.
     * @returns {String}
     */
    getTitleFontName(): string;

    /**
     * Returns the "class name" of widget.
     * @override
     * @returns {string}
     */
    getDescription(): string;

    static create(
      normalImage: string,
      selectedImage: string,
      disableImage: string,
      texType: string
    );

    static NORMAL_RENDERER_ZORDER: number;
    static PRESSED_RENDERER_ZORDER: number;
    static DISABLED_RENDERER_ZORDER: number;
    static TITLE_RENDERER_ZORDER: number;
    static ZOOM_ACTION_TIME_STEP: number;
    static SYSTEM: number;
    static TTF: number;
  }
}
