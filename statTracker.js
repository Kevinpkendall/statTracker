//when doc is ready?
$('document').ready(function() {
////////////////////////////////////////////FUNCTIONS

    function trueShootingPercentage (totalShots, totalShotsFT, points, active, teamTotalShots, teamTotalShotsFT,teamPTS) {
        var TSA =  totalShots + (0.44 * totalShotsFT);
        var TS = (points / (2 * TSA)) * 100;
        $(active).children('.TS').html(TS.toFixed(1) + "%");
        var teamTSA = teamTotalShots + (0.44 * teamTotalShotsFT);
        var teamTS = (teamPTS / (2 * teamTSA)) * 100;
        $('.teamTS').html(teamTS.toFixed(1) + "%");
    }

    function effectiveFieldGoalPercentage (madeShots, madeShots3, totalShots, active,teamMadeShots,teamMadeShots3,teamTotalShots) {
        var eFG = ((madeShots + 0.5 * madeShots3) / totalShots) * 100;
        $(active).children('.eFG').html(eFG.toFixed(1) + "%");
        var teameFG = ((teamMadeShots + 0.5 * teamMadeShots3) / teamTotalShots) * 100;
        $('.teamEFG').html(teameFG.toFixed(1) + "%");
    }

    function assistToTurnoverRatio (astCounter, toCounter, active,teamast,teamturnover) {
        var ASTTO = astCounter / toCounter;
        $(active).children('.ASTTO').html(ASTTO.toFixed(1));
        var teamASTTO = teamast / teamturnover;
        $('.teamASTTO').html(teamASTTO.toFixed(1));
    }

    function turnoverPercentage (turnover, fga, fta, ast, active,teamturnover,teamfga,teamfta,teamast) {
        var TOV = (turnover / (fga + (0.44 * fta) + ast + turnover)) * 100;
        $(active).children('.TOV').html(TOV.toFixed(1) + "%");
        var teamTOV = (teamturnover / (teamfga + (0.44 * teamfta) + teamast + teamturnover)) * 100;
        $('.teamTOV').html(teamTOV.toFixed(1) + "%");
    }

    function pointsPerPossession (fga, fta, oreb, to, teamPTS) {
        var poss = fga + (0.44 * fta) - oreb + to;
        var ppp = teamPTS / poss;
        $('.teamPPP').html(ppp.toFixed(1));
    }


    function swapActiveClass(temp) {
        $(temp).siblings('li').removeClass("activeli");
        $(temp).toggleClass("activeli");
        $(temp).siblings('li').removeClass("info1");
        $(temp).toggleClass("info1");

        $('#editButton').toggleClass("disabled");
        //
        $('.active').removeClass('active');
        $('.info').removeClass('info');
        $('.movePlayer').removeClass('movePlayer');
    }
////////////////////////////////////////////
//////////////////////////////////////////// VARIABLES

    var populatePlayers = [];
    var populateTeamNames = [];
    var playerName1;
    var movePlayer1;
    var playerName2;
    var movePlayer2;
    var movePlayer1Row;
    var movePlayer2Row;
    var saveName;

    var regStatPanel = $('#regStatPanel');
    var advStatPanel = $('#advStatPanel');
////////////////////////////////////////////

    //Page loads with all .name sections being inputs
    $('<input class="nameInputs" placeholder="Player Name"/>').appendTo($('.name'));

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

    //-----------------------------------------------------------------------------------------------------------------
    $('#optionsButton').on("click", function () {

    });
    $('#editButton').on("click", function () {
        console.log("edit button 4");

        //save name in case user confirms a blank input
        saveName = $('.active').children('.name').html();
        $('.active').children('.name').html("");
        $('<input class="nameInputs" placeholder="Player Name" />').appendTo($('.active').children('.name'));
        //disable stat buttons when editing name
        $('.rightPanel, #editButton, .moveButton').addClass('disabled');
        $('.subMissedFG, .subMadeFG').addClass("hidden");
        $('.statButton').prop("disabled", true);
        $('#confirmEditButton, #missedFGButton, #madeFGButton').removeClass('hidden');
    });
    $('#confirmEditButton').on("click", function () {
        console.log("confirm edit button");
        var highlightedName = $('.active').children('.name').children('.nameInputs').val();
        $('.active').children('.name').text(highlightedName);
        $('.activeli').html(highlightedName);
        //if user enters nothing (""), the name will stay.
        if (highlightedName == "") {
            $('.active').children('.name').html(saveName);
            $('.activeli').html(saveName);
        }
        $('.statButton').prop("disabled", false);
        $('.rightPanel, #editButton, .moveButton').removeClass('disabled');
        $('#confirmEditButton').addClass("hidden");
    });
    $('#confirmAllEditButton').on("click", function () {
        console.log("confirm all edit button 3");

        //Reveal other buttons once names are confirmed
        $('#optionsButton').removeClass("hidden");
        $('#editButton').removeClass("hidden");
        $('#editTeamButton').removeClass("hidden");

        //populate array with all player names typed in to inputs
        for (var i = 0; i < $('.nameInputs').length; i++) {
            populatePlayers[i] = $('.nameInputs')[i].value;
            console.log(populatePlayers[i]);
        }
        for (var j = 0; j < $('.teamNameInput').length; j++) {
            populateTeamNames[j] = $('.teamNameInput')[j].value;
            console.log(populateTeamNames[j]);
        }
        $(this).addClass("hidden");

        $('.teamName').each(function (i, arr) {
            if ($(this).html() == "") {
                $(this).html(populateTeamNames[i]);
            }
        });

        $('.teamName').removeClass("hidden");
        $('.teamNameInput').addClass("hidden");

        //Iterates through all .playerNameList to populate all names that were typed in.
        $('.playerNameList').each(function (i , arr) {
            if ($(this).html() != "") {
                $(this).html(populatePlayers[i]);
            }
        });
        //Iterates through all .playerNameList to check for and hide empty slots
        $('.playerNameList').each(function(i, arr) {
            if ($(this).html() == "") {
                $(this).addClass("hidden");
            }
        });
        //Iterates through all .name to populate all names that were typed in.
        $('.name').each(function (i , arr) {
            if ($(this).html() != "") {
                $(this).html(populatePlayers[i]);
            }
        });
        //Iterates through all .name to check for and hide empty slots
        $('.name').each(function(i, arr) {
            if ($(this).html() == "") {
                $(this).parent().addClass("hidden");
            }
        });
    });         //end confirmalledit button
    // $('#editTeamButton').on("click", function () {
    //     $('#editHomeTeam, #editAwayTeam').toggleClass("hidden");
    // });

    $('#poss').on("click", function () {
        $('#homeArrow').toggleClass("hidden");
        $('#awayArrow').toggleClass("hidden");
    });



    $(document).on("click", '.hereButton', function () {
        $('.moveButton').toggleClass("hidden");
        $('.hereButton').toggleClass("hidden");
        $(this).parent().parent().toggleClass("movePlayer");
    });


    //Click events for moving players. //   http://stackoverflow.com/questions/20968042/cant-click-button-more-than-one-time-when-append-html-data
    $(document).on("click", ".moveButton", function () {
        //when move button is clicked disable all content except for names. toggle availability of everything
        $('#editButton').toggleClass("disabled");

        //when move button is clicked deselect all names
        $('.activeli').removeClass('activeli info1');
        $('.active').removeClass('active info');
        console.log("move button 9");


        //Allows first player clicked to be toggled before selecting the second player.
        if ($('.movePlayer').length < 2) {
            $(this).parent().parent().toggleClass("movePlayer");
            $('.moveButton').toggleClass("hidden");
            $('.hereButton').toggleClass("hidden");
            $('.rightPanel').toggleClass("disabled");
        }


        //save html of first player
        if ($('.movePlayer').length == 1) {
            playerName1 = $(this).parent().siblings('.name').html();
            movePlayer1 = populatePlayers.indexOf(playerName1);
        }

        $(document).on("click", '.hereButton', function() {
            if ($('.movePlayer').length == 2) {
                //save html of second player
                playerName2 = $(this).parent().siblings('.name').html();
                movePlayer2 = populatePlayers.indexOf(playerName2);

                //save rows
                movePlayer1Row = $('.movePlayer').eq(0).html();
                movePlayer2Row = $('.movePlayer').eq(1).html();

                //Switch places in the populatePlayers array
                var temp = populatePlayers[movePlayer1];
                populatePlayers[movePlayer1] = populatePlayers[movePlayer2];
                populatePlayers[movePlayer2] = temp;

                //Redisplay sidebar
                //Iterates through all .playerNameList to populate all names that were typed in.
                $('.playerNameList').each(function (i, arr) {
                    if ($(this).html() != "") {
                        $(this).html(populatePlayers[i]);
                    }
                });

                $('.movePlayer').eq(0).html(movePlayer2Row);
                $('.movePlayer').eq(1).html(movePlayer1Row);

                //Remove Highlighting
                $('.movePlayer').toggleClass('movePlayer');
                $('.rightPanel').removeClass('disabled');
            }
        });
    });

    $('.playerNameList').on("click", function() {
        swapActiveClass(this);
        //Enable stat buttons when a player is selected
        $('.statButton').prop("disabled", false);

        //store current name
        var currentName = $('.activeli').html();
        //change the found names class to active. This is how I highlight names in table when li is clicked.
        $('td:contains("' + currentName + '")').parent().toggleClass("active info");

        //store variables
        var active = $('.active');
        var teamRowStats = $('.teamRowStats');
        //Points
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
        var rbdCounter = parseInt(active.children('.reb').html());
        var orbdCounter = parseInt(active.children('.oreb').html());
        var drbdCounter = parseInt(active.children('.dreb').html());
        var astCounter = parseInt(active.children('.ast').html());
        var stlCounter = parseInt(active.children('.stl').html());
        var blkCounter = parseInt(active.children('.blk').html());
        var toCounter = parseInt(active.children('.to').html());
        var pfCounter = parseInt(active.children('.pf').html());
        //Team Row Stats
        var teamPTS = parseInt(teamRowStats.children('.pts').html());
        var teamMadeShots = parseInt(teamRowStats.children('.fgm').html());
        var teamTotalShots = parseInt(teamRowStats.children('.fga').html());
        var teamMadeShots3 = parseInt(teamRowStats.children('.3ptm').html());
        var teamTotalShots3 = parseInt(teamRowStats.children('.3pta').html());
        var teamMadeFT = parseInt(teamRowStats.children('.ftm').html());
        var teamTotalFT = parseInt(teamRowStats.children('.fta').html());
        var teamRBD = parseInt(teamRowStats.children('.reb').html());
        var teamORBD = parseInt(teamRowStats.children('.oreb').html());
        var teamDRBD = parseInt(teamRowStats.children('.dreb').html());
        var teamAST = parseInt(teamRowStats.children('.ast').html());
        var teamSTL = parseInt(teamRowStats.children('.stl').html());
        var teamBLK = parseInt(teamRowStats.children('.blk').html());
        var teamTO = parseInt(teamRowStats.children('.to').html());
        var teamPF = parseInt(teamRowStats.children('.pf').html());

        //Team Stats
        if (active.length == 1) {
            //////////          MADE FGS          //////////
            //     //if (fgMade button is clicked)
            $('#hiddenFGMade').on("click", function () {
                var active = $('.active');
                var teamRowStats = $('.teamRowStats');
                if (active.length > 0) {
                    madeShots++;
                    totalShots++;
                    points += 2;
                    teamPTS += 2;
                    teamMadeShots ++;
                    teamTotalShots ++;
                }
                //Increase Team Points Variable
                active.children('.fg').html(madeShots + "/" + totalShots);
                active.children('.fgm').html(madeShots);
                active.children('.fga').html(totalShots);
                active.children('.pts').html(points);
                teamRowStats.children('.pts').html(teamPTS);
                teamRowStats.children('.fg').html(teamMadeShots + "/" + teamTotalShots);
                teamRowStats.children('.fgm').html(teamMadeShots);
                teamRowStats.children('.fga').html(teamTotalShots);
                var teamFGPercent = teamMadeShots * 100 / teamTotalShots;
                $('.teamRowPercent').children('.fg').html(teamFGPercent.toFixed(1) + "%");
                trueShootingPercentage(totalShots, totalShotsFT, points, '.active',teamTotalShots,teamTotalFT,teamPTS);
                effectiveFieldGoalPercentage(madeShots, madeShots3, totalShots, '.active',teamMadeShots,teamMadeShots3,teamTotalShots);
                turnoverPercentage(toCounter, totalShots, totalShotsFT, astCounter, '.active',teamTO,teamTotalShots,teamTotalFT,teamAST);
                pointsPerPossession(teamTotalShots, teamTotalFT, teamORBD, teamTO, teamPTS);
                $('#homeTeamScore').html(teamPTS);
                $('.subMadeFG').addClass("hidden");
            });
            $('#hidden3PTMade').on("click", function () {
                var active = $('.active');
                var teamRowStats = $('.teamRowStats');
                if (active.length > 0) {
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
                active.children('.fg').html(madeShots + "/" + totalShots);
                active.children('.fgm').html(madeShots);
                active.children('.fga').html(totalShots);
                active.children('.3pt').html(madeShots3 + "/" + totalShots3);
                active.children('.3ptm').html(madeShots3);
                active.children('.3pta').html(totalShots3);
                active.children('.pts').html(points);
                $('#homeTeamScore').html(points);
                //Team
                teamRowStats.children('.fg').html(teamMadeShots + "/" + teamTotalShots);
                teamRowStats.children('.fgm').html(teamMadeShots);
                teamRowStats.children('.fga').html(teamTotalShots);
                teamRowStats.children('.3pt').html(teamMadeShots3 + "/" + teamTotalShots3);
                teamRowStats.children('.3ptm').html(teamMadeShots3);
                teamRowStats.children('.3pta').html(teamTotalShots3);
                teamRowStats.children('.pts').html(teamPTS);
                //Team Percent
                var teamFGPercent = teamMadeShots * 100 / teamTotalShots;
                $('.teamRowPercent').children('.fg').html(teamFGPercent.toFixed(1) + "%");
                var team3Percent = teamMadeShots3 * 100 / teamTotalShots3;
                $('.teamRowPercent').children('.3pt').html(team3Percent.toFixed(1) + "%");
                trueShootingPercentage(totalShots, totalShotsFT, points, '.active',teamTotalShots,teamTotalFT,teamPTS);
                effectiveFieldGoalPercentage(madeShots, madeShots3, totalShots, '.active',teamMadeShots,teamMadeShots3,teamTotalShots);
                turnoverPercentage(toCounter, totalShots, totalShotsFT, astCounter, '.active',teamTO,teamTotalShots,teamTotalFT,teamAST);
                pointsPerPossession(teamTotalShots, teamTotalFT, teamORBD, teamTO, teamPTS);
                $('#homeTeamScore').html(teamPTS);
                $('.subMadeFG').addClass("hidden");
            });
            //////////          MISSED FGS          //////////
            //if (fgMissed button is clicked)
            //When sub fg button is pressed, adds 1 missed shot to specific player clicked
            $('#hiddenFGMissed').on("click", function () {
                var active = $('.active');
                var teamRowStats = $('.teamRowStats');
                totalShots++;
                teamTotalShots ++;
                active.children('.fg').html(madeShots + "/" + totalShots);
                active.children('.fga').html(totalShots);
                teamRowStats.children('.fg').html(teamMadeShots + "/" + teamTotalShots);
                teamRowStats.children('.fga').html(teamTotalShots);

                var teamFGPercent = teamMadeShots * 100 / teamTotalShots;
                $('.teamRowPercent').children('.fg').html(teamFGPercent.toFixed(1) + "%");
                trueShootingPercentage(totalShots, totalShotsFT, points, '.active',teamTotalShots,teamTotalFT,teamPTS);
                effectiveFieldGoalPercentage(madeShots, madeShots3, totalShots, '.active',teamMadeShots,teamMadeShots3,teamTotalShots);
                turnoverPercentage(toCounter, totalShots, totalShotsFT, astCounter, '.active',teamTO,teamTotalShots,teamTotalFT,teamAST);
                pointsPerPossession(teamTotalShots, teamTotalFT, teamORBD, teamTO, teamPTS);
                $('.subMissedFG').addClass("hidden");
            });
            //else (3ptMissed button was clicked)
            //When sub 3pt button is pressed, adds 1 missed 3 point shot to 3pt column and FG column
            $('#hidden3PTMissed').on("click", function () {
                var active = $('.active');
                var teamRowStats = $('.teamRowStats');
                totalShots3++;
                totalShots++;
                teamTotalShots++;
                teamTotalShots3++;
                active.children('.fg').html(madeShots + "/" + totalShots);
                active.children('.fga').html(totalShots);
                active.children('.3pt').html(madeShots3 + "/" + totalShots3);
                active.children('.3pta').html(totalShots3);
                //Team Fraction
                teamRowStats.children('.fg').html(teamMadeShots + "/" + teamTotalShots);
                teamRowStats.children('.fga').html(teamTotalShots);
                teamRowStats.children('.3pt').html(teamMadeShots3 + "/" + teamTotalShots3);
                teamRowStats.children('.3pta').html(teamTotalShots3);
                //Team Percentages
                var teamFGPercent = teamMadeShots * 100 / teamTotalShots;
                var team3Percent = teamMadeShots3 * 100 / teamTotalShots3;
                $('.teamRowPercent').children('.fg').html(teamFGPercent.toFixed(1) + "%");
                $('.teamRowPercent').children('.3pt').html(team3Percent.toFixed(1) + "%");
                trueShootingPercentage(totalShots, totalShotsFT, points, '.active',teamTotalShots,teamTotalFT,teamPTS);
                effectiveFieldGoalPercentage(madeShots, madeShots3, totalShots, '.active',teamMadeShots,teamMadeShots3,teamTotalShots);
                turnoverPercentage(toCounter, totalShots, totalShotsFT, astCounter, '.active',teamTO,teamTotalShots,teamTotalFT,teamAST);
                pointsPerPossession(teamTotalShots, teamTotalFT, teamORBD, teamTO, teamPTS);
                $('.subMissedFG').addClass("hidden");
            });
            //////////          FREE THROWS          //////////
            $('#hiddenFTMade').on("click", function () {
                var active = $('.active');
                var teamRowStats = $('.teamRowStats');
                if ($('.active').length > 0) {
                    madeShotsFT++;
                    totalShotsFT++;
                    points++;
                    teamPTS++;
                    teamMadeFT ++;
                    teamTotalFT ++;
                }
                active.children('.ft').html(madeShotsFT + "/" + totalShotsFT);
                active.children('.ftm').html(madeShotsFT);
                active.children('.fta').html(totalShotsFT);
                active.children('.pts').html(points);
                //
                teamRowStats.children('.ft').html(teamMadeFT + "/" + teamTotalFT);
                teamRowStats.children('.ftm').html(teamMadeFT);
                teamRowStats.children('.fta').html(teamTotalFT);
                teamRowStats.children('.pts').html(teamPTS);
                var teamFTPercent = teamMadeFT * 100 / teamTotalFT;
                $('.teamRowPercent').children('.ft').html(teamFTPercent.toFixed(1) + "%");
                trueShootingPercentage(totalShots, totalShotsFT, points, '.active',teamTotalShots,teamTotalFT,teamPTS);
                effectiveFieldGoalPercentage(madeShots, madeShots3, totalShots, '.active',teamMadeShots,teamMadeShots3,teamTotalShots);
                turnoverPercentage(toCounter, totalShots, totalShotsFT, astCounter, '.active',teamTO,teamTotalShots,teamTotalFT,teamAST);
                pointsPerPossession(teamTotalShots, teamTotalFT, teamORBD, teamTO, teamPTS);
                $('#homeTeamScore').html(teamPTS);
                $('.subMadeFG').addClass("hidden");
            });
            //When sub ft button is pressed, adds 1 missed free throw
            $('#hiddenFTMissed').on("click", function () {
                var active = $('.active');
                var teamRowStats = $('.teamRowStats');
                //if ($('.active').length > 0) {
                totalShotsFT++;
                teamTotalFT++;
                //}
                active.children('.fta').html(totalShotsFT);
                active.children('.ft').html(madeShotsFT + "/" + totalShotsFT);
                //Team Fractions
                teamRowStats.children('.fta').html(teamTotalFT);
                teamRowStats.children('.ft').html(teamMadeFT + "/" + teamTotalFT);
                //Team Percent
                var teamFTPercent = teamMadeFT * 100 / teamTotalFT;
                $('.teamRowPercent').children('.ft').html(teamFTPercent.toFixed(1) + "%");
                trueShootingPercentage(totalShots, totalShotsFT, points, '.active',teamTotalShots,teamTotalFT,teamPTS);
                effectiveFieldGoalPercentage(madeShots, madeShots3, totalShots, '.active',teamMadeShots,teamMadeShots3,teamTotalShots);
                turnoverPercentage(toCounter, totalShots, totalShotsFT, astCounter, '.active',teamTO,teamTotalShots,teamTotalFT,teamAST);
                pointsPerPossession(teamTotalShots, teamTotalFT, teamORBD, teamTO, teamPTS);
                $('.subMissedFG').addClass("hidden");
            });

            //////////          OTHER STATS          //////////
            $('#orbd').on('click', function () {
                var active = $('.active');
                var teamRowStats = $('.teamRowStats');
                //When oRbd button is pressed, adds 1 rebound to specified name
                orbdCounter++;
                rbdCounter++;
                teamORBD++;
                teamRBD++;
                active.children('.oreb').html(orbdCounter);
                active.children('.reb').html(rbdCounter);
                teamRowStats.children('.oreb').html(teamORBD);
                teamRowStats.children('.reb').html(teamRBD);
                pointsPerPossession(teamTotalShots, teamTotalFT, teamORBD, teamTO, teamPTS);
                $('.subrbd').addClass("hidden");
            });
            $('#drbd').on('click', function () {
                var active = $('.active');
                var teamRowStats = $('.teamRowStats');
                //When dRbd button is pressed, adds 1 rebound to specified name
                drbdCounter++;
                rbdCounter++;
                teamDRBD++;
                teamRBD++;
                active.children('.dreb').html(drbdCounter);
                active.children('.reb').html(rbdCounter);
                teamRowStats.children('.dreb').html(teamDRBD);
                teamRowStats.children('.reb').html(teamRBD);
                $('.subrbd').addClass("hidden");
            });
            $('#astButton').on("click", function () {
                var active = $('.active');
                var teamRowStats = $('.teamRowStats');
                //When Ast button is pressed, adds 1 assist to specified name
                astCounter++;
                teamAST++;
                active.children('.ast').html(astCounter);
                teamRowStats.children('.ast').html(teamAST);
                //Update ast/to
                assistToTurnoverRatio (astCounter, toCounter, '.active',teamAST,teamTO);

                if (active.children('.ASTTO').html() == 'Infinity') {
                    active.children('.ASTTO').html("-");
                }
                if ($('.teamASTTO').html() == 'Infinity') {
                    $('.teamASTTO').html("-");
                }
                turnoverPercentage(toCounter, totalShots, totalShotsFT, astCounter, '.active',teamTO,teamTotalShots,teamTotalFT,teamAST);
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
                //Update ast/to
                assistToTurnoverRatio (astCounter, toCounter, '.active',teamAST,teamTO);
                //Update TOV%
                turnoverPercentage(toCounter, totalShots, totalShotsFT, astCounter, '.active',teamTO,teamTotalShots,teamTotalFT,teamAST);
                pointsPerPossession(teamTotalShots, teamTotalFT, teamORBD, teamTO, teamPTS);


            });
            $('#pfButton').on("click", function () {
                //When PF button is pressed, adds 1 block to specified name
                pfCounter++;
                teamPF++;
                $('.active').children('.pf').html(pfCounter);
                $('.teamRowStats').children('.pf').html(teamPF);
                $('#firstHalfHomeFoul').html("Fouls: " + teamPF);

                //Change pf td to red if the player has fouled out.
                if (pfCounter == 5) {
                    $('.active').children('.pf').css("background-color", "red");
                }
            });
        }
    }); //end .name click function

    //Done Buttons
    $('#doneButton').on("click", function () {
        $('#doneYes, #doneNo').toggleClass("hidden");
    });
    $('#doneNo').on("click", function () {
        $(this).toggleClass("hidden");
        $('#doneYes').toggleClass("hidden");
    });
    //Present the stats in a way that is easily copy/pasted
    $('#doneYes').on("click", function () {
        $('.rightPanel, .bottomSection, .topSection').addClass("hidden");
        $('.statPanel').css("width", "100%")
            .css("overflow", "inherit");
        $('.action, .benchHeader').addClass("hidden");

    });
}); //end document ready
