var State = require('ampersand-state');
var matrix = require('array-matrix');

module.exports = State.extend({
    initialize: function(opts){
        opts || (opts = {});
        
    },
    props: {
        xScale: 'number', //length of fretboard in pixels
        yScale: 'number', //height of fretboard
        frets: 'number', //Num frets
        strings: 'number', //Num strings
        tuning: 'array', // array of note_ids
        colors: 'object', //strings, nut, inlays, frets
        inlays: 'array', //frets where the inlays appear, maybe there should be a boolean to display inlays
        nutOffset: 'number' //how far the nut is from the left part of the board
    },
    derived: {
        matrix: {
            deps: ['frets, tuning'],
            /*
            This should rarely change
            The matrix is a multidimensional array of length 12 (# of notes) and width(?) strings
            Each intersection of fret,string contains a noteId
            So when traversing a scale, foreach note, the matrix will be read to see which fret it lands on
            OR
            It can be a matrix of tuning and strings
            So when traversing a scale, foreach note it contains the actual coordinates of the fret
            
            Should these contain actual coordinates on the screen?
            I suppose so, if there is going to be a heigh and width
            Unless the view is going to handle that?
            Isn't that frowned against though?
            Don't use the dom as a source of truth, right?
            The height and width is based on the window size, or user specified.
            So yeah that's going to be here.
            Well it could be a view propery right?
            
            It's all coming back to me noowwwwwwwwwwwwwwww
            There were moments of -
            Ok... The string, or Y, coordinate is static, so there is no point in storing that multuple times
            The X coordinate is the only variable one
            So the options are store a 12xstrings array of x coordinates at the intersection of note,string
            so foreach note 4 string 2 has it's x coordinate, and then string 2 just has it's static y
            
            or map out the whole fretboard. so 22x6, and each intersection has a note value based on the tuning?
            where do the x values come in?
            well then you'd have an array of
            */
            fn: function () {
                //There will always only be 12 notes, so what's the point in saying data.notes.length
                for (var i = 1; i <= 12; i++){
                    var notes = [];
                }
            }
        }
    },
    getFretX: function(fret){
        //The common scenario is to include the nutoffset
        //So this should return where the fret wire is in relation to nut... just like a guitar
        return Math.floor(this.nutOffset + (1200 - (1200 / Math.pow(2, (fret / 12)))));
    }
});