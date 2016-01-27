function doOperation(string) {

  try {
    var result = Number( eval(string) );
    return ( isNaN(result) || result === Infinity ) ?
      'ERROR' : fixFloats(result);
  } catch(err) {
    return 'ERROR';
  }

} // doOperation


/*
 Crappy way to fix float operation problem.
 Trims number to 6 digits and removes non-necessary zeros
 and decimal point.
 Don't use this calculator if your a bank owner :-)
 */
function fixFloats(number) {

  number = Number(number).toFixed(6);
  var re = /\.?0*$/;
  return number.replace(re, '');

} // fixFloats



(function calculator() {

  var display      = document.getElementById('display');
  var keys         = document.getElementById('keys');
  var decimalUsed  = false;
  var newOperation = true;

  keys.addEventListener('click', function(e) {

    var target = e.target;
    if ( !(target instanceof HTMLButtonElement) ) return;

    var key = target.value;

    switch (key) {
      case 'del':
        if (display.innerHTML === 'ERROR') break;
        var charToDelete = display.innerHTML[display.innerHTML.length - 1];

        if (charToDelete === '.') decimalUsed = false;
        if (['+', '-', '*', '/'].indexOf(charToDelete) >= 0) decimalUsed = true;

        display.innerHTML = display.innerHTML.slice(0,-1);
        break;

      case 'ac':
        display.innerHTML = '0';
        decimalUsed = false;
        newOperation = true;
        break;

      case '=':
        display.innerHTML = doOperation(display.innerHTML);
        decimalUsed = false;
        newOperation = true;
        break;

      case '.':
        if (newOperation) {
          display.innerHTML = '';
          newOperation = false;
        }

        if (decimalUsed) return;

        display.innerHTML += '.';
        decimalUsed = true;
        break;

      case 'sign':
        display.innerHTML[0] === '-' ?
          display.innerHTML = display.innerHTML.substring(1) :
          display.innerHTML = '-' + display.innerHTML;
        break;

      case '+':
      case '-':
      case '*':
      case '/':
        if (display.innerHTML === 'ERROR') break;
        newOperation    = false;
        decimalUsed     = false;
        display.innerHTML += key;
        break;

      default:
        if ( display.innerHTML === 'ERROR' || newOperation) {
          display.innerHTML = '';
        }

        newOperation = false;
        display.innerHTML += key;

    } // switch

  }); // addEventListener

}) (); // calculator