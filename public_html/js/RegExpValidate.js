
/*******************************************************************************
FILE: RegExpValidate.js

AUTHOR: Karen Gayda

DATE: 06/11/2000

EMAIL: KGayda@yahoo.com

DESCRIPTION: This file contains a library of validation functions
  using javascript regular expressions.  Library also contains functions that re-
  format fields for display or for storage.
  

  VALIDATION FUNCTIONS:

  validateCurrency - checks for valid currency format
  validateTime - checks for valid 12 hour time
  validateState -  checks for valid state abbreviation
  validateSSN - checks format of social security number
  validateEmail - checks format of email address
  validateUSPhone - checks format of US phone number
  validateNumeric - checks for valid numeric value
  validateInteger - checks for valid integer value
  validateNotEmpty - checks for blank form field
  validateUSZip - checks for valid US zip code
  validateUSDate - checks for valid date in US format
  validateValue - checks a string against supplied pattern

  validateCCV - checkes for 3-4 digit number
  validateCreditCard - checks for 15-16 digit card numbers
  
  FORMAT FUNCTIONS:
  
  rightTrim - removes trailing spaces from a string
  leftTrim - removes leading spaces from a string
  trimAll - removes leading and trailing spaces from a string
  removeCurrency - removes currency formatting characters (), $ 
  addCurrency - inserts currency formatting characters
  removeCommas - removes comma separators from a number
  addCommas - adds comma separators to a number
  removeCharacters - removes characters from a string that match passed pattern
*******************************************************************************/

/* **********************************************
** Mappings to match common field names to
** specific content types for validation by
** data type. Arrays can be replaced with
** precise field names for small speed increase.
** Values are case insensitive.
*********************************************** */

/*var arrZipFieldName = new Array('zip','zipCode','zip-code','zip_code','postalCode','postal-code','postal_code','cc_zip','cc-zip','zip');*/

var arrFirstNameFieldName = new Array('name','first_name','first-name','name-first','name_first','first','nameFirst','firstName','name-f','name_f','namef','cc_name_f','cc-name-f','fname');
var arrLastNameFieldName = new Array('last','last_name','last-name','name-last','name_last','last','nameLast','lastName','name-l','name_l','namel','cc_name_l','cc-name-l','lname');
var arrAddressFieldName = new Array('address','address1','address2','street','street-address','street_address','address-1','address_1','address-2','address_2','address-3','address_3','street-address-1','street_address_1','street-address-1','street-address-2','street_address_2','street-address-2','street-address-1','street_address_3','street-address-3','cc_street','cc-street','Contact0Street1');
var arrCityFieldName = new Array('city','town','cc_city','cc-city','Contact0City');
var arrStateFieldName = new Array('state','cc_state','cc-state','billing_state','billing-state','shipping-state','shipping_state','cc_state','cc-state','state');
var arrZipFieldName = new Array('zip','zipcode','postalcode');
var arrPhoneFieldName = new Array('phone','phoneNumber','phone1','phone2','phone3','phone-1','phone-2','phone_1','phone_2','billing_phone','cc_phone','billing-phone','cc-phone','card-phone','card_phone','phone-billing','phone_billing','phone_card','phone-card','phone-cc','phone_cc','cc_phone','cc-phone','Phone');
var arrEmailFieldName = new Array('email','email2','email3','emailAddress','emailAddress1','emailAddress2','email-address','email-address-1','email-address-2','email_address','email_address_1','email_address_2','email1','email2','email');
var arrTermsFieldName = new Array('terms','termsandconditions','terms-and-conditions','terms_and_conditions','i-agree','i_agree','conditions','Contact0_AgreeTerms1','Contact0_AgreeTerms','agree');
var arrCreditCardTypeFieldName = new Array('cardtype');
var arrCreditCardFieldName = new Array('creditcard','credit_card','credit-card','cc_number','cc-number','cardnumber','card_number','card-number','cardnumber');
var arrCCMonthFieldName = new Array('cardmonth');
var arrCCYearFieldName = new Array('cardyear');
var arrCCVFieldName = new Array('ccv','ccv_id','ccv-id','cid','card_id','card-id','card_ccv','card_cid','card-ccv','card-cid','ccv2','card_code','cc_code','card-code','cc-code','CVVS','cvv2','cvv');
var arrCountryFieldName = new Array('country','Contact0Country');
var arrInitialsFieldName = new Array('Contact0_Initials');
var arrGrantFieldName = new Array('Contact0_GrantType');
var arrYearBorn = new Array('Contact0_YearBorn');
var arrMarried = new Array('Contact0_MaritalStatus');
var arrHouseholdIncome = new Array('Contact0_HouseholdIncome');
var arrTimeCurrentResidence = new Array('Contact0_TimeCurrentResidence');

