///-----------------------------------------------------------------------------------------------------------------
/// vuePlotTypes.ts.  Copyright (c) 2012 Microsoft Corporation.
///    - a TypeScript wrapper for VuePlot library (library is written in TypeScript and JavaScript).
///-----------------------------------------------------------------------------------------------------------------
/// Note: documentation for all TypeScript functions, interfaces, etc. should use 
/// JSDoc conventions.

interface IGroupData
{
    key: string;
    values: any[];
}

/** used to extend arrays with new functions. */
interface Array<T>
{
    groupBy(groupCol: string): T[];
    selectWithFunc(callback: any): T[];
    where(itemFunc?: any): T[];

    remove(elem: any): void;
    min(itemFunc?: any): number;
    max(itemFunc?: any): number;
    sum(itemFunc?: any): number;
}

enum LabelFit
{
    /** Just draw all labels and let any overlaps happen */
    drawAll,

    /** Skip 0-N labels, as needed, to make the others fit without overlap */
    skip,

    /** Truncate labels, as needed, so that they don't exceed their available space. */
    truncate,

    /** If all labels cannot be drawn without overlap, rotate the labels 45 degrees to allow them to fit better. */
    rotate45,

    /** If all labels cannot be drawn without overlap, rotate the labels 90 degrees to allow them to fit better. */
    rotate90,

    /** If all labels cannot be drawn without overlap, rotate the labels 45 or 90 degrees to allow them to fit better. */
    rotateAuto,

    /** If all labels cannot be drawn without overlap, hide them all. */
    hideAll,
};

enum dodgeAxis
{
    none,
    x,
    y,
}

enum shapeType
{
    asterisk,
    circle,
    diamond,
    hexagram,
    pentagram,
    plus,
    plusInDiamond,
    plusInCircle,
    plusInSquare,
    square,
    triangleUp,
    triangleDown,
    triangleLeft,
    triangleRight,
    triangleUpDown,
    triangleInSquare,
    x,
    xInCircle,
    xInSquare,
}

/// Note: one way to support chaining of these functions in derrived
/// classes is to redefine them on each interface (which works, but you have to 
/// include all overloads of that same function in each derrived class).
///
/// Another way is to make this class generic and accept the outer class
/// as the T argument.  That's the current definition you see here.  In 
/// C# version of VuePlot, we tried this and is was a mess.  So far, for 
/// TypeScript and our simpler class structure, its works OK.  rfernand, 06/05/2013.

/** a wrapper for 1 or more HTML, SVG, or Canvas objects. */
interface IWrapperFuncs<T>
{
    //---- PROPERTIES ----
    bounds(x: number, y: number, width: number, height: number): T;
    colors(fill: string, stroke: string, strokeWidth: any): T;

    text(): string;
    text(value: string): T;

    title(): string;
    title(value: string): T;

    //valuex(): string;
    //valuex(value: string): T;

    html(): string;
    html(value: string): T;

    show(): boolean;
    show(value: boolean): T;

    hide(): boolean;
    hide(value: boolean): T;

    data(): any[];
    data(value: any[]): T;

    collapse(): boolean;
    collapse(value: boolean): T;

    expand(): boolean;
    expand(value: boolean): T;

    dataIndex(): number;
    dataIndex(value: number): T;

    dataItem(): any;
    dataItem(value: any): T;

    transform(): string;
    transform(value: string): T;

    transformOrigin(): string;
    transformOrigin(value: string): T;

    href(): string;
    href(value: string): T;

    safeHref(): string;
    safeHref(value: string): T;

    id(): string;
    id(value: string): T;

    opacity(): number;
    opacity(value: number): T;

    radius(): number;
    radius(value: number): T;

    tabIndex(): string;
    tabIndex(value: string): T;

    width(): number;
    width(value: number): T;

    height(): number;
    height(value: number): T;

    totalHeight(): number;
    totalHeight(value: number): T;

    totalWidth(): number;
    totalWidth(value: number): T;

    left(): number;
    left(value: number): T;

    top(): number;
    top(value: number): T;

    checked(): number;
    checked(value: number): T;

    attr(name: string): string;
    attr(name: string, value: string): T;

    customAttr(name: string): string;
    customAttr(name: string, value: string): T;

    prop(name: string): string;
    prop(name: string, value: string): T;

    css(name: string): string;
    css(name: string, value: string): T;

    background(): string;
    background(value: string): T;

    dataId(): string;
    dataId(value: string): T;

    shapeId(): string;
    shapeId(value: string): T;

    toolTipEnabled(): boolean;
    toolTipEnabled(value: boolean): T;


