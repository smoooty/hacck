
angular.module('app.controllers', ['app.services']).controller('AppController', [
  '$scope', '$sce', '$timeout', '$window', '$q', 'HackerNews', function($scope, $sce, $timeout, $window, $q, HackerNews) {
    $scope.section = 'top';
    $scope.gotoStory = function(story) {
      $scope.currentStory = story;
      $scope.storyUrl = $sce.trustAsResourceUrl(story.url);
      return $scope.navi.pushPage(cordova.ThemeableBrowser.open(story.url, '_blank', {toolbar: {
        height: 44,
        color: '#00000000'
    }, closeButton: {
        image: 'ic_cancel_black',
        imagePressed: 'close_pressed',
        align: 'left',
        event: 'closePressed'
    }, menu: {
        image: 'ei-share-apple',
        imagePressed: 'menu_pressed',
        title: 'Test',
        cancel: 'Cancel',
        align: 'right',
        items: [
            {
                event: 'helloPressed',
                label: 'Copy link'
            },
            {
                event: 'testPressed',
                label: 'Open in native browser'
            }
        ]
    },
  }));
    };
    $scope.loadUrl = function(url) {
      return $window.open(url, '_blank', 'location=yes');
    };
    $scope.viewAsk = function(story) {
      $scope.viewing = story;
    };
    return $scope.getStory = function(id) {
      var deferred, timer;
      deferred = $q.defer();
      timer = $timeout(deferred.resolve, 1000);
      HackerNews.child("item/" + id).once('value', function(data) {
        var item;
        item = data.val();
        if (item && !item.deleted && item.url) {
          $timeout.cancel(timer);
          return deferred.resolve(item);
        } else if(item && !item.deleted && item.title){
          $timeout.cancel(timer);
          return deferred.resolve(item);
        }else{
          $timeout.cancel(timer);
          return deferred.resolve();
        }
      });
      return deferred.promise;
    };
  }
]).controller('TopController', [
  '$scope', '$q', 'HackerNews', function($scope, $q, HackerNews) {
    $scope.stories = [];
    $scope.getTopStories = function() {
      return HackerNews.child('topstories').limitToFirst(20).once('value', function(data) {
        var i, id, ids, len, promises;
        console.log(data.val());
        ids = data.val();
        promises = []; 
        for (i = 0, len = ids.length; i < len; i++) {
          id = ids[i];
          promises.push($scope.getStory(id));
        }
        return $q.all(promises).then(function(stories) {
          stories = stories.filter(function(story) {
            return typeof story !== 'undefined';
          });
          if (stories.length > 0) {
            return $scope.stories = stories;
          }
        });
      });
    };
    return HackerNews.child('topstories').on('value', $scope.getTopStories);
  }
]).controller('LatestController', [
  '$scope', '$q', 'HackerNews', function($scope, $q, HackerNews) {
    $scope.stories = [];
    $scope.getLatestStories = function() {
      return HackerNews.child('maxitem').once('value', function(data) {
        var i, id, maxId, promises, ref, ref1;
        maxId = data.val();
        promises = [];
        for (id = i = ref = maxId, ref1 = maxId - 100; ref <= ref1 ? i < ref1 : i > ref1; id = ref <= ref1 ? ++i : --i) {
          promises.push($scope.getStory(id));
        }
        return $q.all(promises).then(function(stories) {
          stories = stories.filter(function(story) {
            return typeof story !== 'undefined';
          });
          if (stories.length > 0) {
            return $scope.stories = stories;
          }
        });
      });
    };
    return HackerNews.child('maxitem').on('value', $scope.getLatestStories);
  }
]).controller('ShowController', [
  '$scope', '$q', 'HackerNews', function($scope, $q, HackerNews) {
    $scope.stories = [];
    $scope.getShowStories = function() {
      return HackerNews.child('showstories').limitToFirst(20).once('value', function(data) {
        var i, id, showId, len, promises;
        console.log(data.val());
        showId = data.val();
        promises = [];   
        for (i = 0, len = showId.length; i < len; i++) {
          id = showId[i];
          promises.push($scope.getStory(id));
        }
        return $q.all(promises).then(function(stories) {
          stories = stories.filter(function(story) {
            return typeof story !== 'undefined';
          });
          if (stories.length > 0) {
            return $scope.stories = stories;
          }
        });
      });
    };
    return HackerNews.child('showstories').on('value', $scope.getShowStories);
  }
]).controller('JobController', [
  '$scope', '$q', 'HackerNews', function($scope, $q, HackerNews) {
    $scope.stories = [];
    $scope.getJobStories = function() {
      return HackerNews.child('jobstories').once('value', function(data) {
        var i, id, jobId, len, promises;
        console.log(data.val());
        jobId = data.val();
        promises = []; 
        for (i = 0, len = jobId.length; i < len; i++) {
          id = jobId[i];
          promises.push($scope.getStory(id));
        }
        return $q.all(promises).then(function(stories) {
          stories = stories.filter(function(story) {
            return typeof story !== 'undefined';
          });
          if (stories.length > 0) {
            return $scope.stories = stories;
          }
        });
      });
    };
    return HackerNews.child('jobstories').on('value', $scope.getJobStories);
  }
]).controller('AskController', [
  '$scope', '$q', 'HackerNews', function($scope, $q, HackerNews) {
    $scope.stories = [];
    $scope.getAskStories = function() {
      return HackerNews.child('askstories').once('value', function(data) {
        var i, id, askId, len, promises;
        console.log(data.val());
        askId = data.val();
        promises = []; 
        for (i = 0, len = askId.length; i < len; i++) {
          id = askId[i];
          promises.push($scope.getStory(id));
        }
        return $q.all(promises).then(function(stories) {
          stories = stories.filter(function(story) {
            return typeof story !== 'undefined';
          });
          if (stories.length > 0) {
            return $scope.stories = stories;
          }
        });
      });
    };
    return HackerNews.child('askstories').on('value', $scope.getAskStories);
  }
]);




