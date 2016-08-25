// moment.d.ts by Michael Lakerveld

// Source: http://momentjs.com/docs/

// TODO customize         http://momentjs.com/docs/#/customization/
// TODO plugins           http://momentjs.com/docs/#/plugins/
// TODO lang definition   http://momentjs.com/docs/#/i18n/

interface MomentInput {
    years?: number;
    y?: number;
    months?: number;
    M?: number;
    weeks?: number;
    w?: number;
    days?: number;
    d?: number;
    hours?: number;
    h?: number;
    minutes?: number;
    m?: number;
    seconds?: number;
    s?: number;
    milliseconds?: number;
    ms?: number;
}

interface Duration {

    humanize(): string;

    milliseconds(): number;
    asMilliseconds(): number;

    seconds(): number;
    asSeconds(): number;

    minutes(): number;
    asMinutes(): number;

    hours(): number;
    asHours(): number;

    days(): number;
    asDays(): number;

    months(): number;
    asMonths(): number;

    years(): number;
    asYears(): number;

}

interface Moment {

    format(format: string): string;
    format(): string;

    fromNow(): string;

    startOf(soort: string): Moment;
    endOf(soort: string): Moment;

    add(input: MomentInput): Moment;
    add(aantal: number, soort: string): Moment;
    substract(input: MomentInput): Moment;
    substract(aantal: number, soort: string): Moment;

    calendar(): string;

    valueOf(): string;

    local(): Moment; // current date/time in local mode

    utc(): Moment; // current date/time in UTC mode

    isValid(): boolean;

    year(y: number): Moment;
    year(): number;
    quarter(): number;
    quarter(q: number): Moment;
    month(M: number): Moment;
    month(M: string): Moment;
    month(): number;
    week(): number;
    week(d: number): Moment;
    day(d: number): Moment;
    day(d: string): Moment;
    day(): number;
    date(d: number): Moment;
    date(): number;
    hour(h: number): Moment;
    hour(): number;
    hours(h: number): Moment;
    hours(): number;
    minute(m: number): Moment;
    minute(): number;
    minutes(m: number): Moment;
    minutes(): number;
    second(s: number): Moment;
    second(): number;
    seconds(s: number): Moment;
    seconds(): number;
    millisecond(ms: number): Moment;
    millisecond(): number;
    milliseconds(ms: number): Moment;
    milliseconds(): number;

    sod(): Moment; // Start of Day
    eod(): Moment; // End of Day

    from(f: Moment): string;
    from(f: Moment, suffix: boolean): string;
    from(d: Date): string;
    from(s: string): string;

    diff(b: Moment): number;
    diff(b: Moment, soort: string): number;
    diff(b: Moment, soort: string, round: boolean): number;

    toDate(): Date;
    unix(): number;

    isLeapYear(): boolean;
    zone(): number;
    daysInMonth(): number;
    isDST(): boolean;

    lang(language: string);
    lang(reset: boolean);
    lang(): string;

}


/*
    Static members of moment
*/
interface MomentStatic {

    (): Moment;
    (date: string): Moment;
    (date: string, time: string): Moment;
    (date: Date): Moment;
    (clone: Moment): Moment;
    (unix_timestamp: number): Moment;

    clone(): Moment;
    unix(timestamp: number): Moment;

    utc(): Moment; // current date/time in UTC mode
    utc(Number: number): Moment; // milliseconds since the Unix Epoch in UTC mode
    utc(array: number[]): Moment; // parse an array of numbers matching Date.UTC() parameters
    utc(String: string): Moment; // parse string into UTC mode
    utc(String1: string, String2: string): Moment; // parse a string and format into UTC mode

    isMoment(m: any): boolean;
    lang(language: string);
    lang(language: string, definition: any); // TODO definition


    duration(milliseconds: Number): Duration;
    duration(num: Number, soort: string): Duration;
    duration(input: MomentInput): Duration;

}

declare var moment: MomentStatic;