    //---- METHODS ----
    elem(): HTMLElement;
    showToggle(): T;
    dataPair(dataItem: any, dataIndex: number): T;
    from(x: number, y: number): T;
    to(x: number, y: number): T;
    font(family: string, size: string, weight: string, style: string): T;
    getBounds(relToParent: HTMLElement): any;
    center(x: number, y: number): T;
    position(x: number, y: number): T;
    absPosition(left: number, top: number): T;

    setClass(value: string): T;
    hasClass(value: string): boolean;
    addClass(value: string): T;
    removeClass(value: string): T;
    toggleClass(value: string): T;

    translate(x: number, y: number): T;
    attach(name: string, callback: any): T;
    detach(name: string, callback: any): T;

    //--- obsolete ----
    //dataBind(bindingName: string, data: any[], pkFunc: any, isNewData: boolean): T;

    append(otherElem: string): T;
    append<T>(elem: T): T;

    add(otherElem: string): T;
    add<T>(elem: T): T;

    prepend(otherElem: string): T;
    prepend<T>(elem: T): T;

    insertBefore(otherElem: string): T;
    insertBefore<T>(elem: T): T;

    insertAfter(otherElem: string): T;
    insertAfter<T>(elem: T): T;

    clear(): T;
    remove(): T;

    addStop(offset: number, color: string, opacity?: number): T;
    addStop(offset: string, color: string, opacity?: number): T;
    animate(duration: number, ease: any, container: any): T;
    frameRateChanged(callback: any): T;
    merge(elem: any): T;
    toArray(): HTMLElement[];
    any(index: number): HTMLElement;
    kids(index: number): T;
    each(callback: any): T;
    elementSizes(callback: any): T;
    focus(y): T;
}

interface IWrapper extends IWrapperFuncs<IWrapper>
{
}

/** base interface for visual controls. */
interface IControlFuncs<T> extends IWrapperFuncs<T>
{
}

interface IControl extends IControlFuncs<IControl>
{
}

/** axis options, usually set by layer objects */
interface IVueAxis
{
    isAxisVisible(): boolean;
    isAxisVisible(boolean): IVueAxis;
}

interface IAttribute
{
    /** the constant value of the attribute. */
    value(): any;
    value(value: any): IAttribute;

    /** the column name(s) that supplies data for the attribute. */
    colName(): string[];
    colName(value: string): IAttribute;
    colName(value: string[]): IAttribute;

    /** when defined, treats input values as dates and formats them according to this value */
    dateFormat(): string;
    dateFormat(value: string): IAttribute;

    /** when true, and when isDiscrete is true, duplicate input values are treated as the same value. */
    mergeDuplicateCategories(): boolean;
    mergeDuplicateCategories(value: boolean): IAttribute;

    /** when true, breaks are calculated so that they are integers */
    useIntOnlyBreaks(): boolean;
    useIntOnlyBreaks(value: boolean): IAttribute;

    /** when false, don't draw the legend (or axis+label) for this attribute. */
    isLegendVisible(): boolean;
    isLegendVisible(value: boolean): IAttribute;

    /** when true, domain min (or max in some cases) is set to zero. */
    useZeroForDomainMin(): boolean;
    useZeroForDomainMin(value: boolean): IAttribute;

    /** when true, values for axis/legend breaks use "nice numbers". */
    useNiceNumbers(): boolean;
    useNiceNumbers(value: boolean): IAttribute;

    /** if true, adds space at maximum of domainMax to allow for labels and shapes. */
    addHeadRoom(): number;
    addHeadRoom(value: number): IAttribute;

    /** space (in pixels) to add to each end of the axis. */
    expandSpace(): number;
    expandSpace(value: number): IAttribute;

    /** specifies the number of ticks or breaks in the associated axis/legend. */
    tickCount(): number;
    tickCount(value: number): IAttribute;

    /** overrides the minimum value for scaling of the input data. */
    domainMin(): number;
    domainMin(value: number): IAttribute;

    /** overrides the maximum value for scaling of the input data. */
    domainMax(): number;
    domainMax(value: number): IAttribute;

    /** sets the spacing of bars/columns as percentage of total per item area. */
    percentGap(): number;
    percentGap(value: number): IAttribute;

    /** allows caller to override the default formatting function to use when labeling the associated axis/legend. */
    formatter(): any;
    formatter(value: any): IAttribute;

    /** allows caller to override the default formatting function to use when labeling the associated axis/legend. */
    numDecimalPlaces(): number;
    numDecimalPlaces(value: number): IAttribute;