var boolFormHasErrors = false;
var intNumErrors = 0;
var strErrorMessage = "";


function validateForm (objForm) {
	var formLength = objForm.length;
	//var fieldType = getFieldType(objForm);
	
	/* **********************************************
	** Add a 'dataType' attribute to each field in
	** the form by matching the form name to the
	** name arrays above.
	*********************************************** */
	// Loop through each field of the form
	for (var x=0; x < objForm.length; x++) {
		// For each field, loop through the values in the field name arrays
		for (var i=0; i < arrFirstNameFieldName.length; i++) {
			//When we find a name match set the datatype of the field for later validation
			if (arrFirstNameFieldName[i].toUpperCase() == objForm[x].name.toUpperCase()) {
//				alert('first name field\'s name is: ' + objForm[x].name);
				//If the field is blank add an error to the error string, set global error variable to true, and increment error count
				if (!validateNotEmpty(objForm[x].value)) {
					strErrorMessage += "   - The First Name field is blank.\n";
					intNumErrors++;
				}
				break;
			}
		}
		for (var i=0; i < arrLastNameFieldName.length; i++) {
			if (arrLastNameFieldName[i].toUpperCase() == objForm[x].name.toUpperCase()) {
				if (!validateNotEmpty(objForm[x].value)) {
					strErrorMessage += "   - The Last Name field is blank.\n";
					intNumErrors++;
				}
				break;
			}
		}
		for (var i=0; i < arrAddressFieldName.length; i++) {
			if (arrAddressFieldName[i].toUpperCase() == objForm[x].name.toUpperCase()) {
				if (!validateNotEmpty(objForm[x].value)) {
					strErrorMessage += "   - The Address field is blank.\n";
					intNumErrors++;
				}
				break;
			}
		}
		for (var i=0; i < arrCityFieldName.length; i++) {
			if (arrCityFieldName[i].toUpperCase() == objForm[x].name.toUpperCase()) {
				if (!validateNotEmpty(objForm[x].value)) {
					strErrorMessage += "   - The City field is blank.\n";
					intNumErrors++;
				}
			}
		}
		for (var i=0; i < arrStateFieldName.length; i++) {
			if (arrStateFieldName[i].toUpperCase() == objForm[x].name.toUpperCase()) {
				if (!validateNotEmpty(objForm[x].value)) {
					strErrorMessage += "   - A State was not chosen.\n";
					intNumErrors++;
				}
				break;
			}
		}
		 for (var i=0; i < arrZipFieldName.length; i++) {
			if (arrZipFieldName[i].toUpperCase() == objForm[x].name.toUpperCase()) {
				if (!validateNotEmpty(objForm[x].value)) {
					strErrorMessage += "   - The Zip Code field is invalid.\n";
					intNumErrors++;
				}
				break;
			}
		}
		for (var i=0; i < arrCountryFieldName.length; i++) {
			if (arrCountryFieldName[i].toUpperCase() == objForm[x].name.toUpperCase()) {
				if (!validateNotEmpty(objForm[x].value)) {
					strErrorMessage += "   - A Country was not chosen.\n";
					intNumErrors++;
				}
				break;
			}
		}
		for (var i=0; i < arrPhoneFieldName.length; i++) {
			if (arrPhoneFieldName[i].toUpperCase() == objForm[x].name.toUpperCase()) {
				if (!validateNotEmpty(objForm[x].value)) {
					strErrorMessage += "   - The Phone Number field is invalid.\n";
					intNumErrors++;
				}
				break;
			}
		}
		for (var i=0; i < arrEmailFieldName.length; i++) {
			if (arrEmailFieldName[i].toUpperCase() == objForm[x].name.toUpperCase()) {
				if (!validateEmail(objForm[x].value)) {
					strErrorMessage += "   - The Email Address field is invalid.\n";
					intNumErrors++;
				}
				break;
			}
		}
		for (var i=0; i < arrTermsFieldName.length; i++) {
			if (arrTermsFieldName[i].toUpperCase() == objForm[x].name.toUpperCase()) {
				if (!objForm[x].checked) {
					strErrorMessage += "   - The Terms and Conditions field is not checked.\n";
					intNumErrors++;
				}
				break;
			}
		}
		for (var i=0; i < arrCreditCardTypeFieldName.length; i++) {
			if (arrCreditCardTypeFieldName[i].toUpperCase() == objForm[x].name.toUpperCase()) {
				if (!validateNotEmpty(objForm[x].value)) {
					strErrorMessage += "   - A Credit Card Type was not chosen.\n";
					intNumErrors++;
				}
				break;
			}
		}
		for (var i=0; i < arrCCVFieldName.length; i++) {
			if (arrCCVFieldName[i].toUpperCase() == objForm[x].name.toUpperCase()) {
				if (!validateCCV(objForm[x].value)) {
					strErrorMessage += "   - The CCV field is invalid.\n";
					intNumErrors++;
				}
				break;
			}
		}
		for (var i=0; i < arrCreditCardFieldName.length; i++) {
			if (arrCreditCardFieldName[i].toUpperCase() == objForm[x].name.toUpperCase()) {
				if (!validateCreditCard(objForm[x].value)) {
					strErrorMessage += "   - The Credit Card field is Blank.\n";
					intNumErrors++;
				}
				break;
			}
		}
		for (var i=0; i < arrCreditCardFieldName.length; i++) {
			if (arrCreditCardFieldName[i].toUpperCase() == objForm[x].name.toUpperCase()) {
				if (!validateCreditCard2(objForm[x].value)) {
					strErrorMessage += "   - The Credit Card field is invalid.\n";
					intNumErrors++;
				}
				break;
			}
		}
		for (var i=0; i < arrCCMonthFieldName.length; i++) {
			if (arrCCMonthFieldName[i].toUpperCase() == objForm[x].name.toUpperCase()) {
				if (!validateNotEmpty(objForm[x].value)) {
					strErrorMessage += "   - A Credit Card Month was not chosen.\n";
					intNumErrors++;
				}
				break;
			}
		}	
		for (var i=0; i < arrCCYearFieldName.length; i++) {
			if (arrCCYearFieldName[i].toUpperCase() == objForm[x].name.toUpperCase()) {
				if (!validateNotEmpty(objForm[x].value)) {
					strErrorMessage += "   - A Credit Card Year was not chosen.\n";
					intNumErrors++;
				}
				break;
			}
		}
		for (var i=0; i < arrInitialsFieldName.length; i++) {
			if (arrInitialsFieldName[i].toUpperCase() == objForm[x].name.toUpperCase()) {
				if (!validateNotEmpty(objForm[x].value)) {
					strErrorMessage += "   - The Initials field is blank.\n";
					intNumErrors++;
				}
				break;
			}
		}
		for (var i=0; i < arrYearBorn.length; i++) {
			if (arrYearBorn[i].toUpperCase() == objForm[x].name.toUpperCase()) {
				if (!validateNotEmpty(objForm[x].value)) {
					strErrorMessage += "   - A Year Born was not chosen.\n";
					intNumErrors++;
				}
				break;
			}
		}
		for (var i=0; i < arrMarried.length; i++) {
			if (arrMarried[i].toUpperCase() == objForm[x].name.toUpperCase()) {
				if (!validateNotEmpty(objForm[x].value)) {
					strErrorMessage += "   - The Marital Status was not chosen.\n";
					intNumErrors++;
				}
				break;
			}
		}
		for (var i=0; i < arrHouseholdIncome.length; i++) {
			if (arrHouseholdIncome[i].toUpperCase() == objForm[x].name.toUpperCase()) {
				if (!validateNotEmpty(objForm[x].value)) {
					strErrorMessage += "   - The Household Income was not chosen.\n";
					intNumErrors++;
				}
				break;
			}
		}
		for (var i=0; i < arrTimeCurrentResidence.length; i++) {
			if (arrTimeCurrentResidence[i].toUpperCase() == objForm[x].name.toUpperCase()) {
				if (!validateNotEmpty(objForm[x].value)) {
					strErrorMessage += "   - The Time at Current Residence was not chosen.\n";
					intNumErrors++;
				}
				break;
			}
		}
		for (var i=0; i < arrGrantFieldName.length; i++) {
			if (arrGrantFieldName[i].toUpperCase() == objForm[x].name.toUpperCase()) {
				if (!validateNotEmpty(objForm[x].value)) {
					strErrorMessage += "   - A Grant Type was not chosen.\n";
					intNumErrors++;
				}
			}
		}
	}
	//Check error count and build error message string to alert() to user
	if (intNumErrors == 1) {
		//Build output string based on singular or plural error message
		strNewMessage = "The form contains an error. Please correct the following mistake\nand resubmit the form:\n" + strErrorMessage + "\n";
		strErrorMessage = strNewMessage;
		alert(strErrorMessage);
		//Clear global variable so subsequent validations start building from an empty string
		strErrorMessage ="";
		intNumErrors = 0;
		//Error found, halt form submission
		return false;
	}
	else if (intNumErrors > 1) {
		strNewMessage = "The form contains errors. Please correct the following mistakes\nand resubmit the form:\n" + strErrorMessage + "\n";
		strErrorMessage = strNewMessage;
		alert(strErrorMessage);
		strErrorMessage ="";
		intNumErrors = 0;
		return false;
	}
	// No errors, submit the form
	else return true;
}

