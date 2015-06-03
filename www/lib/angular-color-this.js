angular.module('ngColorThis', [])
  .factory('Color', function () {
    function convert(str) {
      var r, g, b, o, rOffset, gOffset, bOffset;
      var rgbObject;
      var output = '';
      var salt = -5;

      str = str.toString();

      for (var i = str.length - 1; i >= 0; i--) {
        var charAt = str.charCodeAt(i).toString().split('');
        for (var x = charAt.length - 1; x >= 0; x--) {
          var y = charAt[x] - salt;
          if (y < 4) y = parseInt(y) + 4;
          output += Math.pow(y * Math.round(y / 2), 8);
        }
      }

      if (output.length % 3 === 0) output = output.split('').reverse().join('');

      rOffset = Math.floor(output.length / 3);
      gOffset = rOffset * 2;
      bOffset = output.length - 3;

      r = toVal(output[rOffset], output[rOffset + 1], output[rOffset + 2]);
      g = toVal(output[gOffset], output[gOffset + 1], output[gOffset + 2]);
      b = toVal(output[bOffset], output[bOffset + 1], output[bOffset + 2]);
o = 0.4;
      return {red: r, green: g, blue: b, opacity: o};

    }

    function toVal(a, b, c) {
      var together = parseInt(a + b + c);
      while (together > 255) together = Math.round(together / 5);
      return together;
    }

    function rgbToCSS(red, green, blue, opacity) {
      return 'rgb(' + red + ', ' + green + ', ' + blue + ', '+ opacity +')';
    }

    return {
      convert: convert,
      toVal: toVal,
      rgbToCSS: rgbToCSS
    };

  })
  .directive('colorThis', function (Color) {
    return {
      restrict: 'A',
      scope: {
        color: '='
      },
      link: function (scope, element, attrs, fn) {
        scope.$watch('color', function (newValue, oldValue) {
          if (newValue) {
            var rgb = Color.convert(newValue);
            var css = Color.rgbToCSS(rgb.red, rgb.green, rgb.blue, rgb.opacity);
            element.css(attrs.colorThis, css);
          }
        }, true);
      }
    };
  });