    /** allows caller to override the default values in the input space used to draw the 
     "tick" locations for the axis or legend associated with this attribute. 
     For discrete attributes, this should be an array of record indexes (0-relative).
     For the "_seriesIndex" attribute, this should be an array of record indexes (0-relative).
     For all other attributes, this should be an array of input values.
     */
    breaks(): number[];
    breaks(value: number[]): IAttribute;

    /** allows caller to override the default string labels that correspond to each of the breaks for this attribute. */
    labels(): number[];
    labels(value: number[]): IAttribute;

    /** the title displayed on the axis or legend for this attribute. */
    title(): string;
    title(value: string): IAttribute;

    /** if true, values should be reversed in the legend associated with this attribute */
    flipInLegend(): boolean;
    flipInLegend(value: boolean): IAttribute;

    /** true if the attibute's scale should be a discrete (vs. continuous) scale. */
    isDiscrete(): boolean;
    isDiscrete(value: boolean): IAttribute

    /** an array of values that defines the set of mapped outputs for this attribute */
    palette(): any[];
    palette(value: any[]): IAttribute;

    /** returns the scale associated with this attribute. */
    scale(): IScale;

    /** returns the layer that owns this attribute. */
    pop();
}

interface IScale
{
    /** Allows caller to override normal percent-to-color mapping with his own mapping.  */
    mappingCallback(): any;
    mappingCallback(value: any): IScale;

    /** maps an input (domain) value to an output (range) value.  Range values are defined by the palette property. */
    scale(value: any): any;
}

interface ICommonAttributes<T>
{
    //---- mappings properties ----
    x(): IAttribute;
    x(value: any): T;

    y(): IAttribute;
    y(value: any): T;

    /** returns the stroke (line color) attribute object.    */
    stroke(): IAttribute;
    /** sets the stroke (line/outline) attribute properties.
      * @param value a color string, an array of colNames, or a name/value object, e.g., "orange", or "['sales']".
      */
    stroke(value: any): T;

    /** returns the fill (color) attribute object.    */
    fill(): IAttribute;
    /** sets the fill (color) attribute properties.
      * @param value a color string, an array of colNames, or a name/value object, e.g., "orange", or "['sales']".
      */
    fill(value: any): T;

    /** returns the fill (color) attribute object for layers with a text object.    */
    textFill(): IAttribute;
    /** sets the text fill (color) attribute properties.
      * @param value a color string, an array of colNames, or a name/value object, e.g., "orange", or "['sales']".
      */
    textFill(value: any): T;

    /** returns the stackType for the layer.  Controls how multiple series are arranged in a layer. */
    stackType(): string;
    /** sets the stackType for the layer. Controls how multiple series are arranged in a layer.
      * @param value the new stackType value.  It should be one of the strings: "dodge", "fill", "stack", or "identity".
      */
    stackType(value: string): T;

    /** returns the lineType (pattern used to draw lines/outlines) atttribute object. */
    lineType(): IAttribute;
    /** sets the (constant) pattern used to draw lines/outlines.  
      * @param value the new pattern.  It should be one of the predefined patterns ("blank", "solid", "dashed", "dotted", "dotDash", "longDash", "twoDash")
        or a custom pattern string.  Or it can be set to an array of colNames (e.g., ["sales"]).  Or, it can be set to an object 
        containing key/value pairs for various attribute properties (e.g., {colName: "sales", isDiscrete: true}). 
      */
    lineType(value?: any): T;

    opacity(): IAttribute;
    opacity(value: any): T;

    shapeType(): IAttribute;
    shapeType(value: any): T;

    lineSize(): IAttribute;
    lineSize(value: any): T;

    textSize(): IAttribute;
    textSize(value: any): T;

    label(): IAttribute;
    label(value?: any): T;

    yMin(): number;
    yMin(value: number): T;

    yMax(): number;
    yMax(value: number): T;
}

interface IToolTipFormatter
{
    (value: any, colName: string, seriesIndex: number): string;
}

/** base interface for a plot layer */
interface ILayer<T> extends ICommonAttributes<T>
{
    container(): any;
    container(value: any): ILayer<T>;

    toolTipsCols(): any;
    toolTipCols(value: any): ILayer<T>;

    /* 'value' should be a function of the form: formatValue(value, colName, seriesIndex). **/
    toolTipFormatter(): IToolTipFormatter;
    toolTipFormatter(value: IToolTipFormatter): ILayer<T>;

    stat(): any;
    stat(value: any): ILayer<T>;

    data(): any[];
    data(value: any[]): ILayer<T>;