function validateCurrency( strValue)  {
/************************************************
DESCRIPTION: Validates that a string contains a 
  valid currency format. 
  
 PARAMETERS:
   strValue - String to be tested for validity
   
RETURNS:
   True if valid, otherwise false.
*************************************************/
  var objRegExp = /(^\$\d{1,3}(,\d{3})*\.\d{2}$)|(^\(\$\d{1,3}(,\d{3})*\.\d{2}\)$)/;

  return objRegExp.test( strValue );
}

function validateTime ( strValue ) {
/************************************************
DESCRIPTION: Validates that a string contains a 
  valid 12 hour time format. Seconds are optional.
  
 PARAMETERS:
   strValue - String to be tested for validity
   
RETURNS:
   True if valid, otherwise false.

REMARKS: Returns True for time formats such as:
  HH:MM or HH:MM:SS or HH:MM:SS.mmm (where the
  .mmm is milliseconds as used in SQL Server 
  datetime datatype.  Also, the .mmm portion will 
  accept 1 to 3 digits after the period)
*************************************************/
  var objRegExp = /^([1-9]|1[0-2]):[0-5]\d(:[0-5]\d(\.\d{1,3})?)?$/;

  return objRegExp.test( strValue );

}

function validateState (strValue ) {
/************************************************
DESCRIPTION: Validates that a string contains a 
  valid state abbreviation. 
  
 PARAMETERS:
   strValue - String to be tested for validity
   
RETURNS:
   True if valid, otherwise false.
*************************************************/

var objRegExp = /^(AK|AL|AR|AZ|CA|CO|CT|DC|DE|FL|GA|HI|IA|ID|IL|IN|KS|KY|LA|MA|MD|ME|MI|MN|MO|MS|MT|NB|NC|ND|NH|NJ|NM|NV|NY|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VA|VT|WA|WI|WV|WY)$/i; 

  return objRegExp.test(strValue);
}

