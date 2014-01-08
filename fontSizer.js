/*
 * fontSizer 0.1
 *
 * Michael Lefebvre
 * Copyright 2014, MIT License
 *
*/

function fontSizer( container, options )
{
  var win     = window
    , doc     = win.document
    , docEl   = doc.documentElement
    , body    = doc.getElementsByTagName('body')[0]
    , options = options ? options : {}
    , defaults = {
          ideal:     760 // why not
        , min:       false
        , max:       false
      }

  // Utils
  // ------------------

  var extend = function (target) 
  {
    for(var i = 1, l = arguments.length; i < l; ++i ) 
    {
      var from = arguments[ i ]

      if( typeof from !== 'object' ) 
        continue

      for( var j in from )
      {
        if( from.hasOwnProperty( j ) )
        {
          target[ j ] = typeof from[ j ] === 'object'
            ? extend( {}, target[ j ], from[ j ] )
            : from[ j ]
        }
      }
    }
    return target;
  }

  var addEvent = function( eventHandle ) 
  {
    if ( window.addEventListener ) 
    {
        window.addEventListener( 'resize', eventHandle, false )
    }
    else if ( window.attachEvent ) 
    {
        window.attachEvent( 'onresize', eventHandle )
    }
    else 
    {
        window[ 'onresize' ] = eventHandle
    }
  }

  // Setup
  // ------------------

  this.container = container ? container : body
  this.settings  = extend( {}, defaults, options )
  this.active    = true

  // Main function
  // ------------------

  var self = this

  var sizer = function()
  {
    if( !self.active )
      return

    var height   = win.innerHeight|| docEl.clientHeight || body.clientHeight
      , fontSize = Math.floor( ( height / self.settings.ideal ) * 100)

console.log( fontSize )

    if( self.settings.min && fontSize < self.settings.min )
      return

    if( self.settings.max && fontSize > self.settings.max )
      return

    self.container.style.fontSize = fontSize + '%'
  }

  // Main function
  // ------------------

  addEvent( sizer )

  // trigger on init
  sizer()
}


fontSizer.prototype.on = function()
{
  this.active = true
}


fontSizer.prototype.off = function()
{
  this.active = false
}

if ( window.jQuery || window.Zepto ) 
{
  (function($) 
  {
    $.fn.fontSizer = function( params ) 
    {
      return this.each(function() 
      {
        $(this).data('fontSizer', new fontSizer( $( this )[0], params) )
      })
    }
  })( window.jQuery || window.Zepto )
}