    data2(): any[];
    data2(value: any[]): ILayer<T>;

    key(): any;
    key(value: any): ILayer<T>;

    key2(): any;
    key2(value: any): ILayer<T>;

    isAnimEnabled(): boolean;
    isAnimEnabled(value: boolean): ILayer<T>;

    yIntercept(): any;
    yIntercept(value: any): ILayer<T>;

    slope(): any;
    slope(value: any): ILayer<T>;

    /** returns X-axis options object */
    xAxisInfo(): IVueAxis;

    /** returns Y-axis options object */
    yAxisInfo(): IVueAxis;

    /** returns the plot parent that owns this layer */
    pop(): IPlot;

}

interface IBaseLayer extends ILayer<IBaseLayer>
{
}


/** interface for a plot */
interface IPlot extends IControlFuncs<IPlot>
{
    markRebuildNeeded(): IPlot;

    onError(): any;
    onError(value: any): IPlot;

    isAnimEnabled(): boolean;
    isAnimEnabled(value: boolean): IPlot;

    isUiEnabled(): boolean;
    isUiEnabled(value: boolean): IPlot;

    isHoverEnabled(): boolean;
    isHoverEnabled(value: boolean): IPlot;

    isSelectionEnabled(): boolean;
    isSelectionEnabled(value: boolean): IPlot;

    isTooltipEnabled(): boolean;
    isTooltipEnabled(value: boolean): IPlot;

    isXAxisVisible(): boolean;
    isXAxisVisible(value: boolean): IPlot;

    isXGridVisible(): boolean;
    isXGridVisible(value: boolean): IPlot;

    isYAxisVisible(): boolean;
    isYAxisVisible(value: boolean): IPlot;

    isYGridVisible(): boolean;
    isYGridVisible(value: boolean): IPlot;

    xLabelFit(): LabelFit;
    xLabelFit(value: LabelFit): IPlot;

    isTitleVisible(): boolean;
    isTitleVisible(value: boolean): IPlot;

    isLegendVisible(): boolean;
    isLegendVisible(value: boolean): IPlot;

    shapesEnterFromBottom(): boolean;
    shapesEnterFromBottom(value: boolean): IPlot;

    showRibbon(): boolean;
    showRibbon(value: boolean): IPlot;

    title(): string;
    title(value: string): IPlot;

    stackType(): string;
    stackType(value: string): IPlot;

    xLimit(): any;
    xLimit(value: number): IPlot;
    xLimit(value: number[]): IPlot;

    yLimit(): any;
    yLimit(value: number): IPlot;
    yLimit(value: number[]): IPlot;

    selectCallback(): any;
    selectCallback(value: any): IPlot;

    rebuildCallback(): any;
    rebuildCallback(value: any): IPlot;

    //tooltip(): any;
    //tooltip(value: any): IPlot;

    frameMargins(): any;
    frameMargins(value: any): IPlot;

    useStdTooltips(): boolean;
    useStdTooltips(value: boolean): IPlot;

    postCreateCallback(): IEventCallback;
    postCreateCallback(value: IEventCallback): IPlot;

    /** the outer-most SVG document for the chart */
    svgRoot(): IWrapper;

    /** the sub-SVG document for the shapes */
    shapesDoc(): IWrapper;

    /** the shapes group */
    shapesGroup(): IWrapper;
}

/** interface for a table-based dataq grid. */
interface IDataGrid extends IControlFuncs<IDataGrid>
{
    showHeader(): boolean;
    showHeader(value: boolean): IDataGrid;

    showAltLines(): boolean;
    showAltLines(value: boolean): IDataGrid;

    showDividers(): boolean;
    showDividers(value: boolean): IDataGrid;

    boldFirstColumn(): boolean;
    boldFirstColumn(value: boolean): IDataGrid;

    isHeaderLocked(): boolean;
    isHeaderLocked(value: boolean): IDataGrid;

    columnNames(): string[];
    columnNames(value: string[]): IDataGrid;

    data(): any[];
    data(value: any[]): IDataGrid;

    rootElement(): HTMLElement;
    buildNow();            // rebuild the data grid control
}

interface IFastColumnInfo
{
    hdrName: string;
    dataName: string;
    hdrAlign: string;
    dataAlign: string;
    requestedWidth: number;
    actualWidth: number;
}

/** interface for a virtualized data grid, capable of binding and scrolling up to 1 million records quickly. */
interface IFastDataGrid extends IControlFuncs<IFastDataGrid>
{
    showHeader(): boolean;
    showHeader(value: boolean): IFastDataGrid;

