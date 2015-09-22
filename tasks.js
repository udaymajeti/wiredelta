$(document).ready(function () {
  $('#btnCalculateAge').click(function () {
    var dob = new Date($('#dob').val());
    var age = calculateAge(dob);
    if (dob.toString() === 'Invalid Date') {
      $('#currentAge').css('color', 'red').text('Please select a valid date above');
      return;
    }
    $('#currentAge').text('You are either ' + age + ' or ' + (age + 1));
  });
  $('#btnCalculateSupply').click(function () {
    var dob = new Date($('#dob').val());
    var amount = parseFloat($('#amount').val());
    if (dob.toString() === 'Invalid Date') {
      $('#supplyResult').css('color', 'red').text('Please select a valid date above');
    } else if (isNaN(amount)) {
      $('#supplyResult').css('color', 'red').text('Please enter a valid amount');
    } else {
      var supplyReq = calculateSupply(dob, amount);
      $('#supplyResult').text(supplyReq);
    }
  })
  $('#btnConvert').click(function () {
    var currentTemp = $('#temp').val();
    var destUnit = $('#destUnit').val();
    if (currentTemp === '') {
      $('#tempResult').css('color', 'red').text('Please enter a valid temperature');
      return;
    }
    var convertedTemp = convertTemp(currentTemp, destUnit);
    $('#tempResult').text(convertedTemp);
  });
  $('#destUnit').change(function () {
    var destUnit = $('#destUnit').val(),
      currentUnit = 'Celsius';
    if (destUnit === 'Celsius') {
      currentUnit = 'Fahrenheit'
    }
    $('#currentUnit').text(currentUnit)
  })
  $('#btnCalculateGeo').click(function () {
    var radius = $('#radius').val(),
      property = $("input[type='radio'][name='geometrize']:checked").val(),
      result;
    if (radius === '') {
      $('#geoResult').css('color', 'red').text('Please enter a valid radius');
      return;
    }
    if (property === 'Circumference') {
      var circumference = 2 * Math.PI * radius;
      result = 'The circumference is ' + circumference;
    } else {
      var area = Math.PI * radius * radius;
      result = 'The area is ' + area;
    }
    $('#geoResult').text(result);
  })
})

function calculateAge(dob) {
  var birthYear = dob.getFullYear();
  var currentYear = new Date().getFullYear();
  var age = currentYear - birthYear;
  return age;
}

function calculateSupply(dob, amount) {
  var age = calculateAge(dob),
    maxAge = 60,
    supply;
  supply = Math.round((maxAge - age) * amount*365);
  return 'You will need ' + supply + ' to last you until the ripe old age of ' + maxAge + '.';
}

function geo() {
  var val = $("input[type='radio'][name='geometrize']:checked").val();
}

function convertTemp(currentTemp, destUnit) {
  var result;
  if (destUnit === 'Celsius') {
    result = fahrenheitToCelsius(currentTemp)
  } else {
    result = celsiusToFahrenheit(currentTemp)
  }
  return result;
}

function fahrenheitToCelsius(currentTemp) {
  var temp = ((currentTemp - 32) * 5) / 9;
  return currentTemp + '°F is ' + temp + '°C.'
}

function celsiusToFahrenheit(currentTemp) {
  var temp = ((currentTemp * 9) / 5) + 32;
  return currentTemp + '°C is ' + temp + '°F.'
}