var baseURL = 'https://hacker-news.firebaseio.com/v0';


// ITEM SPECIFIC STUFF

// Grab item from id, populate item_fields with information
// Could grab comments, but that comes later.
function viewItem(item) {
   var id = $(item).data('id'),
       item = itemList.filter(function(item) {return item.id === id;} ).pop(),
       numComments = item.kids ? item.kids.length : 0;

   $('#item_meta').html(entryFormat(item, /* full */ true));
   $('#front_page').addClass('hidden');
   $('#title').addClass('hidden');
   $('#item').removeClass('hidden');
   $('#back_button').removeClass('hidden');
   pageType = 'post';

   // Use $.when.apply($, objs) to wait for multiple ojects
   var commentRequests = getTopComments(item);
}

function getTopComments(item) {
   var commentids = item.kids;

   $('#comment_field').empty();

   // Return if no comments
   if (!commentids) {
      return;
   }

   requests = commentids.map(function(request) {
      return $.ajax(baseURL + '/item/' + request + '.json');
   });

   $.when.apply($, requests).done(function() {
      var comments = Array.prototype.slice.call(arguments);
      var results = [];

      // When there is only one comment, the second value is a string, not an
      // array.
      if (typeof comments[1] === "string") {
         results = [comments[0]];
      } else {
         results = comments.map(function(comment) {
            return comment[0];
         });
      }

      results.forEach(function(comment) {
         var text = comment.deleted ? '[Deleted]' : comment.text;
         var by = '<strong>' + (comment.deleted ? '[Deleted]' : comment.by) + '</strong>';
         var time = '<span class="time_since">' + getDateSincePost(comment.time) + '</span>';
         var element = '<div class="comment_blurb"><p>' + by + time + '<p>' + text + '</p></div>';
         $('#comment_field').append(element);
      });
   });
}