    showAltLines(): boolean;
    showAltLines(value: boolean): IFastDataGrid;

    showRowDividers(): boolean;
    showRowDividers(value: boolean): IFastDataGrid;

    showColumnDividers(): boolean;
    showColumnDividers(value: boolean): IFastDataGrid;

    boldFirstColumn(): boolean;
    boldFirstColumn(value: boolean): IFastDataGrid;

    useMaxColumnWidths(): boolean;
    useMaxColumnWidths(value: boolean): IFastDataGrid;

    maxColumnWidth(): number;
    maxColumnWidth(value: number): IFastDataGrid;

    columnInfo(): IFastColumnInfo[];
    columnInfo(value: IFastColumnInfo[]): IFastDataGrid;

    data(): any[];
    data(value: any[]): IFastDataGrid;

    rootElement(): HTMLElement;
}

/** interface for a control to create groups ("slices") based on a specified column's values. */
interface ITimeSlicer extends IControlFuncs<ITimeSlicer>
{
    timeColumn(): string;
    timeColumn(value: string): ITimeSlicer;

    sliceDuration(): number;
    sliceDuration(value: number): ITimeSlicer;

    data(): any[];
    data(value: any[]): ITimeSlicer;

    rootElement(): HTMLElement;
    hookOnChange(callback: any): ITimeSlicer;
    getDataSlice(): any[];
    getDataKey(): string;
    play(): ITimeSlicer;
    stop(): ITimeSlicer;
}


/** interface for a vertical or horizontal slider control */
interface ISlider extends IControlFuncs<ISlider>
{
    min(): number;
    min(value: number): ISlider;

    max(): number;
    max(value: number): ISlider;

    increment(): number;
    increment(value: number): ISlider;

    value(): number;
    value(value: number): ISlider;

    trackWidth(): number;
    trackWidth(value: number): ISlider;

    trackHeight(): number;
    trackHeight(value: number): ISlider;
}

interface IGridContainer extends IControl
{
    layout(): void;
    extendWrapper(wrapper): void;
    element(): HTMLElement;

    //---- properties ----

    colCount(): number;
    colCount(value: number): IGridContainer;

    rowCount(): number;
    rowCount(value: number): IGridContainer;

    cellMargin(): number;
    cellMargin(value: number): IGridContainer;
}

/** used for creating visual objects */
interface VisualsNamespace
{
    createDataGrid(): IDataGrid;
    createFastDataGrid(): IFastDataGrid;
    createTimeSlicer(): ITimeSlicer;
    createGridContainer(): HTMLElement;
    createGridContainerWrapped(): IGridContainer;
    createPlot(): IPlot;

    categoryAxis(): IControl;
    gridLines(): IControl;
    legend(): IControl;
    numericAxis(): IControl;
    ribbonBar(): IControl;
    ribbonGroup(): IControl;
    scrollbar(): IControl;
    scrollViewer(): IControl;
    slider(): ISlider;
    horizontalSlider(): ISlider;
    verticalSlider(): ISlider;
}

/** interface for a column layer of a plot */
interface IColumnLayer extends ILayer<IColumnLayer>
{
    /** returns the current value of the 'percentGap' property.  This is the percentage of the total bar space
    that will be left empty */
    percentGap(): number;
    /** sets the value of percentGap property.
     * @param value the percentage of the total bar space that will be left empty.  Defaults to '.5'.
    */
    percentGap(value: number): IColumnLayer;
}

/** interface for a TEXT layer of a plot */
interface ITextLayer extends ILayer<ITextLayer>
{
    /** returns the current value of the 'dodgeAxis' property. */
    dodgeAxis(): dodgeAxis;

    /** sets the value of dodgeAxis property, to allow text position to match position of column/bar layers. */
    dodgeAxis(value: dodgeAxis): IColumnLayer;
}

/** interface for a TEXT layer of a plot */
interface IPointLayer extends ILayer<IPointLayer>
{
    /** returns the current value of the 'dodgeAxis' property. */
    dodgeAxis(): dodgeAxis;

    /** sets the value of dodgeAxis property, to allow text position to match position of column/bar layers. */
    dodgeAxis(value: dodgeAxis): IColumnLayer;
}

/** interface for a density layer of a plot */
interface IDensityLayer extends ILayer<IDensityLayer>
{
    /** returns the current value of binPercent property. */
    binPercent(): number;
    /** sets the current value of binPercent property.
     * @param value this is used to calculate the number of bins for histogram binning, e.g., 
    binPercent of ".1" for 100 samples gives binSize = 10 samples".
    */
    binPercent(value: number): IDensityLayer;
}

