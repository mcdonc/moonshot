angular.module("moonshot", [
  "ngAnimate", "ui.router", "restangular"]);

function RootCtrl($scope) {
  $scope.site = {title: "Moonshot"};
}

function ListCtrl(shoppinglist) {
  var ctrl = this;
  ctrl.context = shoppinglist;
}

function ListItemCtrl(context) {
  this.context = context;
}

function AppConfig($urlRouterProvider, $stateProvider) {
  $stateProvider
    .state("root", {
             abstract: true,
             url: "",
             views: {
               "header": {
                 templateUrl: "header.html"
               },
               "content": {
                 templateUrl: "app/root.partial.html",
                 controller: "RootCtrl",
                 controllerAs: "RootCtrl"
               }
             }
           })
    .state("home", {
             url: "/",
             parent: "root",
             templateUrl: "app/home.partial.html"
           })
    .state("list", {
             url: "/list",
             parent: "root",
             templateUrl: "app/list.partial.html",
             controller: "ListCtrl as ListCtrl",
             resolve: {
               shoppinglist: function (Restangular) {
                 var baseShoppingList = Restangular.all('src/shoppinglist.json');
                 return baseShoppingList.getList().then(function (response) {
                   var data = {};
                   _.forEach(response, function (d) {
                     data[d.id] = d;
                   });
                   return data;
                 });
               }
             }
           })
    .state("list.item", {
             url: "/:itemId",
             templateUrl: "app/list.item.partial.html",
             controller: "ListItemCtrl as ListItemCtrl",
             resolve: {
               context: function (shoppinglist, $stateParams) {
                 /** @namespace $stateParams.itemId */
                 return shoppinglist[$stateParams.itemId];
               }
             }
           });

  $urlRouterProvider.otherwise('/');
}

angular.module("moonshot")
  .config(AppConfig)

  .controller("RootCtrl", RootCtrl)

  .controller("ListCtrl", ListCtrl)

  .controller("ListItemCtrl", ListItemCtrl);