function validateSSN( strValue ) {
/************************************************
DESCRIPTION: Validates that a string contains a 
  valid social security number. 
  
 PARAMETERS:
   strValue - String to be tested for validity
   
RETURNS:
   True if valid, otherwise false.
*************************************************/
var objRegExp  = /^\d{3}\-\d{2}\-\d{4}$/;
 
  //check for valid SSN
  return objRegExp.test(strValue);

}


function validateEmail( strValue) {
/************************************************
DESCRIPTION: Validates that a string contains a 
  valid email pattern. 
  
 PARAMETERS:
   strValue - String to be tested for validity
   
RETURNS:
   True if valid, otherwise false.
   
REMARKS: Accounts for email with country appended
  does not validate that email contains valid URL
  type (.com, .gov, etc.) and optionally,
  a valid country suffix.  Since email has many
  forms this expression only tests for near valid
  address.  Some additional validation may be
  required.
*************************************************/
var objRegExp  = /^[a-z0-9]([a-z0-9_\-\.]*)@([a-z0-9_\-\.]*)(\.[a-z]{2,3}(\.[a-z]{2}){0,2})$/i;
  //check for valid email
  return objRegExp.test(strValue);
}

function validateUSPhone( strValue ) {
/************************************************
DESCRIPTION: Validates that a string contains valid
  US phone pattern. 
  Ex. (999) 999-9999 or (999)999-9999
  
PARAMETERS:
   strValue - String to be tested for validity
   
RETURNS:
   True if valid, otherwise false.
*************************************************/
  //var objRegExp  = /^\([1-9]\d{2}\)\s?\d{3}\-\d{4}$/;
  // Allows for (999) 999-9999 and 999-999-9999, among others
  var objRegExp  = /(\(?\d{3}\)?)(\-| )?\d{3}(\-| )?\d{4}/;
 
  //check for valid us phone with or without space between 
  //area code
  return objRegExp.test(strValue); 
}