/** interface for a histogram layer of a plot */
interface IHistogramLayer extends ILayer<IHistogramLayer>
{
    /** returns the current value of binPercent property. */
    binPercent(): number;
    /** sets the current value of binPercent property.
     * @param value this is used to calculate the number of bins for histogram binning, e.g., 
    binPercent of ".1" for 100 samples gives binSize = 10 samples".
    */
    binPercent(value: number): IHistogramLayer;

    /** returns the current value of the 'forceCategory' property. */
    forceCategory(): boolean;
    /** sets the value of the 'forceCategory' property.
     * @param value when set to "true", forces data to be treated as category (string) data.
    */
    forceCategory(pct: boolean): IHistogramLayer;

    /** returns the current value of the 'usePercent' property. */
    usePercent(): boolean;
    /** sets the value of the 'usePercent' property.
     * @param value when set to "true", data is plotted as a percent of the total.
    */
    usePercent(pct: boolean): IHistogramLayer;

    /** returns the current value of the 'niceBuckets' property. */
    niceBuckets(): boolean;
    /** sets the value of the 'niceBuckets' property.
     * @param value when set to "true", data buckets use nice numbers for the min/max value range.
    */
    niceBuckets(pct: boolean): IHistogramLayer;
}

/** interface for a histogram2d layer of a plot */
interface IHistogram2dLayer extends ILayer<IHistogram2dLayer>
{
    /** returns the current value of the 'xBinCount' property. */
    xBinCount(): number;
    /** sets the value of the 'xBinCount' property.
     * @param value specifies the number of samples in each X axis bin.
    */
    xBinCount(value: number): IHistogram2dLayer;

    /** returns the current value of the 'yBinCount' property. */
    yBinCount(): number;
    /** sets the value of the 'yBinCount' property.
     * @param value specifies the number of samples in each Y axis bin.
    */
    yBinCount(value: number): IHistogram2dLayer;

    /** returns the current value of the 'xForceCategory' property. */
    xForceCategory(): boolean;
    /** sets the value of the 'xForceCategory' property.
     * @param value when set to "true", forces X-axis data to be treated as category (string) data.
    */
    xForceCategory(pct: boolean): IHistogram2dLayer;

    /** returns the current value of the 'yForceCategory' property. */
    yForceCategory(): boolean;
    /** sets the value of the 'yForceCategory' property.
     * @param value when set to "true", forces Y-axis data to be treated as category (string) data.
    */
    yForceCategory(pct: boolean): IHistogram2dLayer;

    /** returns the current value of the 'xUsePercent' property. */
    xUsePercent(): boolean;
    /** sets the value of the 'xUsePercent' property.
     * @param value when set to "true", data is plotted as a percent of the X total.
    */
    xUsePercent(pct: boolean): IHistogram2dLayer;

    /** returns the current value of the 'yUsePercent' property. */
    /// when set to "true", data is plotted as a percent of the Y total.
    yUsePercent(): boolean;
    /** sets the value of the 'yUsePercent' property.
     * @param value when set to "true", data is plotted as a percent of the Y total.
    */
    yUsePercent(pct: boolean): IHistogram2dLayer;

    /** returns the current value of the 'xNiceBuckets' property. */
    xNiceBuckets(): boolean;
    /** sets the value of the 'xNiceBuckets' property.
     * @param value when set to "true", X data buckets use nice numbers for the min/max value range.
    */
    xNiceBuckets(pct: boolean): IHistogram2dLayer;

    /** returns the current value of the 'yNiceBuckets' property. */
    yNiceBuckets(): boolean;
    /** sets the value of the 'yNiceBuckets' property.
     * @param value when set to "true", Y data buckets use nice numbers for the min/max value range.
    */
    yNiceBuckets(pct: boolean): IHistogram2dLayer;
}

/** interface for a streamGraph layer of a plot */
interface IStreamGraphLayer extends ILayer<IStreamGraphLayer>
{
    /** returns the current value of the 'useSmoothing' property. */
    useSmoothing(): boolean;
    /** sets the value of the 'useSmoothing' property.
     * @param value when set to "true", stream polygon lines are fit to data points using spline smoothing.
    */
    useSmoothing(value: boolean): IStreamGraphLayer;
}

/** interface for a spaceFill layer of a plot */
interface ISpaceFill extends ILayer<ISpaceFill>
{
    startLoc(): any;
    startLoc(value: any): ISpaceFill;

    chunking(): any;
    chunking(value: any): ISpaceFill;

    phasing(): any;
    phasing(value: any): ISpaceFill;

}

