const expect = chai.expect
const assert = chai.assert
//const stub = sinon.stub

const $timeline = $.fn.Timeline

describe( 'jQuery.Timeline Unit Tests', () => {
    let $el = $('<div id="myTimeline"><ul class="timeline-events"></ul></div>'),
        timelineMethods = $timeline.Constructor.prototype,
        defaultOptions  = $timeline.Constructor.Default
    
    before(() => {
        // let $jqtl = $el.Timeline()
    })
    
    beforeEach(() => {
        //
    })
    
    // private methods
    it ( '_filterScaleKeyName: Filter the given scale key name to allowed for plugin', () => {
        let filterScaleKeyName = timelineMethods._filterScaleKeyName
        
        expect( filterScaleKeyName() ).to.be.equal( 'millisecond' )
        expect( filterScaleKeyName('invalid-scale') ).to.be.equal( 'millisecond' )
        expect( filterScaleKeyName('millenniums') ).to.be.equal( 'millennium' )
        expect( filterScaleKeyName('millennia') ).to.be.equal( 'millennium' )
        expect( filterScaleKeyName('Millennium') ).to.be.equal( 'millennium' )
        expect( filterScaleKeyName('Century') ).to.be.equal( 'century' )
        expect( filterScaleKeyName('Decade') ).to.be.equal( 'decade' )
        expect( filterScaleKeyName('decennium') ).to.be.equal( 'decade' )
        expect( filterScaleKeyName('Lustrum') ).to.be.equal( 'lustrum' )
        expect( filterScaleKeyName('years') ).to.be.equal( 'year' )
        expect( filterScaleKeyName('Year') ).to.be.equal( 'year' )
        expect( filterScaleKeyName('months') ).to.be.equal( 'month' )
        expect( filterScaleKeyName('Month') ).to.be.equal( 'month' )
        expect( filterScaleKeyName('weeks') ).to.be.equal( 'week' )
        expect( filterScaleKeyName('Week') ).to.be.equal( 'week' )
        expect( filterScaleKeyName('weekdays') ).to.be.equal( 'weekday' )
        expect( filterScaleKeyName('Weekday') ).to.be.equal( 'weekday' )
        expect( filterScaleKeyName('days') ).to.be.equal( 'day' )
        expect( filterScaleKeyName('Day') ).to.be.equal( 'day' )
        expect( filterScaleKeyName('dates') ).to.be.equal( 'day' )
        expect( filterScaleKeyName('Date') ).to.be.equal( 'day' )
        expect( filterScaleKeyName('hours') ).to.be.equal( 'hour' )
        expect( filterScaleKeyName('Hour') ).to.be.equal( 'hour' )
        expect( filterScaleKeyName('quarter') ).to.be.equal( 'quarterHour' )
        expect( filterScaleKeyName('quarter-hour') ).to.be.equal( 'quarterHour' )
        expect( filterScaleKeyName('quarterhour') ).to.be.equal( 'quarterHour' )
        expect( filterScaleKeyName('half') ).to.be.equal( 'halfHour' )
        expect( filterScaleKeyName('half-hour') ).to.be.equal( 'halfHour' )
        expect( filterScaleKeyName('halfhour') ).to.be.equal( 'halfHour' )
        expect( filterScaleKeyName('minutes') ).to.be.equal( 'minute' )
        expect( filterScaleKeyName('Minute') ).to.be.equal( 'minute' )
        expect( filterScaleKeyName('seconds') ).to.be.equal( 'second' )
        expect( filterScaleKeyName('Second') ).to.be.equal( 'second' )
        expect( filterScaleKeyName('milliseconds') ).to.be.equal( 'millisecond' )
        expect( filterScaleKeyName('Millisecond') ).to.be.equal( 'millisecond' )
    })
    
    it ( '_getPluggableDatetime: Retrieve the pluggable datetime as milliseconds depend on specific preset keyword', () => {
        const getPluggableDatetime = ( preset_key, round_type = '', obj = {} ) => {
            timelineMethods._config = Object.assign( defaultOptions, obj )
            return timelineMethods._getPluggableDatetime( preset_key, round_type )
        }
        let getCorrectDatetime = timelineMethods.getCorrectDatetime,
            _nowDt  = new Date()
        
        // exceptional case as startDatetime
        expect( new Date( getPluggableDatetime( 'currently' ) ).toDateString() ).to.be.equal( _nowDt.toDateString() )
        expect( new Date( getPluggableDatetime( 'currently', '', { scale: 'day' } ) ).toDateString() ).to.be.equal( _nowDt.toDateString() )
        expect( new Date( getPluggableDatetime( 'currently', '', { scale: 'month' } ) ).toDateString() ).to.be.equal( _nowDt.toDateString() )
        // for startDatetime
        expect( new Date( getPluggableDatetime( 'currently', 'first', { scale: 'millennium' } ) ).toDateString() ).to.be.equal( new Date( _nowDt.getFullYear(), 0, 1 ).toDateString() )
        expect( new Date( getPluggableDatetime( 'currently', 'first', { scale: 'century' } ) ).toDateString() ).to.be.equal( new Date( _nowDt.getFullYear(), 0, 1 ).toDateString() )
        expect( new Date( getPluggableDatetime( 'currently', 'first', { scale: 'decade' } ) ).toDateString() ).to.be.equal( new Date( _nowDt.getFullYear(), 0, 1 ).toDateString() )
        expect( new Date( getPluggableDatetime( 'currently', 'first', { scale: 'lustrum' } ) ).toDateString() ).to.be.equal( new Date( _nowDt.getFullYear(), 0, 1 ).toDateString() )
        expect( new Date( getPluggableDatetime( 'currently', 'first', { scale: 'year' } ) ).toDateString() ).to.be.equal( new Date( _nowDt.getFullYear(), 0, 1 ).toDateString() )
        //expect( new Date( getPluggableDatetime( 'currently', 'first', { scale: 'month' } ) ).toDateString() ).to.be.equal( timelineMethods.modifyDate( _nowDt.toDateString(), (_nowDt.getDate() * -1 + 1), 'day' ).toDateString() )
        expect( new Date( getPluggableDatetime( 'currently', 'first', { scale: 'month' } ) ).toDateString() ).to.be.equal( new Date( _nowDt.getFullYear(), _nowDt.getMonth(), 1 ).toDateString() )
        expect( new Date( getPluggableDatetime( 'currently', 'first', { scale: 'week' } ) ).toDateString() ).to.be.equal( _nowDt.toDateString() )
        expect( new Date( getPluggableDatetime( 'currently', 'first', { scale: 'day' } ) ).toDateString() ).to.be.equal( _nowDt.toDateString() )
        expect( new Date( getPluggableDatetime( 'currently', 'first', { scale: 'hour' } ) ).toUTCString() ).to.be.equal( new Date( _nowDt.getFullYear(), _nowDt.getMonth(), _nowDt.getDate(), _nowDt.getHours(), 0, 0 ).toUTCString() )
        expect( new Date( getPluggableDatetime( 'currently', 'first', { scale: 'half-hour' } ) ).toUTCString() ).to.be.equal( new Date( _nowDt.getFullYear(), _nowDt.getMonth(), _nowDt.getDate(), _nowDt.getHours(), 0, 0 ).toUTCString() )
        expect( new Date( getPluggableDatetime( 'currently', 'first', { scale: 'quarter-hour' } ) ).toUTCString() ).to.be.equal( new Date( _nowDt.getFullYear(), _nowDt.getMonth(), _nowDt.getDate(), _nowDt.getHours(), 0, 0 ).toUTCString() )
        expect( new Date( getPluggableDatetime( 'currently', 'first', { scale: 'minute' } ) ).toUTCString() ).to.be.equal( new Date( _nowDt.getFullYear(), _nowDt.getMonth(), _nowDt.getDate(), _nowDt.getHours(), _nowDt.getMinutes(), 0 ).toUTCString() )
        expect( new Date( getPluggableDatetime( 'currently', 'first', { scale: 'second' } ) ).toUTCString() ).to.be.equal( new Date( _nowDt.getFullYear(), _nowDt.getMonth(), _nowDt.getDate(), _nowDt.getHours(), _nowDt.getMinutes(), _nowDt.getSeconds() ).toUTCString() )
        expect( new Date( getPluggableDatetime( '-1-2-3', 'first', { scale: 'year' } ) ).toDateString() ).to.be.equal( getCorrectDatetime('-1').toDateString() )
        expect( new Date( getPluggableDatetime( '0-1-2', 'first', { scale: 'month' } ) ).toDateString() ).to.be.equal( getCorrectDatetime('0').toDateString() )
        expect( new Date( getPluggableDatetime( '1-2-3', 'first', { scale: 'week' } ) ).toDateString() ).to.be.equal( getCorrectDatetime('1-2-3').toDateString() )
        expect( new Date( getPluggableDatetime( '74', 'first', { scale: 'day' } ) ).toDateString() ).to.be.equal( getCorrectDatetime('74').toDateString() )
        expect( new Date( getPluggableDatetime( '169-1-31', 'first', { scale: 'month' } ) ).toDateString() ).to.be.equal( getCorrectDatetime('169-1').toDateString() )
        expect( new Date( getPluggableDatetime( '794/4/5 12', 'first', { scale: 'day' } ) ).toDateString() ).to.be.equal( getCorrectDatetime('794/4/5').toDateString() )
        expect( new Date( getPluggableDatetime( '1600/10/21 10:20', 'first', { scale: 'hour' } ) ).toUTCString() ).to.be.equal( getCorrectDatetime('1600/10/21 10').toUTCString() )
        expect( new Date( getPluggableDatetime( '1847/11/30 23:59:59', 'first', { scale: 'minute' } ) ).toString() ).to.be.equal( getCorrectDatetime('1847/11/30 23:59').toString() )
        expect( new Date( getPluggableDatetime( '2010/11/9 12:34:56.789', 'first', { scale: 'second' } ) ).toString() ).to.be.equal( getCorrectDatetime('2010/11/9 12:34:56').toString() )
        // exceptional case as startDatetime
        timelineMethods._config.scale = 'day' // initialize scale
        expect( new Date( getPluggableDatetime( 'auto' ) ).toDateString() ).to.be.equal( timelineMethods.modifyDate( _nowDt, timelineMethods._config.range, 'month' ).toDateString() )
        expect( new Date( getPluggableDatetime( 'auto', '', { scale: 'day' } ) ).toDateString() ).to.be.equal( timelineMethods.modifyDate( _nowDt, timelineMethods._config.range, 'month' ).toDateString() )
        expect( new Date( getPluggableDatetime( 'auto', '', { scale: 'month' } ) ).toDateString() ).to.be.equal( new Date( _nowDt.getFullYear() + timelineMethods._config.range, _nowDt.getMonth(), 1 ).toDateString() )
        // for endDatetime
        expect( new Date( getPluggableDatetime( 'auto', 'last', { scale: 'millennium' } ) ).toDateString() ).to.be.equal( new Date( _nowDt.getFullYear() + (1000 * timelineMethods._config.range), 11, 31 ).toDateString() )
        expect( new Date( getPluggableDatetime( 'auto', 'last', { scale: 'century' } ) ).toDateString() ).to.be.equal( new Date( _nowDt.getFullYear() + (1000 * timelineMethods._config.range), 11, 31 ).toDateString() )
        expect( new Date( getPluggableDatetime( 'auto', 'last', { scale: 'decade' } ) ).toDateString() ).to.be.equal( new Date( _nowDt.getFullYear() + (100 * timelineMethods._config.range), 11, 31 ).toDateString() )
        expect( new Date( getPluggableDatetime( 'auto', 'last', { scale: 'lustrum' } ) ).toDateString() ).to.be.equal( new Date( _nowDt.getFullYear() + (10 * timelineMethods._config.range), 11, 31 ).toDateString() )
        expect( new Date( getPluggableDatetime( 'auto', 'last', { scale: 'year' } ) ).toDateString() ).to.be.equal( new Date( _nowDt.getFullYear() + (5 * timelineMethods._config.range), 11, 31 ).toDateString() )
        expect( new Date( getPluggableDatetime( 'auto', 'last', { scale: 'month' } ) ).toDateString() ).to.be.equal( new Date( _nowDt.getFullYear() + timelineMethods._config.range, _nowDt.getMonth() + 1, 0 ).toDateString() )
        expect( new Date( getPluggableDatetime( 'auto', 'last', { scale: 'week' } ) ).toDateString() ).to.be.equal( new Date( _nowDt.getFullYear(), _nowDt.getMonth() + timelineMethods._config.range, _nowDt.getDate() ).toDateString() )
        expect( new Date( getPluggableDatetime( 'auto', 'last', { scale: 'day' } ) ).toDateString() ).to.be.equal( new Date( _nowDt.getFullYear(), _nowDt.getMonth() + timelineMethods._config.range, _nowDt.getDate() ).toDateString() )
        expect( new Date( getPluggableDatetime( 'auto', 'last', { scale: 'hour' } ) ).toUTCString() ).to.be.equal( new Date( _nowDt.getFullYear(), _nowDt.getMonth(), _nowDt.getDate() + timelineMethods._config.range, _nowDt.getHours() + 1, 0, -1 ).toUTCString() )
        expect( new Date( getPluggableDatetime( 'auto', 'last', { scale: 'half-hour' } ) ).toUTCString() ).to.be.equal( new Date( _nowDt.getFullYear(), _nowDt.getMonth(), _nowDt.getDate() + timelineMethods._config.range, _nowDt.getHours() + 1, 0, -1 ).toUTCString() )
        expect( new Date( getPluggableDatetime( 'auto', 'last', { scale: 'quarter-hour' } ) ).toUTCString() ).to.be.equal( new Date( _nowDt.getFullYear(), _nowDt.getMonth(), _nowDt.getDate() + timelineMethods._config.range, _nowDt.getHours() + 1, 0, -1 ).toUTCString() )
        expect( new Date( getPluggableDatetime( 'auto', 'last', { scale: 'minute' } ) ).toString() ).to.be.equal( new Date( _nowDt.getFullYear(), _nowDt.getMonth(), _nowDt.getDate(), _nowDt.getHours() + timelineMethods._config.range, _nowDt.getMinutes() + 1, -1 ).toString() )
        expect( new Date( getPluggableDatetime( 'auto', 'last', { scale: 'second' } ) ).toString() ).to.be.equal( new Date( _nowDt.getFullYear(), _nowDt.getMonth(), _nowDt.getDate(), _nowDt.getHours(), _nowDt.getMinutes() + timelineMethods._config.range, _nowDt.getSeconds() + 1, -1 ).toString() )
        expect( new Date( getPluggableDatetime( '-12-3-4', 'last', { scale: 'year', range: null } ) ).toDateString() ).to.be.equal( getCorrectDatetime('-11-1-1').toDateString() )
        expect( new Date( getPluggableDatetime( '-1', 'last', { scale: 'year', range: 10 } ) ).toDateString() ).to.be.equal( getCorrectDatetime('-2/12/31').toDateString() )
        expect( new Date( getPluggableDatetime( '0-1-2', 'last', { scale: 'month', range: 0 } ) ).toDateString() ).to.be.equal( getCorrectDatetime('0/1/31').toDateString() )
        expect( new Date( getPluggableDatetime( '1-2-3', 'last', { scale: 'week' } ) ).toDateString() ).to.be.equal( getCorrectDatetime('1-2-3').toDateString() )
        expect( new Date( getPluggableDatetime( '74-5-6', 'last', { scale: 'day' } ) ).toDateString() ).to.be.equal( getCorrectDatetime('74/5/6').toDateString() )
        expect( new Date( getPluggableDatetime( '74/5/6 13:45', 'last', { scale: 'day' } ) ).toString() ).to.be.equal( getCorrectDatetime('74/5/6 23:59:59').toString() )
        expect( new Date( getPluggableDatetime( '1847/11/30 23:59:59', 'last', { scale: 'hour' } ) ).toString() ).to.be.equal( getCorrectDatetime('1847/11/30 23:59:59').toString() )
        expect( new Date( getPluggableDatetime( '1847/12/1 0:0:0', 'last', { scale: 'minute', range: 3 } ) ).toString() ).to.be.equal( getCorrectDatetime('1847/12/1 0:01:59').toString() )
        // general purpose case (because this case is equal to "getCorrectDatetime" method, should use that method)
        expect( new Date( getPluggableDatetime( '-12-3-4', '', { scale: 'year' } ) ).toDateString() ).to.be.equal( getCorrectDatetime('-12-3-4').toDateString() )
        expect( new Date( getPluggableDatetime( '-1', '', { scale: 'year' } ) ).toDateString() ).to.be.equal( getCorrectDatetime('-1/1/1').toDateString() )
        expect( new Date( getPluggableDatetime( '0-1-2', '', { scale: 'month' } ) ).toDateString() ).to.be.equal( getCorrectDatetime('0/1/2').toDateString() )
        expect( new Date( getPluggableDatetime( '1-2-3', '', { scale: 'week' } ) ).toDateString() ).to.be.equal( getCorrectDatetime('1-2-3').toDateString() )
        expect( new Date( getPluggableDatetime( '74-5-6', '', { scale: 'day' } ) ).toDateString() ).to.be.equal( getCorrectDatetime('74/5/6').toDateString() )
        expect( new Date( getPluggableDatetime( '74/5/6 13:45', '', { scale: 'day' } ) ).toString() ).to.be.equal( getCorrectDatetime('74/5/6 13:45').toString() )
        expect( new Date( getPluggableDatetime( '1847/11/30 23:59:59', '', { scale: 'hour' } ) ).toString() ).to.be.equal( getCorrectDatetime('1847/11/30 23:59:59').toString() )
        expect( new Date( getPluggableDatetime( '1847/12/1 0:0:0', '', { scale: 'minute' } ) ).toString() ).to.be.equal( getCorrectDatetime('1847/12/1 0:00:00').toString() )
    })
    
    // public methods as utility
    it ( 'getCorrectDatetime: This method is able to get the correct datetime instead of built in "new Date" on javascript', () => {
        let getCorrectDatetime = timelineMethods.getCorrectDatetime
        
        // numeric argument
        expect( getCorrectDatetime(-2340).toUTCString() ).to.be.equal('Wed, 31 Dec 1969 23:59:57 GMT')
        expect( getCorrectDatetime(-1).toUTCString() ).to.be.equal('Wed, 31 Dec 1969 23:59:59 GMT')
        expect( getCorrectDatetime(1).toUTCString() ).to.be.equal('Thu, 01 Jan 1970 00:00:00 GMT')
        expect( getCorrectDatetime(0).toUTCString() ).to.be.equal('Thu, 01 Jan 1970 00:00:00 GMT')
        expect( getCorrectDatetime(1559641760068).toUTCString() ).to.be.equal('Tue, 04 Jun 2019 09:49:20 GMT')
        // string argument
        expect( getCorrectDatetime('-234').toUTCString() ).to.be.equal('Wed, 01 Jan -0234 00:01:15 GMT')
        expect( getCorrectDatetime('-1').toUTCString() ).to.be.equal('Fri, 01 Jan -0001 00:01:15 GMT')
        expect( getCorrectDatetime('0').toUTCString() ).to.be.equal('Sat, 01 Jan 0000 00:01:15 GMT')
        expect( getCorrectDatetime('1').toUTCString() ).to.be.equal('Mon, 01 Jan 0001 00:01:15 GMT')
        expect( getCorrectDatetime('-234/12').toUTCString() ).to.be.equal('Mon, 01 Dec -0234 00:01:15 GMT')
        expect( getCorrectDatetime('-1/5/31').toUTCString() ).to.be.equal('Mon, 31 May -0001 00:01:15 GMT')
        expect( getCorrectDatetime('7-1').toDateString() ).to.be.equal('Mon Jan 01 0007')
        expect( getCorrectDatetime('9/2').toDateString() ).to.be.equal('Sun Feb 01 0009')
        expect( getCorrectDatetime('32-5').toDateString() ).to.be.equal('Sat May 01 0032')
        expect( getCorrectDatetime('64/3').toDateString() ).to.be.equal('Sat Mar 01 0064')
        expect( getCorrectDatetime('567/8/9').toDateString() ).to.be.equal('Sun Aug 09 0567')
        expect( getCorrectDatetime('0079/4/30 13:49:57').toUTCString() ).to.be.equal('Sun, 30 Apr 0079 13:51:12 GMT')
        expect( getCorrectDatetime('1974-2-15 3').toUTCString() ).to.be.equal('Fri, 15 Feb 1974 03:00:00 GMT')
        expect( getCorrectDatetime('1998-9-26 4:56').toUTCString() ).to.be.equal('Sat, 26 Sep 1998 03:56:00 GMT')
        expect( getCorrectDatetime('2010-11-9 21:47:36').toUTCString() ).to.be.equal('Tue, 09 Nov 2010 21:47:36 GMT')
        expect( getCorrectDatetime('11223/12/31 12:34:56').toUTCString() ).to.be.equal('Sun, 31 Dec 11223 12:34:56 GMT')
        // invalid datetime
        expect( getCorrectDatetime('1974-13-14').toUTCString() ).to.be.equal('Tue, 14 Jan 1975 00:00:00 GMT')
        expect( getCorrectDatetime('1998/9/32').toUTCString() ).to.be.equal('Thu, 01 Oct 1998 23:00:00 GMT')
        expect( getCorrectDatetime('2010-11-9 25:00').toUTCString() ).to.be.equal('Wed, 10 Nov 2010 01:00:00 GMT')
        expect( getCorrectDatetime('2019/12/31 13:63').toUTCString() ).to.be.equal('Tue, 31 Dec 2019 14:03:00 GMT')
        // string as like date time
        expect( getCorrectDatetime('Wed, 31 Dec 1969 23:59:57 GMT').toUTCString() ).to.be.equal('Wed, 31 Dec 1969 23:59:57 GMT')
        expect( getCorrectDatetime('Sun Mar 31 2019').toUTCString() ).to.be.equal('Sun, 31 Mar 2019 00:00:00 GMT')
        expect( getCorrectDatetime('Sun Oct 27 2019').toUTCString() ).to.be.equal('Sat, 26 Oct 2019 23:00:00 GMT')
        expect( getCorrectDatetime('Wed Jun 28 1993 14:39:07 GMT-0600 (PDT)').toUTCString() ).to.be.equal('Mon, 28 Jun 1993 14:39:07 GMT')
        expect( getCorrectDatetime('12/19/2012, 7:00:00 PM').toUTCString() ).to.be.equal('Wed, 19 Dec 2012 19:00:00 GMT')
        // invalid argument
        expect( getCorrectDatetime('not datetime') ).to.be.null // console.warn: "not datetime" Cannot parse date because invalid format.
        expect( getCorrectDatetime() ).to.be.null // console.warn: "undefined" Cannot parse date because invalid format.
        expect( getCorrectDatetime(false) ).to.be.null // console.warn: "false" Cannot parse date because invalid format.
        expect( getCorrectDatetime('Donnerstag, 20. Dezember 2012') ).to.be.null // console.warn: "Donnerstag, 20. Dezember 2012" Cannot parse date because invalid format.
    })
    
    it ( 'getWeek: get week number as extension of Date object', () => {
        
        expect( timelineMethods.getWeek() ).to.be.false
        expect( timelineMethods.getWeek('') ).to.be.false
        expect( timelineMethods.getWeek('-1') ).to.be.equal(1)
        expect( timelineMethods.getWeek('0') ).to.be.equal(1)
        expect( timelineMethods.getWeek('1') ).to.be.equal(1)
        expect( timelineMethods.getWeek('-7/2') ).to.be.equal(6)
        expect( timelineMethods.getWeek('-1/1/7') ).to.be.equal(2)
        expect( timelineMethods.getWeek('0-3-4') ).to.be.equal(10)
        expect( timelineMethods.getWeek('1-3-4') ).to.be.equal(10)
        expect( timelineMethods.getWeek('96/12/31') ).to.be.equal(53)
        expect( timelineMethods.getWeek('1996/12/31') ).to.be.equal(53)
    })
    
    it ( 'modifyDate: Get the datetime shifted from the specified datetime by any fluctuation value', () => {
        let gCD = timelineMethods.getCorrectDatetime
        
/* GMT+0001
console.log( timelineMethods.modifyDate('1847/11/30 23:00:00',1,'hour').toString() )
console.log( timelineMethods.modifyDate('1847/12/1 0:00:00',  1,'hour').toString() )
console.log( timelineMethods.modifyDate('1847/12/1 0:00:00', -1,'hour').toString() )
console.log( timelineMethods.modifyDate('1847/12/1 1:00:00', -1,'hour').toString() )
*/
        expect( timelineMethods.modifyDate() ).to.be.false
        expect( timelineMethods.modifyDate(-1,0,'') ).to.be.false
        // modify millennium
        expect( timelineMethods.modifyDate('1',-3,'millennium') ).to.be.eql( gCD('-2999') )
        expect( timelineMethods.modifyDate('1',-1,'millennium') ).to.be.eql( gCD('-999') )
        expect( timelineMethods.modifyDate('1',+1,'millennium') ).to.be.eql( gCD('1001') )
        expect( timelineMethods.modifyDate('1',2,'millennium') ).to.be.eql( gCD('2001') )
        // modify century
        expect( timelineMethods.modifyDate('1',-3,'century') ).to.be.eql( gCD('-299') )
        expect( timelineMethods.modifyDate('1',-1,'century') ).to.be.eql( gCD('-99') )
        expect( timelineMethods.modifyDate('1',+1,'century') ).to.be.eql( gCD('101') )
        expect( timelineMethods.modifyDate('1',21,'century') ).to.be.eql( gCD('2101') )
        // modify decade
        expect( timelineMethods.modifyDate('1',-5,'decade') ).to.be.eql( gCD('-49') )
        expect( timelineMethods.modifyDate('1',-1,'decade') ).to.be.eql( gCD('-9') )
        expect( timelineMethods.modifyDate('1',+1,'decade') ).to.be.eql( gCD('11') )
        expect( timelineMethods.modifyDate('1',8,'decade') ).to.be.eql( gCD('81') )
        // modify lustrum
        expect( timelineMethods.modifyDate('1',-5,'lustrum') ).to.be.eql( gCD('-24') )
        expect( timelineMethods.modifyDate('1',-1,'lustrum') ).to.be.eql( gCD('-4') )
        expect( timelineMethods.modifyDate('1',+1,'lustrum') ).to.be.eql( gCD('6') )
        expect( timelineMethods.modifyDate('1',8,'lustrum') ).to.be.eql( gCD('41') )
        expect( timelineMethods.modifyDate('89/12', 10,'lustrum') ).to.be.eql( gCD('139/12') )
        expect( timelineMethods.modifyDate('197-3-4', -25,'lustrum') ).to.be.eql( gCD('72-3-4') )
        expect( timelineMethods.modifyDate('1984/6/10 1:23:45',3,'lustrum') ).to.be.eql( gCD('1999/6/10 1:23:45') )
        // modify year
        expect( timelineMethods.modifyDate('1',-25,'year') ).to.be.eql( gCD('-24') )
        expect( timelineMethods.modifyDate('1',-1,'year') ).to.be.eql( gCD('0') )
        expect( timelineMethods.modifyDate('1',+1,'year') ).to.be.eql( gCD('2') )
        expect( timelineMethods.modifyDate('1',48,'year') ).to.be.eql( gCD('49') )
        expect( timelineMethods.modifyDate('89/12', 13,'year') ).to.be.eql( gCD('102/12') )
        expect( timelineMethods.modifyDate('197-3-4', -12,'year') ).to.be.eql( gCD('185-3-4') )
        expect( timelineMethods.modifyDate('1984/6/10 1:23:45',3,'year') ).to.be.eql( gCD('1987/6/10 1:23:45') )
        expect( timelineMethods.modifyDate('1847/11/30',1,'year') ).to.be.eql( gCD('1848-11-30') )
        expect( timelineMethods.modifyDate('1847/12/1',-1,'year') ).to.be.eql( gCD('1846-12-1 0:01:15') ) // notice!
        // modify month
        expect( timelineMethods.modifyDate('1',-25,'month') ).to.be.eql( gCD('-2/12') )
        expect( timelineMethods.modifyDate('1',-1,'month') ).to.be.eql( gCD('0/12') )
        expect( timelineMethods.modifyDate('1',+1,'month') ).to.be.eql( gCD('1/2') )
        expect( timelineMethods.modifyDate('1',48,'month') ).to.be.eql( gCD('5/1') )
        expect( timelineMethods.modifyDate('89/12', 13,'month') ).to.be.eql( gCD('91/1') )
        expect( timelineMethods.modifyDate('197-3-4', -12,'month') ).to.be.eql( gCD('196/3/4') )
        expect( timelineMethods.modifyDate('1984/6/10 1:23:45',3,'month') ).to.be.eql( gCD('1984/9/10 1:23:45') )
        expect( timelineMethods.modifyDate('1847/11/30',1,'month') ).to.be.eql( gCD('1847/12/30') )
        expect( timelineMethods.modifyDate('1847/12/1',-1,'month') ).to.be.eql( gCD('1847/11/1 0:01:15') ) // notice!
        // modify week
        expect( timelineMethods.modifyDate('1',-53,'week') ).to.be.eql( gCD('-1/12/27') )
        expect( timelineMethods.modifyDate('1',-1,'week') ).to.be.eql( gCD('0/12/25') )
        expect( timelineMethods.modifyDate('1',+1,'week') ).to.be.eql( gCD('1/1/8') )
        expect( timelineMethods.modifyDate('1',48,'week') ).to.be.eql( gCD('1/12/3') )
        expect( timelineMethods.modifyDate('89/12/25',  1,'week') ).to.be.eql( gCD('90/1/1') )
        expect( timelineMethods.modifyDate('197-3-4', -3,'week') ).to.be.eql( gCD('197/2/11') )
        expect( timelineMethods.modifyDate('1984/6/10 1:23:45',3,'week') ).to.be.eql( gCD('1984/7/1 1:23:45') )
        expect( timelineMethods.modifyDate('1847/11/30',1,'week') ).to.be.eql( gCD('1847/12/7') )
        expect( timelineMethods.modifyDate('1847/12/1',-1,'week') ).to.be.eql( gCD('1847/11/24 0:01:15') ) // notice!
        // modify day
        expect( timelineMethods.modifyDate('1',-367,'day') ).to.be.eql( gCD('-1/12/31') )
        expect( timelineMethods.modifyDate('1',-1,'day') ).to.be.eql( gCD('0/12/31') )
        expect( timelineMethods.modifyDate('1',+1,'day') ).to.be.eql( gCD('1/1/2') )
        expect( timelineMethods.modifyDate('1',60,'day') ).to.be.eql( gCD('1/3/2') )
        expect( timelineMethods.modifyDate('89/12/25',  7,'day') ).to.be.eql( gCD('90/1/1') )
        expect( timelineMethods.modifyDate('197-3-4', -64,'day') ).to.be.eql( gCD('196/12/30') )
        expect( timelineMethods.modifyDate('1984/6/10 1:23:45',365,'day') ).to.be.eql( gCD('1985/6/10 1:23:45') )
        //expect( timelineMethods.modifyDate('1847/11/30',1,'day') ).to.be.eql( gCD('1847/12/1 0:01:15') ) // notice!
        //expect( timelineMethods.modifyDate('1847/12/1',-1,'day') ).to.be.eql( gCD('1847/11/30 0:01:15') ) // notice!
        // modify hour
        expect( timelineMethods.modifyDate('1974/2/15 0:00:00', +1,'hour') ).to.be.eql( gCD('1974/2/15 01:00:00') )
        expect( timelineMethods.modifyDate('1974/2/15 0:00:00',+24,'hour') ).to.be.eql( gCD('1974/2/16 00:00:00') )
        expect( timelineMethods.modifyDate('1974/2/15 0:00:00',+25,'hour') ).to.be.eql( gCD('1974/2/16 01:00:00') )
        expect( timelineMethods.modifyDate('1192/2/9 0:00:00', -24,'hour') ).to.be.eql( gCD('1192/2/8 00:00:00') )
        expect( timelineMethods.modifyDate('1192/2/9 0:00:00', -25,'hour') ).to.be.eql( gCD('1192/2/7 23:00:00') )
        expect( timelineMethods.modifyDate('2019/10/27',24,'hour') ).to.be.eql( gCD('2019/10/27 23:00:00') ) // DST
        expect( timelineMethods.modifyDate('2019-3-31', 24,'hour') ).to.be.eql( gCD('2019/4/01 01:00:00') ) // DST
        expect( timelineMethods.modifyDate('1/1/1 00:00:00',+3,'hour') ).to.be.eql( gCD('0001/1/01 03:00:00') )
        expect( timelineMethods.modifyDate('1-1-1 00:00:00',-2,'hour') ).to.be.eql( gCD('0000/12/31 22:00:00') )
        expect( timelineMethods.modifyDate('645/11/11 20:12:34',+3,'hour') ).to.be.eql( gCD('0645-11-11 23:12:34') )
        expect( timelineMethods.modifyDate('1192/2/9 6:00:00',  -2,'hour') ).to.be.eql( gCD('1192-02-09 04:00:00') )
        //expect( timelineMethods.modifyDate('1847/11/30 23:00:00',1,'hour') ).to.be.eql( gCD('01/12/1847, 00:02:15') ) // notice!
        //expect( timelineMethods.modifyDate('1847/12/1 0:00:00',  1,'hour') ).to.be.eql( gCD('01/12/1847, 01:01:15') ) // notice!
        //expect( timelineMethods.modifyDate('1847/12/1 0:00:00', -1,'hour') ).to.be.eql( gCD('1847-11-30 23:01:15.000Z') ) // notice!
        //expect( timelineMethods.modifyDate('1847/12/1 1:00:00', -1,'hour') ).to.be.eql( gCD('1847-12-01 00:01:15.000Z') ) // notice!
        // modify minute
        expect( timelineMethods.modifyDate('2019/10/27 0:00:00', 61,'minute') ).to.be.eql( gCD('2019/10/27 01:01:00') ) // DST
        expect( timelineMethods.modifyDate('2019-3-31 0:00:00', 120,'minute') ).to.be.eql( gCD('2019/3/31 03:00:00') ) // DST
        expect( timelineMethods.modifyDate('765-9-26 1:23:45',  +21,'minute') ).to.be.eql( gCD('0765/9/26 01:44:45') )
        expect( timelineMethods.modifyDate('1970/1/1 00:15:00', -45,'minute') ).to.be.eql( gCD('1969-12-31 23:30:00') )
        expect( timelineMethods.modifyDate('1969/12/31 23:30:00',30,'minute') ).to.be.eql( gCD('1970/1/1 00:00:00') )
        //expect( timelineMethods.modifyDate('1847/12/1 0:00:00', -2,'minute') ).to.be.eql( gCD('1847/11/30 23:58:00') ) // notice!
        //expect( timelineMethods.modifyDate('1847/12/1 0:00:00', -1,'minute') ).to.be.eql( gCD('1847/11/30 23:59:00') ) // notice!
        //expect( timelineMethods.modifyDate('1847/11/30 23:59:00',1,'minute') ).to.be.eql( gCD('1847/12/1 00:00:00') ) // notice!
        //expect( timelineMethods.modifyDate('1847/12/1 0:00:00', +1,'minute') ).to.be.eql( gCD('1847/12/1 00:01:00') ) // notice!
        // modify second
        expect( timelineMethods.modifyDate('2019/10/27 1:59:59',  1,'second') ).to.be.eql( gCD('2019/10/27 1:00:00') ) // DST
        expect( timelineMethods.modifyDate('2019-3-31 0:59:59',  +1,'second') ).to.be.eql( gCD('2019/3/31 2:00:00') ) // DST
        expect( timelineMethods.modifyDate('765-9-26 1:23:45',  +21,'second') ).to.be.eql( gCD('765/9/26 1:24:06') )
        expect( timelineMethods.modifyDate('1970/1/1 00:15:00', -45,'second') ).to.be.eql( gCD('1970/1/1 0:14:15') )
        expect( timelineMethods.modifyDate('1969/12/31 23:30:00',30,'second') ).to.be.eql( gCD('1969/12/31 23:30:30') )
        expect( timelineMethods.modifyDate('1847/12/1 0:00:00', -2,'second') ).to.be.eql( gCD('1847/11/30 23:59:58') )
        expect( timelineMethods.modifyDate('1847/12/1 0:00:00', -1,'second') ).to.be.eql( gCD('1847/11/30 23:59:59') )
        expect( timelineMethods.modifyDate('1847/11/30 23:59:59',1,'second') ).to.be.eql( gCD('1847/12/1 0:01:15') ) // notice!
        expect( timelineMethods.modifyDate('1847/12/1 0:00:00', +1,'second') ).to.be.eql( gCD('1847/12/1 0:01:16') ) // notice!
        // modify millisecond
        expect( timelineMethods.modifyDate('2019/10/27 1:59:59', 789,'millisecond') ).to.be.eql( gCD('2019-10-27 1:59:59.789') ) // DST
        expect( timelineMethods.modifyDate('2019-3-31 2:00:00', -100,'millisecond') ).to.be.eql( gCD('2019/3/31 0:59:59.900') ) // DST
        expect( timelineMethods.modifyDate('1956/12/3 0:06:01',+3456,'millisecond') ).to.be.eql( gCD('1956/12/3 0:06:04.456') )
    })
    
    it ( 'diffDate: Acquire the difference between two dates with the specified scale value', () => {
        let diffDate = timelineMethods.diffDate,
            gCD = timelineMethods.getCorrectDatetime
        
        expect( diffDate() ).to.be.false // console.warn: Cannot parse date to get difference because undefined.
        expect( diffDate('2019/1/1') ).to.be.false // console.warn: Cannot parse date to get difference because undefined.
        expect( diffDate('2019/1/1', '2019/12/31') ).to.be.false // console.warn: Cannot parse date to get difference because invalid format.
        expect( diffDate(gCD('2019/1/1'), gCD('2019/12/31')) ).to.be.a('number')
        // when case "millennium"
        expect( diffDate(gCD('0'), gCD('1000'),'millennium') ).to.be.an('object').that.to.eql({1: 1000})
        expect( diffDate(gCD('9/1'), gCD('2006/1'),'millennium') ).to.be.an('object').that.to.eql({1: 991, 2: 1000, 3: 6})
        expect( diffDate(gCD('64/1'), gCD('1970/4'),'millennium') ).to.be.an('object').that.to.eql({1: 936, 2: 970})
        expect( diffDate(gCD('325-6-30'), gCD('2015-7-1'),'millennium') ).to.be.an('object').that.to.eql({1: 675, 2: 1000, 3: 15})
        expect( diffDate(gCD('1545/12/1 0:00'), gCD('2998/3/4 23:00'),'millennium') ).to.be.an('object').that.to.eql({2: 455, 3: 998})
        expect( diffDate(gCD('1998-2-1 0:00'), gCD('2019-3-4 23:00'),'millennium') ).to.be.an('object').that.to.eql({2: 2, 3: 19})
        expect( diffDate(gCD('116/12/31 23:59:00'), gCD('2017/1/1 00:01:00'),'millennium') ).to.be.an('object').that.to.eql({1: 884, 2: 1000, 3: 17})
        // when case "century"
        expect( Object.keys( diffDate(gCD('0'), gCD('1000'),'century') ) ).to.have.lengthOf( 10 )
        expect( diffDate(gCD('9/1'), gCD('2006/1'),'century') ).to.be.an('object').that.to.include({1: 91, 11: 100, 21: 6})
        expect( diffDate(gCD('64/1'), gCD('1970/4'),'century') ).to.be.an('object').that.to.include({1: 36, 20: 70})
        expect( diffDate(gCD('325-6-30'), gCD('2015-7-1'),'century') ).to.be.an('object').that.to.include({4: 75, 21: 15})
        expect( diffDate(gCD('1545/12/1 0:00'), gCD('2998/3/4 23:00'),'century') ).to.be.an('object').that.to.include({16: 55, 30: 98})
        expect( diffDate(gCD('1998-2-1 0:00'), gCD('2019-3-4 23:00'),'century') ).to.be.an('object').that.to.eql({20: 2, 21: 19})
        // when case "decade"
        expect( Object.keys( diffDate(gCD('0'), gCD('100'),'decade') ) ).to.have.lengthOf( 10 )
        expect( diffDate(gCD('9/1'), gCD('206/1'),'decade') ).to.be.an('object').that.to.include({1: 730, 2: 3653, 3: 3652, 21: 2191})
        expect( diffDate(gCD('64/1'), gCD('397/4'),'decade') ).to.be.an('object').that.to.include({7: 2557, 40: 2557})
        expect( diffDate(gCD('325-6-30'), gCD('515-7-1'),'decade') ).to.be.an('object').that.to.include({33: 2191, 52: 1826})
        expect( diffDate(gCD('2545/12/1 0:00'), gCD('2998/3/4 23:00'),'decade') ).to.be.an('object').that.to.include({255: 2191, 300: 2922})
        expect( diffDate(gCD('1998-2-1 0:00'), gCD('2019-3-4 23:00'),'decade') ).to.be.an('object').that.to.eql({200: 1096, 201: 3652, 202: 3287})
        // when case "lustrum"
        expect( Object.keys( diffDate(gCD('0'), gCD('50'),'lustrum') ) ).to.have.lengthOf( 10 )
        expect( diffDate(gCD('0'), gCD('120'),'lustrum') ).to.be.an('object').that.to.include({1: 1826, 4: 1827, 8: 1827, 20: 1826, 24: 1827})
        expect( diffDate(gCD('9/1'), gCD('106/1'),'lustrum') ).to.be.an('object').that.to.include({2: 730, 3: 1826, 4: 1827, 22: 365})
        expect( diffDate(gCD('64/1'), gCD('194/4'),'lustrum') ).to.be.an('object').that.to.include({13: 731, 39: 1461})
        expect( diffDate(gCD('325-6-30'), gCD('415-7-1'),'lustrum') ).to.be.an('object').that.to.include({65: 365, 83: 1826})
        expect( diffDate(gCD('2745/12/1 0:00'), gCD('2998/3/4 23:00'),'lustrum') ).to.be.an('object').that.to.include({549: 365, 600: 1096})
        expect( diffDate(gCD('1998-2-1 0:00'), gCD('2019-3-4 23:00'),'lustrum') ).to.be.an('object').that.to.eql({400: 1096, 401: 1826, 402: 1826, 403: 1826, 404: 1461})
        // when case "year"
        expect( diffDate(gCD('2019/1/1'), gCD('2019/12/31'),'year') ).to.be.an('object').that.to.eql({2019: 365})
        expect( diffDate(gCD('2020-1-1'), gCD('2020-12-31'),'year') ).to.be.an('object').that.to.eql({2020: 366})
        expect( diffDate(gCD('169/3/14'), gCD('172/11/3'),'year') ).to.be.an('object').that.to.eql({169: 365, 170: 365, 171: 365, 172: 366})
        // when case "month"
        expect( diffDate(gCD('169/5/14'), gCD('170/3/3'),'month') ).to.be.an('object').that.to.eql({'169/5': 31, '169/6': 30, '169/7': 31, '169/8': 31, '169/9': 30, '169/10': 31, '169/11': 30, '169/12': 31, '170/1': 31, '170/2': 28, '170/3': 31})
        expect( diffDate(gCD('2020/1/1'), gCD('2020/2/31'),'month') ).to.be.an('object').that.to.eql({'2020/1': 31, '2020/2': 29, '2020/3': 31})
        expect( diffDate(gCD('2019-2'), gCD('2019-2'),'month') ).to.be.an('object').that.to.eql({'2019/2': 28})
        // when case "week"
        expect( timelineMethods.diffDate(gCD('2020/1/1'), gCD('2020/2/31'),'week') ).to.be.an('object').that.to.eql({'2020,1': 96,'2020,2': 168,'2020,3': 168,'2020,4': 168,'2020,5': 168,'2020,6': 168,'2020,7': 168,'2020,8': 168,'2020,9': 168,'2020,10': 48})
        expect( timelineMethods.diffDate(gCD('2019-2'), gCD('2019-2'),'week') ).to.be.an('object').that.to.eql({'2019,5': 24})
        // - further with supported on summer time (DST); That must be testing timezone of "GMT Standard Time"
        expect( timelineMethods.diffDate(gCD('2019/3/24'), gCD('2019/11/9'),'week') ).to.be.an('object').that.to.include({'2019,14': 167, '2019,44': 169})
        // when case "day"
        expect( diffDate(gCD('169/12/30'), gCD('170/1/3'),'day') ).to.be.an('object').that.to.eql({'169/12/30': 24, '169/12/31': 24, '170/1/1': 24, '170/1/2': 24, '170/1/3': 24})
        expect( Object.keys( diffDate(gCD('2020-1-29'), gCD('2020-2-31'),'day') ) ).to.have.lengthOf( 34 )
        // - further with supported on summer time (DST); That must be testing timezone of "GMT Standard Time"
        expect( diffDate(gCD('2019/3/24'), gCD('2019/11/9'),'day') ).to.be.an('object').that.to.include({'2019/3/31': 23, '2019/10/27': 25})
        // when case "weekday"
        expect( diffDate(gCD('169/12/30'), gCD('170/1/3'),'weekday') ).to.be.an('object').that.to.eql({'169/12/30': 24, '169/12/31': 24, '170/1/1': 24, '170/1/2': 24, '170/1/3': 24})
        expect( Object.keys( diffDate(gCD('2020-1-29'), gCD('2020-2-31'),'weekday') ) ).to.have.lengthOf( 34 )
        // - further with supported on summer time (DST); That must be testing timezone of "GMT Standard Time"
        expect( diffDate(gCD('2019/3/24'), gCD('2019/11/9'),'weekday') ).to.be.an('object').that.to.include({'2019/3/31': 23, '2019/10/27': 25})
        // when case "hour"
        expect( diffDate(gCD('169/12/31'), gCD('170/1/1'),'hour') ).to.be.an('object').that.to.include({'169/12/31 0': 60, '170/1/1 0': 60})
        expect( diffDate(new Date('2020-1-29 0'), new Date('2020-1-29 12'),'hour') ).to.be.false // console.warn: Cannot parse date to get difference because invalid format.
        expect( diffDate(gCD('2020-1-29 0'), gCD('2020-1-29 12'),'hour') ).to.be.an('object').that.to.include({'2020/1/29 0': 60, '2020/1/29 12': 60})
        expect( Object.keys( diffDate(gCD('1970/1/1 0:00'), gCD('1970/1/1 23:00'),'hour') ) ).to.have.lengthOf( 24 )
        expect( Object.keys( diffDate(gCD('1970/1/1 0:00'), gCD('1970/1/1 24:00'),'hour') ) ).to.have.lengthOf( 25 )
        expect( diffDate(new Date('1970-1-1 0:00'), new Date('1970-1-1 24:01'),'hour') ).to.be.false // console.warn: Cannot parse date to get difference because invalid format.
        expect( diffDate(gCD('1970-1-1 0:00'), gCD('1970-1-1 24:01'),'hour') ).to.be.an('object').that.to.include({'1970/1/2 0': 60})
        expect( diffDate(gCD('1998-1-29 5:22'), gCD('1998-1-29 14:08'),'hour') ).to.be.an('object').that.to.eql({'1998/1/29 5': 60, '1998/1/29 6': 60, '1998/1/29 7': 60, '1998/1/29 8': 60, '1998/1/29 9': 60, '1998/1/29 10': 60, '1998/1/29 11': 60, '1998/1/29 12': 60, '1998/1/29 13': 60, '1998/1/29 14': 60})
        // - further with supported on summer time (DST); That must be testing timezone of "GMT Standard Time"
        expect( diffDate(gCD('2019/3/31 0:00'), gCD('2019/3/31 2:00'),'hour') ).to.be.an('object').that.to.eql({'2019/3/31 0': 60, '2019/3/31 2': 60})
        expect( diffDate(gCD('2019/10/27 0:00'), gCD('2019/10/27 2:00'),'hour') ).to.be.an('object').that.to.include({'2019/10/27 1': 120})
        // when case "half-hour"
        
        // when case "quarter-hour"
        
        // when case "minute"
        expect( diffDate(gCD('169/12/31 23:50'), gCD('170/1/1 0:10'),'minute') ).to.be.an('object').that.to.include({'169/12/31 23:50': 60, '170/1/1 0:0': 60})
        expect( diffDate(new Date('1970-1-1 0:00'), new Date('1970-1-1 24:01'),'minute') ).to.be.false // console.warn: Cannot parse date to get difference because invalid format.
        expect( diffDate(gCD('1970-1-1 0:00'), gCD('1970-1-1 24:01'),'minute') ).to.be.an('object').that.to.include({'1970/1/1 23:59': 60, '1970/1/2 0:0': 60, '1970/1/2 0:1': 60})
        expect( Object.keys( diffDate(gCD('1970/1/1 0:00'), gCD('1970/1/1 9:59'),'minute') ) ).to.have.lengthOf( 600 )
        expect( Object.keys( diffDate(gCD('1998/1/29 5:22'), gCD('1998/1/29 7:08'),'minute') ) ).to.have.lengthOf( 107 )
        // - further with supported on summer time (DST); That must be testing timezone of "GMT Standard Time"
        expect( diffDate(gCD('2019/3/31 0:59'), gCD('2019/3/31 2:00'),'minute') ).to.be.an('object').that.to.eql({'2019/3/31 0:59': 60, '2019/3/31 2:0': 60})
        expect( diffDate(gCD('2019/10/27 0:59'), gCD('2019/10/27 2:00'),'minute') ).to.be.an('object').that.to.include({'2019/10/27 1:59': 3660})
        // when case "second"
        expect( diffDate(gCD('169/12/31 23:59:00'), gCD('170/1/1 0:01:00'),'second') ).to.be.a('object').that.to.include({'169/12/31 23:59:0': 1000, '169/12/31 23:59:59': 1000, '170/1/1 0:0:0': 1000, '170/1/1 0:1:0': 1000})
        expect( Object.keys( diffDate(gCD('1970/1/1 0:00:01'), gCD('1970/1/1 1:00:00'),'second') ) ).to.have.lengthOf( 3600 )
        // - further with supported on leap second
        expect( diffDate(gCD('2015-6-30 23:59:59'), gCD('2015-7-1 0:00:01'),'second') ).to.be.an('object').that.to.eql({'2015/6/30 23:59:59': 1000, '2015/7/1 0:0:0': 1000, '2015/7/1 0:0:1': 1000})
        expect( diffDate(gCD('2016/12/31 23:59:59'), gCD('2017/1/1 00:00:01'),'second') ).to.be.an('object').that.to.eql({'2016/12/31 23:59:59': 1000, '2017/1/1 0:0:0': 1000, '2017/1/1 0:0:1': 1000})
        // - further with supported on summer time (DST); That must be testing timezone of "GMT Standard Time"
        expect( diffDate(gCD('2019/3/31 0:59:59'), gCD('2019/3/31 2:00:00'),'second') ).to.be.an('object').that.to.eql({'2019/3/31 0:59:59': 1000, '2019/3/31 2:0:0': 1000})
        expect( diffDate(gCD('2019/10/27 1:59:58'), gCD('2019/10/27 2:00:01'),'second') ).to.be.a('object').that.to.include({'2019/10/27 1:59:59': 3601000})
        // when case "other"
        expect( diffDate(gCD('1970/1/1 0:00'), gCD('1970/1/1 23:00'),'quarterHour') ).to.be.a('number').that.to.equal( 23 * 60 * 60 * 1000 )
        expect( diffDate(gCD('1970-1-1 0:00'), gCD('1970-1-1 24:00'),'halfHour') ).to.be.a('number').that.to.equal( 24 * 60 * 60 * 1000 )
        expect( diffDate(gCD('2015-6-30 23:59:59'), gCD('2015-7-1 0:00:01'),'millisecond') ).to.equal( 2 * 1000 )
    })
    
    it ( 'getHigherScale: Retrieve one higher scale', () => {
        let getHigherScale = timelineMethods.getHigherScale
        
        expect( getHigherScale( 'millisecond' ) ).to.equal( 'second' )
        expect( getHigherScale( 'milliseconds' ) ).to.equal( 'second' )
        expect( getHigherScale( 'second' ) ).to.equal( 'minute' )
        expect( getHigherScale( 'seconds' ) ).to.equal( 'minute' )
        expect( getHigherScale( 'minute' ) ).to.equal( 'hour' )
        expect( getHigherScale( 'minutes' ) ).to.equal( 'hour' )
        expect( getHigherScale( 'hour' ) ).to.equal( 'day' )
        expect( getHigherScale( 'hours' ) ).to.equal( 'day' )
        expect( getHigherScale( 'half' ) ).to.equal( 'day' )
        expect( getHigherScale( 'halfhour' ) ).to.equal( 'day' )
        expect( getHigherScale( 'half-hour' ) ).to.equal( 'day' )
        expect( getHigherScale( 'quarter' ) ).to.equal( 'day' )
        expect( getHigherScale( 'quarterhour' ) ).to.equal( 'day' )
        expect( getHigherScale( 'quarter-hour' ) ).to.equal( 'day' )
        expect( getHigherScale( 'day' ) ).to.equal( 'week' )
        expect( getHigherScale( 'days' ) ).to.equal( 'week' )
        expect( getHigherScale( 'weekday' ) ).to.equal( 'week' )
        expect( getHigherScale( 'weekdays' ) ).to.equal( 'week' )
        expect( getHigherScale( 'week' ) ).to.equal( 'month' )
        expect( getHigherScale( 'weeks' ) ).to.equal( 'month' )
        expect( getHigherScale( 'month' ) ).to.equal( 'year' )
        expect( getHigherScale( 'months' ) ).to.equal( 'year' )
        expect( getHigherScale( 'year' ) ).to.equal( 'lustrum' )
        expect( getHigherScale( 'years' ) ).to.equal( 'lustrum' )
        expect( getHigherScale( 'lustrum' ) ).to.equal( 'decade' )
        expect( getHigherScale( 'decade' ) ).to.equal( 'century' )
        expect( getHigherScale( 'decennium' ) ).to.equal( 'century' )
        expect( getHigherScale( 'century' ) ).to.equal( 'millennium' )
        expect( getHigherScale( 'millennium' ) ).to.equal( 'millennium' )
        expect( getHigherScale( 'millenniums' ) ).to.equal( 'millennium' )
        expect( getHigherScale( 'millennia' ) ).to.equal( 'millennium' )
    })
    
    // verifyScale
    it ( 'verifyScale: Verify whether is allowed scale in the plugin', () => {
        let _now = new Date(),
            _pass = {
                millisecond: new Date().setMilliseconds( _now.getMilliseconds() + 789 ),
                second: new Date().setSeconds( _now.getSeconds() + 56 ),
                minute: new Date().setMinutes( _now.getMinutes() + 34 ),
                hour: new Date().setHours( _now.getHours() + 12 ),
                day: new Date().setDate( _now.getDate() + 32 ),
                week: new Date().setDate( _now.getDate() + 7 * 2 ),
                month: new Date().setMonth( _now.getMonth() + 3 ),
                year: new Date().setFullYear( _now.getFullYear() + 1 ),
                lustrum: new Date().setFullYear( _now.getFullYear() + 12 ),
                decade: new Date().setFullYear( _now.getFullYear() + 23 ),
                century: new Date().setFullYear( _now.getFullYear() + 345 ),
                millennium: new Date().setFullYear( _now.getFullYear() + 1234 ),
            }
        
/*
console.log( _now.getTime(), _pass )
* /
console.log( '0::ms: ', timelineMethods.verifyScale( 'millisecond', _now.getTime(), _pass.millisecond, true ) )
console.log( '1::sec:', timelineMethods.verifyScale( 'second', _now.getTime(), _pass.second, true ) )
console.log( '2::min:', timelineMethods.verifyScale( 'minute', _now.getTime(), _pass.minute, true ) )
console.log( '3::q-h:', timelineMethods.verifyScale( 'quarter-hour', _now.getTime(), _pass.hour, true ) )
console.log( '4::h-h:', timelineMethods.verifyScale( 'half-hour', _now.getTime(), _pass.hour, true ) )
console.log( '5::hou:', timelineMethods.verifyScale( 'hour', _now.getTime(), _pass.hour, true ) )
console.log( '6::day:', timelineMethods.verifyScale( 'day', _now.getTime(), _pass.day, true ) )
console.log( '7::wek:', timelineMethods.verifyScale( 'week', _now.getTime(), _pass.week, true ) )
console.log( '8::mon:', timelineMethods.verifyScale( 'month', _now.getTime(), _pass.month, true ) )
console.log( '9::yea:', timelineMethods.verifyScale( 'year', _now.getTime(), _pass.year, true ) )
console.log( 'a::lst:', timelineMethods.verifyScale( 'lustrum', _now.getTime(), _pass.lustrum, true ) )
console.log( 'b::dec:', timelineMethods.verifyScale( 'decade', _now.getTime(), _pass.decade, true ) )
console.log( 'c::cen:', timelineMethods.verifyScale( 'century', _now.getTime(), _pass.century, true ) )
console.log( 'd::mil:', timelineMethods.verifyScale( 'millennium', _now.getTime(), _pass.millennium, true ) )
/* */
        // whether or not valid scale
        expect( timelineMethods.verifyScale() ).to.be.false
        expect( timelineMethods.verifyScale( 'auto' ) ).to.be.false // console.warn: Specified an invalid "auto" scale.
        expect( timelineMethods.verifyScale( 'millisecond' ) ).to.be.true
        expect( timelineMethods.verifyScale( 'second' ) ).to.be.true
        expect( timelineMethods.verifyScale( 'minute' ) ).to.be.true
        expect( timelineMethods.verifyScale( 'quarter-hour' ) ).to.be.true
        expect( timelineMethods.verifyScale( 'half-hour' ) ).to.be.true
        expect( timelineMethods.verifyScale( 'hour' ) ).to.be.true
        expect( timelineMethods.verifyScale( 'day' ) ).to.be.true
        expect( timelineMethods.verifyScale( 'weekday' ) ).to.be.true
        expect( timelineMethods.verifyScale( 'week' ) ).to.be.true
        expect( timelineMethods.verifyScale( 'month' ) ).to.be.true
        expect( timelineMethods.verifyScale( 'year' ) ).to.be.true
        expect( timelineMethods.verifyScale( 'lustrum' ) ).to.be.true
        expect( timelineMethods.verifyScale( 'decade' ) ).to.be.true
        expect( timelineMethods.verifyScale( 'century' ) ).to.be.true
        expect( timelineMethods.verifyScale( 'millennium' ) ).to.be.true
        // retrieves that values of intervals on the scale
        // - isVLS = false
        expect( timelineMethods.verifyScale( 'millisecond', _now.getTime(), _pass.millisecond ) ).to.be.a('number').that.to.equal( 1 )
        expect( timelineMethods.verifyScale( 'second', _now.getTime(), _pass.second ) ).to.be.a('number').that.to.equal( 1000 )
        expect( timelineMethods.verifyScale( 'minute', _now.getTime(), _pass.minute ) ).to.be.a('number').that.to.equal( 60 * 1000 )
        expect( timelineMethods.verifyScale( 'quarter-hour', _now.getTime(), _pass.hour ) ).to.be.a('number').that.to.equal( 15 * 60 * 1000 )
        expect( timelineMethods.verifyScale( 'half-hour', _now.getTime(), _pass.hour ) ).to.be.a('number').that.to.equal( 30 * 60 * 1000 )
        expect( timelineMethods.verifyScale( 'hour', _now.getTime(), _pass.hour ) ).to.be.a('number').that.to.equal( 60 * 60 * 1000 )
        expect( timelineMethods.verifyScale( 'day', _now.getTime(), _pass.day ) ).to.be.a('number').that.to.equal( 24 * 60 * 60 * 1000 )
        expect( timelineMethods.verifyScale( 'weekday', _now.getTime(), _pass.day ) ).to.be.a('number').that.to.equal( 24 * 60 * 60 * 1000 )
        expect( timelineMethods.verifyScale( 'week', _now.getTime(), _pass.week ) ).to.be.a('number').that.to.equal( 7 * 24 * 60 * 60 * 1000 )
        expect( timelineMethods.verifyScale( 'month', _now.getTime(), _pass.month ) ).to.be.a('number').that.to.equal( 30.44 * 24 * 60 * 60 * 1000 )
        expect( timelineMethods.verifyScale( 'year', _now.getTime(), _pass.year ) ).to.be.a('number').that.to.equal( 365.25 * 24 * 60 * 60 * 1000 )
        expect( timelineMethods.verifyScale( 'lustrum', _now.getTime(), _pass.lustrum ) ).to.be.a('number').that.to.equal( 157788000 * 1000 )
        expect( timelineMethods.verifyScale( 'decade', _now.getTime(), _pass.decade ) ).to.be.a('number').that.to.equal( 315576000 * 1000 )
        expect( timelineMethods.verifyScale( 'century', _now.getTime(), _pass.century ) ).to.be.a('number').that.to.equal( 3155760000 * 1000 )
        expect( timelineMethods.verifyScale( 'millennium', _now.getTime(), _pass.millennium ) ).to.be.a('number').that.to.equal( 3155760000 * 10 * 1000 )
        // - isVLS = true
        expect( timelineMethods.verifyScale( 'millisecond', _now.getTime(), _pass.millisecond, true ) ).to.be.a('number')
        expect( timelineMethods.verifyScale( 'second', _now.getTime(), _pass.second, true ) ).to.be.an('object').that.to.eql( timelineMethods.diffDate( _now.getTime(), _pass.second, 'second' ) )
        expect( timelineMethods.verifyScale( 'minute', _now.getTime(), _pass.minute, true ) ).to.be.an('object').that.to.eql( timelineMethods.diffDate( _now.getTime(), _pass.minute, 'minute' ) )
        expect( timelineMethods.verifyScale( 'quarter-hour', _now.getTime(), _pass.hour, true ) ) //.to.be.an('object').that.to.eql( timelineMethods.diffDate( _now.getTime(), _pass.hour, 'quarter-hour' ) )
        expect( timelineMethods.verifyScale( 'half-hour', _now.getTime(), _pass.hour, true ) ) //.to.be.an('object').that.to.eql( timelineMethods.diffDate( _now.getTime(), _pass.hour, 'half-hour' ) )
        expect( timelineMethods.verifyScale( 'hour', _now.getTime(), _pass.hour, true ) ).to.be.an('object').that.to.eql( timelineMethods.diffDate( _now.getTime(), _pass.hour, 'hour' ) )
        expect( timelineMethods.verifyScale( 'day', _now.getTime(), _pass.day, true ) ).to.be.an('object').that.to.eql( timelineMethods.diffDate( _now.getTime(), _pass.day, 'day' ) )
        expect( timelineMethods.verifyScale( 'weekday', _now.getTime(), _pass.day, true ) ).to.be.an('object').that.to.eql( timelineMethods.diffDate( _now.getTime(), _pass.day, 'day' ) )
        expect( timelineMethods.verifyScale( 'week', _now.getTime(), _pass.week, true ) ).to.be.an('object').that.to.eql( timelineMethods.diffDate( _now.getTime(), _pass.week, 'week' ) )
        expect( timelineMethods.verifyScale( 'month', _now.getTime(), _pass.month, true ) ).to.be.an('object').that.to.eql( timelineMethods.diffDate( _now.getTime(), _pass.month, 'month' ) )
        expect( timelineMethods.verifyScale( 'year', _now.getTime(), _pass.year, true ) ).to.be.an('object').that.to.eql( timelineMethods.diffDate( _now.getTime(), _pass.year, 'year' ) )
        expect( timelineMethods.verifyScale( 'lustrum', _now.getTime(), _pass.lustrum, true ) ).to.be.an('object').that.to.eql( timelineMethods.diffDate( _now.getTime(), _pass.lustrum, 'lustrum' ) )
        expect( timelineMethods.verifyScale( 'decade', _now.getTime(), _pass.decade, true ) ).to.be.an('object').that.to.eql( timelineMethods.diffDate( _now.getTime(), _pass.decade, 'decade' ) )
        expect( timelineMethods.verifyScale( 'century', _now.getTime(), _pass.century, true ) ).to.be.an('object').that.to.eql( timelineMethods.diffDate( _now.getTime(), _pass.century, 'century' ) )
        expect( timelineMethods.verifyScale( 'millennium', _now.getTime(), _pass.millennium, true ) ).to.be.an('object').that.to.eql( timelineMethods.diffDate( _now.getTime(), _pass.millennium, 'millennium' ) )
    })
    
    
    // public methods
    /* */
    it ( 'bind timeline object:', () => {
        let dateset = {
                // currently datetime: 2019/7/2 3:43 (GMT)
                'normal-year': [ 'currently', 'auto', 'year' ], // -> 2019 - 2034 (5 * 3 + 1 = 16 years); Ok
                'normal-month': [ 'currently', 'auto', 'month' ], // -> 2019/7/1 - 2022/7/31 (12 * 3 + 1 = 37 months); Ok
                'normal-week': [ 'currently', 'auto', 'week' ], // -> 2019/7/2 - 2019/10/2 (3 months after); Ok
                'normal-day': [ 'currently', 'auto', 'day' ], // -> 2019/7/2 0:00:00 - 2019/10/2 23:59:59 (3 months after); Ok
                'normal-weekday':  [ 'currently', 'auto', 'weekday' ], // -> Error because invalid scale; Ok
                'normal-hour':  [ 'currently', 'auto', 'hour' ], // -> 2019/7/2 03:00:00 - 2019/7/5 03:59:59 (3 day after); Ok
                'normal-minute':  [ 'currently', 'auto', 'minute' ], // -> 2019/7/2 04:03:00 - 2019/7/2 07:03:59 (3 hours after); Ok
                'normal-second':  [ 'currently', 'auto', 'second' ], // -> 2019/7/2 04:10:24 - 2019/7/2 04:13:24 (3 minutes after); Ok
                'DSTs':   [ '2019/3/1', '2019/4/1', 'day' ], // -> Ok
                'DSTe':   [ '2019/10/1', '2019/10/31', 'day' ], // -> Ok
                'DSTs-h': [ '2019/3/31 0:00', '2019/3/31 23:59', 'hour' ], // -> Ok
                'DSTe-h': [ '2019/10/27 0:00', '2019/10/27 23:59', 'hour' ], // -> Ok
                'halfH':    [ '2019/10/27 0:00', '2019/10/27 23:59', 'half-hour' ], // -> 
                'quarterH': [ '2019/10/27 0:00', '2019/10/27 23:59', 'quarter-hour' ], // -> 
                'GMT+0001m': [ '1847/11/30 23:50', '1847/12/1 0:10', 'minute' ], // -> Ok
                'GMT+0001s': [ '1847/11/30 23:59:30', '1847/12/1 0:01:59', 'second' ], // -> Ok
                'leap-second': [ '2016/12/31 23:59:59', '2017/1/1 0:1:1', 'second' ], // -> Ok
            },
            datesetKey = 'normal-day',
            $jqtl = $el.Timeline({
                type: 'mixed',
                startDatetime: dateset[datesetKey][0],
                endDatetime: dateset[datesetKey][1],
                scale: dateset[datesetKey][2],
                //rows: 3,
                minGridSize: 44,
                sidebar: {
                    sticky: true,
                    overlay: true,
                    list: [
                        '<span style="margin:0 15px;">Row 1st</span>',
                        '<span style="margin:0 15px;">Row 2nd</span>',
                        '<span style="margin:0 15px;">Row 3rd</span>',
                        '<span style="margin:0 15px;">Row 4th</span>',
                        '<span style="margin:0 15px;">Row 5th</span>',
                        '<span style="margin:0 15px;">Row 6th</span>',
                        '<span style="margin:0 15px;">Row 7th</span>',
                        '<span style="margin:0 15px;">Row 8th</span>',
                        '<span style="margin:0 15px;">Row 9th</span>',
                        '<span style="margin:0 15px;">Row 10th</span>',/*
                        '<span style="margin:0 15px;">Row 11th</span>',
                        '<span style="margin:0 15px;">Row 12th</span>',
                        '<span style="margin:0 15px;">Row 13th</span>',
                        '<span style="margin:0 15px;">Row 14th</span>',
                        '<span style="margin:0 15px;">Row 15th</span>',
                        '<span style="margin:0 15px;">Row 16th</span>',
                        '<span style="margin:0 15px;">Row 17th</span>',
                        '<span style="margin:0 15px;">Row 18th</span>',
                        '<span style="margin:0 15px;">Row 19th</span>',
                        '<span style="margin:0 15px;">Row 20th</span>',*/
                    ]
                },
                ruler: {
                    top: {
                        lines: [
                            'millennia',
                            'century',
                            'decade',
                            'lustrum',
                            'years',
                            'months',
                            'weeks',
                            'days',
                            'weekdays',
                            'hours',
                            //'half-hour',
                            //'quarter-hour',
                            'minutes',
                            'seconds',
                        ], 
                        format: { hour12: false,
                            millennium: 'ordinal',
                            century: 'ordinal',
                            decade: 'ordinal',
                            lustrum: 'ordinal',
                            year: 'numeric', // 'numeric', '2-digit' or 'zerofill'
                            month: 'long', // 'numeric', '2-digit', 'narrow', 'short', 'long'
                            week: 'ordinal',
                            day: 'numeric', // 'numeric', '2-digit' or 'ordinal'
                            weekday: 'short', // 'narrow', 'short', 'long'
                            hour: 'numeric', // 'numeric', '2-digit' or 'fulltime'
                            minute: '2-digit', // 'numeric', '2-digit' or 'fulltime'
                            second: '2-digit', // 'numeric', '2-digit' or 'fulltime'
                        }
                    },
                    bottom: {
                        lines: [ /*
                            'Second',
                            'Minute',
                            //'quarter',
                            //'half',
                            'Hour',
                            'Weekday',
                            'Day',
                            'Week',
                            'Month',
                            'Year',
                            'Lustrum',
                            'Decennium',
                            'Century',
                            'Millenniums', */
                        ], 
                        format: { hour12: false,
                            year: '2-digit',
                            month: 'short',
                            weekday: 'narrow',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                        }
                    }
                },
                effects: {
                    presentTime: true,
                    hoverEvent: true,
                    stripedGridRow: true,
                    horizontalGridStyle: 'dotted',
                    verticalGridStyle: 'solid',
                },
                eventData: [
                    { start: '2019/7/2 0:00', end: '2019/7/3 23:59', label: 'Test-1', content: '7/2 0:00 - 7/3 23:59' }, // 1
                    { start: '2019/7/3 12:00', end: '2019/7/8 12:00', row: 2, label: 'Test-2', content: '7/3 12:00 - 7/8 12:00' }, // 2
                    { start: '2019/6/30 10:00', end: '2019/7/27 0:00', row: 3, label: 'Test-3', content: '6/30 10:00 - 7/27 0:00' }, // 3
                    { start: '2019/7/1 18:35', end: '2019/7/2 23:59', row: 4, label: 'Test-4', content: '' }, // 4
                    { start: '2019/7/6 12:00', end: '2019/7/6 12:00', row: 4, label: 'Test-5', content: 'Same datetime', type: 'point', relation:{after:-1} }, // 5
                    { start: '2019/7/2 8:12', end: '2019/7/4 3:51', row: 5, label: 'Test-6', content: '' }, // 6
                    { start: '2019/7/4 0:00', row: 6, label: 'Test-7', content: '', relation:{before:-1,after:5,curve:1} }, // 7
                    { start: '2019/7/4 0:00', end: '2019/7/4 23:59:59', row: 7, label: 'Test-8', content: '', type: 'bar' }, // 8
                    { start: '2019/7/4 0:00', row: 8, label: 'Test-9', content: '', type: 'bar' }, // 9
                    { start: '2019/7/4 0:00', row: 8, label: 'Test-10', content: '', type: 'bar' }, // 10
                    { start: '2019/7/9 12:00', row: 8, label: 'Test-11', type: 'pointer', relation:{after:12,curve:1} }, // 11
                    { start: '2019/7/11 12:00', row: 9, label: 'Test-12', type: 'pointer', relation:{} }, // 12
                    { start: '2019/7/8 0:00', row: 10, label: 'Test-13', type: 'pointer', relation:{before:14,after:12,curve:1} }, // 13
                    { start: '2019/7/7 0:00', row: 9, label: 'Test-14', type: 'pointer', relation:{after:11,curve:1} }, // 14
                    { start: '2019-7-2 4:8:40', end: '2019-7-2 4:21:15', row: 9, label: 'Test-15' }, // 15
                    { start: '2019-7-2 4:10:48.500', end: '2019-7-2 4:10:59.250', row: 10, label: 'Test-16' }, // 16
                    
                ],
                zoom: true,
            }),
            timeline = $timeline.Constructor._getInstance( $jqtl[0] ),
            spy = sinon.spy( $timeline.Constructor.prototype, '_calcVars' )
        
        console.log( timeline._config )
        console.log( timeline._instanceProps )
        //let stub = sinon.stub( timeline, '_calcVars' )
        
        //assert.ok( spy.called, 'method is called once' )
        $('#main-content').empty().append( $jqtl )
    })
    /* */

})
