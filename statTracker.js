//when doc is ready?
$('document').ready(function() {
////////////////////////////////////////////FUNCTIONS
    function swapActiveClass(temp) {
        $(temp).siblings('tr').removeClass("active");
        $(temp).toggleClass("active");
        $(temp).siblings('tr').removeClass("info");
        $(temp).toggleClass("info");
    }

    // function swapActiveClass(temp) {
    //     $(temp).parent('tr').siblings().removeClass("active");
    //     $(temp).parent('tr').addClass("active");
    //     $(temp).parent('tr').siblings().removeClass("info");
    //     $(temp).parent('tr').addClass("info");
    // }
////////////////////////////////////////////
//////////////////////////////////////////// VARIABLES
    // var teamFG;
    // var team3PT;
    // var teamFT;

    var populatePlayers = [];
    var range = 10;

    var regStatPanel = $('#regStatPanel');
    var advStatPanel = $('#advStatPanel');
////////////////////////////////////////////

    //Page loads with all .name sections being inputs
    $('.name').html("");
    $('<input class="nameInputs" placeholder="Player Name"/>').appendTo($('.name'));


    //////////          ERROR CHECKING          //////////
    //Throw error if user tries to track stat without selecting a player

    //////////          </>ERROR CHECKING</>          //////////

    $("#regStatsButton").click(function () {
        $('.advStat').addClass("hidden");
        $('.regStat').removeClass("hidden");
        $('.centerButtonDiv').removeClass("hidden");
        $('.teamRowPercent').removeClass("hidden");
        $('.statPanel h1').html("STAT PANEL");
    });
    //Change all regStat to hidden and all advStat off of hidden
    $("#advStatsButton").click(function () {
        $('.regStat').addClass("hidden");
        $('.advStat').removeClass("hidden");
        $('.centerButtonDiv').addClass("hidden");
        $('.teamRowPercent').addClass("hidden");
        $('.statPanel h1').html("ADVANCED STAT PANEL");
    });

    //TODO
//Add functionality to FG buttons.
    //When Red FG button is pressed, the fg,ft,3pt buttons appear

    $('#missedFGButton').on("click", function () {
        $('.subMissedFG').toggleClass("hidden");
        $('#madeFGButton').toggleClass("hidden");
    });
    $('.subMissedFG').on("click",function() {
        $('#madeFGButton').toggleClass("hidden");
    });
    $('#madeFGButton').on("click", function () {
        $('.subMadeFG').toggleClass("hidden");
        $('#missedFGButton').toggleClass("hidden");
    });
    $('.subMadeFG').on("click",function() {
        $('#missedFGButton').toggleClass("hidden");
    });
    $('#rbdButton').on("click", function () {
        $('.subrbd').toggleClass("hidden");
    });

    //This is going to get massively complicated....
    // $('.p1').on("click",function() {
    //     $('.p1').parent().addClass('active');
    //     $('.p1').parent().addClass('info');
    //     console.log("testtesttest");
    // });

    //-----------------------------------------------------------------------------------------------------------------
    $('#editButton').on("click", function () {
        console.log("edit button 1");

        $('.active').children('.name').html("");
        $('<input class="nameInputs" placeholder="Player Name" />').appendTo($('.active').children('.name'));
        $('#confirmEditButton').removeClass('hidden');
        $('.active').removeClass("active info");
    });
    $('#confirmEditButton').on("click", function () {
        console.log("confirm edit button");

        // var highlightedName = $('.active').children('.name').children('.nameInputs').val();
        var highlightedName = $('.name').children('.nameInputs').val();
        $('.active').children('.name').text(highlightedName);
        if (highlightedName == "") {
            $('.active').addClass('hidden');
        }
        $('#confirmEditButton').addClass("hidden");
    });
    $('#confirmAllEditButton').on("click", function () {
        console.log("confirm all edit button");


        //var highlightedName = $('.name').children('.nameInputs').val();
        //var highlightedName = $('.active').children('.name').children('.nameInputs').val();

        //populate array with all player names typed in to inputs
        for (var i = 0; i < range; i++) {      //change the 10 to match the number of nameInputs
            populatePlayers[i] = $('.nameInputs')[i].value;
        }
        $(this).addClass("hidden");

        //Iterates through all .name to populate all names that were typed in.
        $('.name').each(function (i , arr) {
            if ($(this).html() != "") {
                $(this).html(populatePlayers[i]);
            }
        });
        //Iterates through all .name to check for empty slots
        $('.name').each(function(i, arr) {
            if ($(this).html() == "") {
                $(this).parent().addClass("hidden");
            }
        });
    });         //end confirmalledit button


    //--------------------------------------------------------------------------------------------------------------
    //$('.name')[i] + "<--- .name[i]";               //.html(populatePlayers);





    // if (highlightedName == "") {
    //     $('.active').addClass('hidden');
    // }
    // $('#confirmAllEditButton').addClass('hidden');





// $('.name').on("click", function() {
//     swapActiveClass(this);

//     var madeShots = parseInt($('.active').children('.fgm').html());
//     var totalShots = parseInt($('.active').children('.fga').html());
//
// });

$('.name').parent('tr').on("click", function() {

    swapActiveClass(this);



    //var tempThis = this;

    //Remove Error Check
    // if ($('.active').length =! 0) {
    //     $('#regStatPanel h1')
    //         .html("STAT PANEL")
    //         .css("background-color", "");
    // }

    //Points
    var active = $('.active');
    var points = parseInt(active.children('.pts').html());

    //Go see what is in FG column
    var madeShots = parseInt(active.children('.fgm').html());
    var totalShots = parseInt(active.children('.fga').html());
    //Go see what is in 3pt column
    var madeShots3 = parseInt(active.children('.3ptm').html());
    var totalShots3 = parseInt(active.children('.3pta').html());
    //Go see what is in FT column
    var madeShotsFT = parseInt(active.children('.ftm').html());
    var totalShotsFT = parseInt(active.children('.fta').html());
    //Update all other stats
    var rbdCounter = parseInt($('.active').children('.reb').html());
    var orbdCounter = parseInt($('.active').children('.oreb').html());
    var drbdCounter = parseInt($('.active').children('.dreb').html());
    var astCounter = parseInt($('.active').children('.ast').html());
    var stlCounter = parseInt($('.active').children('.stl').html());
    var blkCounter = parseInt($('.active').children('.blk').html());
    var toCounter = parseInt($('.active').children('.to').html());
    var pfCounter = parseInt($('.active').children('.pf').html());
    //Team Row Stats
    var teamPTS = parseInt($('.teamRowStats').children('.pts').html());
    var teamMadeShots = parseInt($('.teamRowStats').children('.fgm').html());
    var teamTotalShots = parseInt($('.teamRowStats').children('.fga').html());
    var teamMadeShots3 = parseInt($('.teamRowStats').children('.3ptm').html());
    var teamTotalShots3 = parseInt($('.teamRowStats').children('.3pta').html());
    var teamMadeFT = parseInt($('.teamRowStats').children('.ftm').html());
    var teamTotalFT = parseInt($('.teamRowStats').children('.fta').html());
    var teamRBD = parseInt($('.teamRowStats').children('.reb').html());
    var teamORBD = parseInt($('.teamRowStats').children('.oreb').html());
    var teamDRBD = parseInt($('.teamRowStats').children('.dreb').html());
    var teamAST = parseInt($('.teamRowStats').children('.ast').html());
    var teamSTL = parseInt($('.teamRowStats').children('.stl').html());
    var teamBLK = parseInt($('.teamRowStats').children('.blk').html());
    var teamTO = parseInt($('.teamRowStats').children('.to').html());
    var teamPF = parseInt($('.teamRowStats').children('.pf').html());

    //Team Stats
    if ($('.active').length == 1) {
        //////////          MADE FGS          //////////
        //     //if (fgMade button is clicked)
        $('#hiddenFGMade').on("click", function () {
            if ($('.active').length > 0) {
                madeShots++;
                totalShots++;
                points += 2;
                teamPTS += 2;
                teamMadeShots ++;
                teamTotalShots ++;
            }
            //Track and increase individual pts?
            //Increase Team Points Variable
            $('.active').children('.fg').html(madeShots + "/" + totalShots);
            $('.active').children('.fgm').html(madeShots);
            $('.active').children('.fga').html(totalShots);
            $('.active').children('.pts').html(points);
            $('.teamRowStats').children('.pts').html(teamPTS);
            $('.teamRowStats').children('.fg').html(teamMadeShots + "/" + teamTotalShots);
            $('.teamRowStats').children('.fgm').html(teamMadeShots);
            $('.teamRowStats').children('.fga').html(teamTotalShots);
            var teamFGPercent = teamMadeShots * 100 / teamTotalShots;
            $('.teamRowPercent').children('.fg').html(teamFGPercent.toFixed(1) + "%");

            $('#homeTeamScore').html(teamPTS);
            $('.subMadeFG').addClass("hidden");
        });
        $('#hidden3PTMade').on("click", function () {
            if ($('.active').length > 0) {
                madeShots++;
                totalShots++;
                madeShots3++;
                totalShots3++;
                points += 3;
                teamPTS += 3;
                teamMadeShots ++;
                teamTotalShots ++;
                teamMadeShots3 ++;
                teamTotalShots3 ++;
            }
            //Update all FG tds and 3pt tds
            $('.active').children('.fg').html(madeShots + "/" + totalShots);
            $('.active').children('.fgm').html(madeShots);
            $('.active').children('.fga').html(totalShots);
            $('.active').children('.3pt').html(madeShots3 + "/" + totalShots3);
            $('.active').children('.3ptm').html(madeShots3);
            $('.active').children('.3pta').html(totalShots3);
            $('.active').children('.pts').html(points);
            //Team
            $('.teamRowStats').children('.fg').html(teamMadeShots + "/" + teamTotalShots);
            $('.teamRowStats').children('.fgm').html(teamMadeShots);
            $('.teamRowStats').children('.fga').html(teamTotalShots);
            $('.teamRowStats').children('.3pt').html(teamMadeShots3 + "/" + teamTotalShots3);
            $('.teamRowStats').children('.3ptm').html(teamMadeShots3);
            $('.teamRowStats').children('.3pta').html(teamTotalShots3);
            $('.teamRowStats').children('.pts').html(teamPTS);
            //Team Percent
            var teamFGPercent = teamMadeShots * 100 / teamTotalShots;
            $('.teamRowPercent').children('.fg').html(teamFGPercent.toFixed(1) + "%");
            var team3Percent = teamMadeShots3 * 100 / teamTotalShots3;
            $('.teamRowPercent').children('.3pt').html(team3Percent.toFixed(1) + "%");
            $('#homeTeamScore').html(teamPTS);
            $('.subMadeFG').addClass("hidden");
        });
        //////////          MISSED FGS          //////////
        //if (fgMissed button is clicked)
        //When sub fg button is pressed, adds 1 missed shot to specific player clicked
        $('#hiddenFGMissed').on("click", function () {
            totalShots++;
            teamTotalShots ++;
            $('.active').children('.fg').html(madeShots + "/" + totalShots);
            $('.active').children('.fga').html(totalShots);
            $('.teamRowStats').children('.fg').html(teamMadeShots + "/" + teamTotalShots);
            $('.teamRowStats').children('.fga').html(teamTotalShots);

            var teamFGPercent = teamMadeShots * 100 / teamTotalShots;
            $('.teamRowPercent').children('.fg').html(teamFGPercent.toFixed(1) + "%");

            $('.subMissedFG').addClass("hidden");
        });
        //else (3ptMissed button was clicked)
        //When sub 3pt button is pressed, adds 1 missed 3 point shot to 3pt column and FG column
        $('#hidden3PTMissed').on("click", function () {
            totalShots3++;
            totalShots++;
            teamTotalShots++;
            teamTotalShots3++;
            $('.active').children('.fg').html(madeShots + "/" + totalShots);
            $('.active').children('.fga').html(totalShots);
            $('.active').children('.3pt').html(madeShots3 + "/" + totalShots3);
            $('.active').children('.3pta').html(totalShots3);
            //Team Fraction
            $('.teamRowStats').children('.fg').html(teamMadeShots + "/" + teamTotalShots);
            $('.teamRowStats').children('.fga').html(teamTotalShots);
            $('.teamRowStats').children('.3pt').html(teamMadeShots3 + "/" + teamTotalShots3);
            $('.teamRowStats').children('.3pta').html(teamTotalShots3);
            //Team Percentages
            var teamFGPercent = teamMadeShots * 100 / teamTotalShots;
            var team3Percent = teamMadeShots3 * 100 / teamTotalShots3;
            $('.teamRowPercent').children('.fg').html(teamFGPercent.toFixed(1) + "%");
            $('.teamRowPercent').children('.3pt').html(team3Percent.toFixed(1) + "%");
            $('.subMissedFG').addClass("hidden");
        });
        //////////          FREE THROWS          //////////
        $('#hiddenFTMade').on("click", function () {
            if ($('.active').length > 0) {
                madeShotsFT++;
                totalShotsFT++;
                points++;
                teamPTS++;
                teamMadeFT ++;
                teamTotalFT ++;
            }
            $('.active').children('.ft').html(madeShotsFT + "/" + totalShotsFT);
            $('.active').children('.ftm').html(madeShotsFT);
            $('.active').children('.fta').html(totalShotsFT);
            $('.active').children('.pts').html(points);
            //
            $('.teamRowStats').children('.ft').html(teamMadeFT + "/" + teamTotalFT);
            $('.teamRowStats').children('.ftm').html(teamMadeFT);
            $('.teamRowStats').children('.fta').html(teamTotalFT);
            $('.teamRowStats').children('.pts').html(teamPTS);
            var teamFTPercent = teamMadeFT * 100 / teamTotalFT;
            $('.teamRowPercent').children('.ft').html(teamFTPercent.toFixed(1) + "%");
            $('#homeTeamScore').html(teamPTS);
            $('.subMadeFG').addClass("hidden");
        });
        //When sub ft button is pressed, adds 1 missed free throw
        $('#hiddenFTMissed').on("click", function () {
            //if ($('.active').length > 0) {
            totalShotsFT++;
            teamTotalFT++;
            //}
            $('.active').children('.fta').html(totalShotsFT);
            $('.active').children('.ft').html(madeShotsFT + "/" + totalShotsFT);
            //Team Fractions
            $('.teamRowStats').children('.fta').html(teamTotalFT);
            $('.teamRowStats').children('.ft').html(teamMadeFT + "/" + teamTotalFT);
            //Team Percent
            var teamFTPercent = teamMadeFT * 100 / teamTotalFT;
            $('.teamRowPercent').children('.ft').html(teamFTPercent.toFixed(1) + "%");
            $('.subMissedFG').addClass("hidden");
        });

        //////////          OTHER STATS          //////////
        $('#orbd').on('click', function () {
            //When oRbd button is pressed, adds 1 rebound to specified name
            orbdCounter++;
            rbdCounter++;
            teamORBD++;
            teamRBD++;
            $('.active').children('.oreb').html(orbdCounter);
            $('.active').children('.reb').html(rbdCounter);
            $('.teamRowStats').children('.oreb').html(teamORBD);
            $('.teamRowStats').children('.reb').html(teamRBD);
            $('.subrbd').addClass("hidden");
        });
        $('#drbd').on('click', function () {
            //When dRbd button is pressed, adds 1 rebound to specified name
            drbdCounter++;
            rbdCounter++;
            teamDRBD++;
            teamRBD++;
            $('.active').children('.dreb').html(drbdCounter);
            $('.active').children('.reb').html(rbdCounter);
            $('.teamRowStats').children('.dreb').html(teamDRBD);
            $('.teamRowStats').children('.reb').html(teamRBD);
            $('.subrbd').addClass("hidden");
        });
        $('#astButton').on("click", function () {
            //swapActiveClass(tempThis);
            //When Ast button is pressed, adds 1 assist to specified name
            astCounter++;
            teamAST++;
            $('.active').children('.ast').html(astCounter);
            $('.teamRowStats').children('.ast').html(teamAST);
        });
        $('#stlButton').on("click", function () {
            //When Stl button is pressed, adds 1 steal to specified name
            stlCounter++;
            teamSTL++;
            $('.active').children('.stl').html(stlCounter);
            $('.teamRowStats').children('.stl').html(teamSTL);
        });
        $('#blkButton').on("click", function () {
            //When Blk button is pressed, adds 1 block to specified name
            blkCounter++;
            teamBLK++;
            $(".active").children('.blk').html(blkCounter);
            $('.teamRowStats').children('.blk').html(teamBLK);
        });
        $('#toButton').on("click", function () {
            //When TO button is pressed, adds 1 block to specified name
            toCounter++;
            teamTO++;
            $(".active").children('.to').html(toCounter);
            $('.teamRowStats').children('.to').html(teamTO);
        });
        $('#pfButton').on("click", function () {
            //When PF button is pressed, adds 1 block to specified name
            pfCounter++;
            teamPF++;
            $(".active").children('.pf').html(pfCounter);
            $('.teamRowStats').children('.pf').html(teamPF);
        });
    }
}); //end .name click function
//TODO DONE
//need to find way to increment html by 1 rather than just changing the html to "1"
//Convert to number

//TODO DONE
//override bootstrap default styling on table so highlighting is more apparent

//TODO
//condense this block into a function. D.R.Y this out
//
// function stuff (button, statClass) {
//  $(button).on('click', function () {
//  $('.active').children(statClass).html("1");
//  });
// }
//
// stuff ('#rbdButton', '.rbd')
}); //end document ready