interface ITileLayer extends ILayer<ITileLayer>
{
    numCols(): number;
    numCols(value: number): ITileLayer;
}

/** used for data-related functions */
interface DataNamespace
{
    /** builds and returns an array of records whose name/vector pairs are given as key/values of the desc object.
      * @param desc object with key/value pairs that represent the data.
      */
    dataFrame(desc: any): any[];

    /** async read of data from the specified url and calls the success or fialure callback.
     * @param url the URL to be read from (file or web service).
     * @param json if true, data should be returned in JSON format.
     * @param successCallback if/when read succeeds.
     * @param failureCallback if/when read fails.
     */
    httpRead(url: string, json: boolean, successCallback: IEventCallback, failureCallback?: IEventCallback);

    /** converts contents of a CSV file to JSON format.
     * @param csvText the text contents of the CSV file.
     * @param hasHeader if true, the first line of the CSV text contains names for each column.
     * @param sepChar the character used to separate each column (in headers and in data).
     * @param findTypes if true, examines values of all records for each column, to determine column types.
     */
    csvToJson(csvText: string, hasHeader: boolean, sepChar: string, findTypes: boolean): any[];

    /** generates an array of numbers from 'from', to 'to', by 'incr'.
     * @param from start starting number.
     * @param to the ending number.  If omitted, numbers from 1 to 'from'.
     * @param incr the increment between numbers.  If omitted, defaults to '1'.
     */
    range(from: number, to?: number, incr?: number): number[];
}

/** used for creating plot layers */
interface LayersNamespace
{
    /** Creates an AB-Line layer.  Mappings: 'slope' (numeric; scalar, array, or mapped), 'yIntercept' 
    (numeric; scalar, array, or mapped).  */
    createAbLine(): IBaseLayer;

    /** Creates an Area layer.  Mappings: 'x' (optional, any), 'y' (numeric). */
    createArea(): IBaseLayer;

    /** Creates a (horizontal) Bar layer.  Mappings: 'x' (numeric) and 'y' (optional, any). */
    createBar(): IBaseLayer;

    /** Creates a BoxPlot layer.  Mappings: 'x' for grouping (optional, any), 'y' (numeric). */
    createBoxPlot(): IBaseLayer;

    /** Creates a CandleStick layer.  Mappings: 'yMin' (numeric), 'yMax' (numeric), 'yOpen' (numeric), 'yClose' (numeric). */
    createCandlestick(): IBaseLayer;

    /** Creates a (vertical) Column layer.  Mappings: 'x' (optional, any) and 'y' (numeric). */
    createColumn(): IColumnLayer;

    /** Creates a CrossBar layer.  Mappings: 'yMin' (numeric), 'yMax' (numeric), 'y' (numeric). */
    createCrossBar(): IBaseLayer;

    /** Creates a Density layer.  Mappings: 'y' (numeric). */
    createDensity(): IDensityLayer;

    /** Creates an ErrorBar layer.   Mappings: 'x' (optional, any) and 'yMin' (numeric), 'yMax' (numeric). */
    createErrorBar(): IBaseLayer;

    /** Creates a Node/Link Graph layer.   Mappings: 'x' (string) for id field in data, 
    'yMin' (string) for from field in data2, 'yMax' (string) for to field in data2. */
    createGraph(): IBaseLayer;

    /** Creates a histogram layer.  Mappings: 'y' (any). */
    createHistogram(): IHistogramLayer;

    /** Creates a 2d histogram layer.  Mappings: 'x' (any) and 'y' (any). */
    createHistogram2d(): IHistogram2dLayer;

    /** Creates a Horizontal Line layer.  Mappings: 'yIntercept' (numeric; scalar, array, or mapped). */
    createHLine(): IBaseLayer;

    /** Creates a Line layer.  Mappings: 'x' (optional, any), 'y' (numeric). */
    createLine(): IBaseLayer;

    /** Creates a LineRange layer.  Mappings: 'x' (optional, any) and 'yMin' (numeric), 'yMax' (numeric). */
    createLineRange(): IBaseLayer;

    /** Creates an OpenClose layer.  Mappings: 'yMin' (numeric), 'yMax' (numeric), 'yOpen' (numeric), 'yClose' (numeric). */
    createOpenClose(): IBaseLayer;

    /** Creates a Path layer.  Mappings: 'x' (numeric), 'y' (numeric). */
    createPath(): IBaseLayer;

    /** Creates a "pie chart" layer.  Mappings: 'x' (numeric). */
    createPieSlice(): IBaseLayer;

