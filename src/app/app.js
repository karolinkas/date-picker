import angular from 'angular';
import moment from 'moment';
import Noty from 'noty';

import '../style/app.css';

export function validYear (noty, year){

	if (year){

		const onlyNumbers = new RegExp("^[0-9]+$");

		if ( year.length > 4){
			
			noty.show();

			return false;
		
		} else if ( year != "" && !onlyNumbers.test(year) ){

			noty.show();

			return false;

		} else {

			return true;

		}
	}
}

angular.module('app', [])
	.directive('datePicker', () => {
		function link ($scope){

				// create arrays that population drop downs
				function getDaysForCurrentMonth(){

					const numberOfDaysPerMonth =  moment($scope.currentDate).daysInMonth();
					const range = (start, end) => Array.from({length: (end - start)}, (value, key) => (key + start).toString());
					return range(1, numberOfDaysPerMonth + 1);
				}

				function initSelectOptions (){
					// initialise select options
					$scope.allDays = getDaysForCurrentMonth();
					$scope.allMonths = moment.monthsShort();

				}
				
				function initUserInput (){
						// we are always initialising to current date
						// and store it as a time stamp
						$scope.currentDate = new Date().getTime();

						// initialise first selection
						$scope.selectedYear = moment($scope.currentDate,).format("YYYY");
						$scope.selectedDay = moment($scope.currentDate).format("DD");
						$scope.selectedMonth =  moment($scope.currentDate).format("MMM");

				}
				
				$scope.updateDay = (day) => {
					$scope.currentDate = moment($scope.currentDate).date(day);
				};

				$scope.updateMonth = (month) => {
					$scope.currentDate = moment($scope.currentDate).month(month);
					$scope.allDays = getDaysForCurrentMonth();
				};

				$scope.updateYear = (year) => {
					
					//configure notifications for input validation
					const noty = new Noty({
						text: 'This is not a valid year.',
						theme: "sunset",
						timeout: 1000
					});

					if (validYear(noty, year)){
						$scope.currentDate = moment($scope.currentDate).year(year);
					}
					
				};

				$scope.formatDate = (date) => {
					return moment(date).format("MMMM Do YYYY");
				};

				initUserInput();
				initSelectOptions();

		}
		return {
			template: require('./views/date-picker.directive.view.html'),
			link: link
		};
	});

export default 'app';