function  validateNumeric( strValue ) {
/******************************************************************************
DESCRIPTION: Validates that a string contains only valid numbers.

PARAMETERS:
   strValue - String to be tested for validity
   
RETURNS:
   True if valid, otherwise false.
******************************************************************************/
  var objRegExp  =  /(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/; 
 
  //check for numeric characters 
  return objRegExp.test(strValue);
}

function validateInteger( strValue ) {
/************************************************
DESCRIPTION: Validates that a string contains only 
    valid integer number.
    
PARAMETERS:
   strValue - String to be tested for validity
   
RETURNS:
   True if valid, otherwise false.
******************************************************************************/
  var objRegExp  = /(^-?\d\d*$)/;
 
  //check for integer characters
  return objRegExp.test(strValue);
}

function validateNotEmpty( strValue ) {
/************************************************
DESCRIPTION: Validates that a string is not all
  blank (whitespace) characters.
    
PARAMETERS:
   strValue - String to be tested for validity
   
RETURNS:
   True if valid, otherwise false.
*************************************************/
   var strTemp = strValue;
   strTemp = trimAll(strTemp);
   if(strTemp.length > 0){
     return true;
   }  
   return false;
}

function validateUSZip( strValue ) {
/************************************************
DESCRIPTION: Validates that a string a United
  States zip code in 5 digit format or zip+4
  format. 99999 or 99999-9999
    
PARAMETERS:
   strValue - String to be tested for validity
   
RETURNS:
   True if valid, otherwise false.

*************************************************/
var objRegExp  = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
 
  //check for valid US Zipcode
  return objRegExp.test(strValue);
}

function validateCCV( strValue ) {
/************************************************
DESCRIPTION: Validates that a string contains
	a valid Credit Card Verification (CCV) code
    
PARAMETERS:
   strValue - String to be tested for validity
   
RETURNS:
   True if valid, otherwise false.

*************************************************/
var objRegExp  = /^([0-9]{3,4})$/;
 
  //check for valid CCV 
  return objRegExp.test(strValue);
}

function validateCreditCard( strValue ) {
/************************************************
DESCRIPTION: Validates that a string contains
	a 15-16 digit credit card number
    
PARAMETERS:
   strValue - String to be tested for validity
   
RETURNS:
   True if valid, otherwise false.

*************************************************/
var objRegExp  = /^(\d{4}[- ]){3}\d{4}|\d{15,16}|(\d{4}[- ])(\d{6}[- ])\d{5}$/;
 
  //check for valid CCV 
  return objRegExp.test(strValue);
}



function validateCreditCard2( strValue ) {
/************************************************
DESCRIPTION: Validates that a string contains
	a 15-16 digit credit card number
    
PARAMETERS:
   strValue - String to be tested for validity
   
RETURNS:
   True if valid, otherwise false.

*************************************************/

var checksum = 0;
for (var i=(2-(strValue.length % 2)); i<=strValue.length; i+=2) {
   checksum += parseInt(strValue.charAt(i-1));
}
// Analyze odd digits in even length strings or even digits in odd length strings.
for (var i=(strValue.length % 2) + 1; i<strValue.length; i+=2) {
   var digit = parseInt(strValue.charAt(i-1)) * 2;
   if (digit < 10) { checksum += digit; } else { checksum += (digit-9); }
}
if ((checksum % 10) == 0) return true; else return false;

/*return objRegExp.test(strValue);*/
}






function validateUSDate( strValue ) {
/************************************************
DESCRIPTION: Validates that a string contains only 
    valid dates with 2 digit month, 2 digit day, 
    4 digit year. Date separator can be ., -, or /.
    Uses combination of regular expressions and 
    string parsing to validate date.
    Ex. mm/dd/yyyy or mm-dd-yyyy or mm.dd.yyyy
    
PARAMETERS:
   strValue - String to be tested for validity
   
RETURNS:
   True if valid, otherwise false.
   
REMARKS:
   Avoids some of the limitations of the Date.parse()
   method such as the date separator character.
*************************************************/
  var objRegExp = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/
 
  //check to see if in correct format
  if(!objRegExp.test(strValue))
    return false; //doesn't match pattern, bad date
  else{
    var arrayDate = strValue.split(RegExp.$1); //split date into month, day, year
	var intDay = parseInt(arrayDate[1],10); 
	var intYear = parseInt(arrayDate[2],10);
    var intMonth = parseInt(arrayDate[0],10);
	
	//check for valid month
	if(intMonth > 12 || intMonth < 1) {
		return false;
	}
	
    //create a lookup for months not equal to Feb.
    var arrayLookup = { '01' : 31,'03' : 31, '04' : 30,'05' : 31,'06' : 30,'07' : 31,
                        '08' : 31,'09' : 30,'10' : 31,'11' : 30,'12' : 31}
  
    //check if month value and day value agree
    if(arrayLookup[arrayDate[0]] != null) {
      if(intDay <= arrayLookup[arrayDate[0]] && intDay != 0)
        return true; //found in lookup table, good date
    }
		
    //check for February
	var booLeapYear = (intYear % 4 == 0 && (intYear % 100 != 0 || intYear % 400 == 0));
    if( ((booLeapYear && intDay <= 29) || (!booLeapYear && intDay <=28)) && intDay !=0)
      return true; //Feb. had valid number of days
  }
  return false; //any other values, bad date
}

function validateValue( strValue, strMatchPattern ) {
/************************************************
DESCRIPTION: Validates that a string a matches
  a valid regular expression value.
    
PARAMETERS:
   strValue - String to be tested for validity
   strMatchPattern - String containing a valid
      regular expression match pattern.
      
RETURNS:
   True if valid, otherwise false.
*************************************************/
var objRegExp = new RegExp( strMatchPattern);
 
 //check if string matches pattern
 return objRegExp.test(strValue);
}


function rightTrim( strValue ) {
/************************************************
DESCRIPTION: Trims trailing whitespace chars.
    
PARAMETERS:
   strValue - String to be trimmed.  
      
RETURNS:
   Source string with right whitespaces removed.
*************************************************/
var objRegExp = /^([\w\W]*)(\b\s*)$/;
 
      if(objRegExp.test(strValue)) {
       //remove trailing a whitespace characters
       strValue = strValue.replace(objRegExp, '$1');
    }
  return strValue;
}

function leftTrim( strValue ) {
/************************************************
DESCRIPTION: Trims leading whitespace chars.
    
PARAMETERS:
   strValue - String to be trimmed
   
RETURNS:
   Source string with left whitespaces removed.
*************************************************/
var objRegExp = /^(\s*)(\b[\w\W]*)$/;
 
      if(objRegExp.test(strValue)) {
       //remove leading a whitespace characters
       strValue = strValue.replace(objRegExp, '$2');
    }
  return strValue;
}

function trimAll( strValue ) {
/************************************************
DESCRIPTION: Removes leading and trailing spaces.

PARAMETERS: Source string from which spaces will
  be removed;

RETURNS: Source string with whitespaces removed.
*************************************************/ 
 var objRegExp = /^(\s*)$/;

    //check for all spaces
    if(objRegExp.test(strValue)) {
       strValue = strValue.replace(objRegExp, '');
       if( strValue.length == 0)
          return strValue;
    }
    
   //check for leading & trailing spaces
   objRegExp = /^(\s*)([\W\w]*)(\b\s*$)/;
   if(objRegExp.test(strValue)) {
       //remove leading and trailing whitespace characters
       strValue = strValue.replace(objRegExp, '$2');
    }
  return strValue;
}

function removeCurrency( strValue ) {
/************************************************
DESCRIPTION: Removes currency formatting from 
  source string.
  
PARAMETERS: 
  strValue - Source string from which currency formatting
     will be removed;

RETURNS: Source string with commas removed.
*************************************************/
  var objRegExp = /\(/;
  var strMinus = '';
 
  //check if negative
  if(objRegExp.test(strValue)){
    strMinus = '-';
  }
  
  objRegExp = /\)|\(|[,]/g;
  strValue = strValue.replace(objRegExp,'');
  if(strValue.indexOf('$') >= 0){
    strValue = strValue.substring(1, strValue.length);
  }
  return strMinus + strValue;
}

function addCurrency( strValue ) {
/************************************************
DESCRIPTION: Formats a number as currency.

PARAMETERS: 
  strValue - Source string to be formatted

REMARKS: Assumes number passed is a valid 
  numeric value in the rounded to 2 decimal 
  places.  If not, returns original value.
*************************************************/
  var objRegExp = /-?[0-9]+\.[0-9]{2}$/;
   
    if( objRegExp.test(strValue)) {
      objRegExp.compile('^-');
      strValue = addCommas(strValue);
      if (objRegExp.test(strValue)){
        strValue = '($' + strValue.replace(objRegExp,'') + ')';
      }
      else {
        strValue = '$' + strValue;
      }
      return  strValue;
    }
    else
      return strValue;
}

function removeCommas( strValue ) {
/************************************************
DESCRIPTION: Removes commas from source string.

PARAMETERS: 
  strValue - Source string from which commas will 
    be removed;

RETURNS: Source string with commas removed.
*************************************************/
  var objRegExp = /,/g; //search for commas globally
 
  //replace all matches with empty strings
  return strValue.replace(objRegExp,'');
}

function addCommas( strValue ) {
/************************************************
DESCRIPTION: Inserts commas into numeric string.

PARAMETERS: 
  strValue - source string containing commas.
  
RETURNS: String modified with comma grouping if
  source was all numeric, otherwise source is 
  returned.
  
REMARKS: Used with integers or numbers with
  2 or less decimal places.
*************************************************/
  var objRegExp  = new RegExp('(-?[0-9]+)([0-9]{3})'); 

    //check for match to search criteria
    while(objRegExp.test(strValue)) {
       //replace original string with first group match, 
       //a comma, then second group match
       strValue = strValue.replace(objRegExp, '$1,$2');
    }
  return strValue;
}

function removeCharacters( strValue, strMatchPattern ) {
/************************************************
DESCRIPTION: Removes characters from a source string
  based upon matches of the supplied pattern.

PARAMETERS: 
  strValue - source string containing number.
  
RETURNS: String modified with characters
  matching search pattern removed
  
USAGE:  strNoSpaces = removeCharacters( ' sfdf  dfd', 
                                '\s*')
*************************************************/
 var objRegExp =  new RegExp( strMatchPattern, 'gi' );
 
 //replace passed pattern matches with blanks
  return strValue.replace(objRegExp,'');
}

 