    /** Creates a Scatter layer.  Mappings: 'x' (numeric) and 'y' (numeric). */
    createPoint(): IPointLayer;

    /** Creates a PointRange layer.  Mappings: 'x' (optional, any) and 'yMin' (numeric), 'yMax' (numeric), 
    'y' (numeric). */
    createPointRange(): IBaseLayer;

    /** Creates a Polygon layer.  Mappings: 'x' (numeric), 'y' (numeric). */
    createPolygon(): IBaseLayer;

    /** Creates a Ribbon layer.   Mappings: 'x' (optional, any) and 'yMin' (numeric), 'yMax' (numeric). */
    createRibbon(): IBaseLayer;

    /** Creates a Segment layer.   Mappings: 'x' (numeric), 'xEnd' (numeric), 'y' (numeric), 'yEnd' (numeric). */
    createSegment(): IBaseLayer;

    /** Creates a SpaceFill layer.   Mappings: 'x' (numeric), 'fill' (optional, any), size (optional, numeric). */
    createSpaceFill(): ISpaceFill;

    /** Creates a Stem layer.   Mappings: 'x' (optional, any), y' (numeric). */
    createStem(): IBaseLayer;

    /** Creates a StepLine layer.  Mappings: 'x' (optional, any), 'y' (numeric). */
    createStep(): IBaseLayer;

    /** Creates a StreamGraph layer.  Mappings: 'x' (optional: numeric, increasing), 'y' (
    comma separated column name list). */
    createStreamGraph(): IStreamGraphLayer;

    /** Creates a Text layer.  Mappings: X (optional, any) and Y (optional, any)
    and Text (optional, any). Note: at least one of X and Y must be specified and numeric.  The Text
    attribute can be a constant or a mapped column.   */
    createText(): ITextLayer;

    /** Creates a fixed-size Tile layer.  Attribute: numCols.   */
    createTile(): IBaseLayer;

    /** Creates a Treemap layer.  Mappings: scheme a: 'x' for item id (string), 'y' for parent id (numeric);
    scheme b: there is a array of colnames as the "nameList" property of the data object; these are 
    the columns that define the hierarchial name of each item.  Optional mappings: 'size' (numeric),
    color (numeric). */
    createTreeMap(): IBaseLayer;

    /** Creates a Vertical Line layer.  Mappings: 'xIntercept' (numeric; scalar, array, or mapped). */
    createVLine(): IBaseLayer;

    /** Creates a variable sized-Tile layer.  Mappings: 'x' (numeric), 'y' (numeric). */
    createXYTile(): IBaseLayer;
}

/** standard VuePlot callback */
interface IEventCallback
{
    (evt: any): void;
}

interface IThemeCallback
{
    (partName: string, seriesIndex: number, ab: any): void;
}

interface ITheme
{
    setCallback(callback: IThemeCallback);
    seriesPalette(): any[];
    getDrawingAttributes(part: string, seriesIndex?: number): any;
}

interface IThemeMgr
{
    theme(): ITheme;
    theme(theme: ITheme): IThemeMgr;
}

interface IColorStuff
{
    themeMgr(): IThemeMgr;
    currentTheme(): ITheme;
}

/** The vuePlot library API. */
interface IVuePlot 
{
    /** Create a selection set wrapper for the specified element(s).  Returns
        the wrapper object.
      * @param selector the css-style selector, e.g., "#myId" or ".myClass". 
      */
    select(selector: string): IWrapper;

    /** Create a selection set wrapper for the specified element.  Returns
        the wrapper object.
      * @param elem the element to wrap.
      */
    select(elem: HTMLElement): IWrapper;

    /** Create a selection set wrapper for the specified window.  Returns
        the wrapper object.
      * @param elem the element to wrap.
      */
    select(elem: Window): IWrapper;

    /** Register the specified "onLoaded" callback.
      * @param callback the function to call when the document is loaded.
      */
    ready(callback: IEventCallback): void;

    colorStuff: IColorStuff;

    /** namespace for creating visual components */
    visuals: VisualsNamespace;

    /** namespace for creating plot layers */
    layers: LayersNamespace;

    /** namespace for data-related functions */
    dataStuff: DataNamespace;

    /** When set to true, vuePlot will do maximum error checking. */
    strict: boolean;

    /** When set to a function, the function is called before an error is reported. */
    onError: any;

    /** Used in vuePlot to report errors.  Calls onError(), if non-null, and then throws an exception. */
    error(msg: string);
}

declare var vp: any;                // from vuePlot.js
declare var vuePlot: IVuePlot;      // from vuePlot.js

//----- END OF typescript definitions for vuePlot ----

