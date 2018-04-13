import angular from 'angular';
import moment from 'moment';

import '../style/app.css';

angular.module('app', [])
  .directive('datePicker', () => {
    function link ($scope){
        $scope.allDays = [1, 2, 4, 5, 13];
        $scope.allMonths = [1, 12, 10, 5, 4];
        $scope.chosenYear = undefined;

        $scope.updateDay = (day) => {
          console.log(day);
          $scope.currentDate = moment($scope.currentDate).day(day);
        };

        $scope.updateMonth = (month) => {
          console.log(month);
          $scope.currentDate = moment($scope.currentDate).month(month);
        };

        $scope.updateYear = (year) => {
          console.log(year);
          $scope.currentDate = moment($scope.currentDate).year(year);
        };

       $scope.formatDate = (date) => {
          return moment(date).format("MMMM Do YYYY");
        };

        //we are always initialising to current date
        $scope.currentDate = moment(new Date());

        $scope.selectedYear = $scope.currentDate.year();
        $scope.selectedDay = $scope.currentDate.day().toString();
        $scope.selectedMonth =  $scope.currentDate.month().toString();

        console.log($scope.selectedYear, $scope.selectedMonth, $scope.selectedDay);
    }
    return {
      template: require('./views/date-picker.directive.view.html'),
      link: link
    };
  });

export default 'app';