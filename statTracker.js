$('document').ready(function() {


    //init bootstrap popovers
    $(function () {
        $('[data-toggle="popover"]').popover()
    })
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
        if ($('.nameInputs').length == 0) {
            $(temp).parent().toggleClass("active info");
            $(temp).parent().siblings('tr').removeClass("activeli");
            $(temp).parent().siblings('tr').removeClass("active");
            $(temp).parent().toggleClass("activeli");
            $(temp).parent().siblings('tr').removeClass("info1");
            $(temp).parent().siblings('tr').removeClass("info");
            $(temp).parent().toggleClass("info1");

            //Enable stat buttons when a player is selected
            if ($('.active').length > 0) {
                $('.editButton, .statButton').removeClass("disabled");
            } else {
                $('.editButton, .statButton').addClass("disabled");
            }
            $('.movePlayer').removeClass('movePlayer');
        }

    }
////////////////////////////////////////////
////////////////////////////////////////////CONSTRUCTOR FUNCTION

    function Player (name, id) {
        this.id = id;
        this.name = name;
        this.points = 0;
        this.rebounds = 0;
        this.oRebounds = 0;
        this.dRebounds = 0;
        this.steals = 0;
        this.assists = 0;
        this.blocks = 0;
        this.turnovers = 0;
        this.fouls = 0;
        this.fgm = 0;
        this.fga = 0;
        this.threePtMade = 0;
        this.threePtA = 0;
        this.fta = 0;
        this.ftm = 0;
    }
    var Team = {
        points: 0,
        rebounds: 0,
        oRebounds: 0,
        dRebounds: 0,
        steals: 0,
        assists: 0,
        blocks: 0,
        turnovers: 0,
        fouls: 0,
        fgm: 0,
        fga: 0,
        threePtMade: 0,
        threePtA: 0,
        fta: 0,
        ftm: 0
    }
////////////////////////////////////////////

//////////////////////////////////////////// VARIABLES

    var populatePlayers = [];
    var populateTeamNames = [];
    var populatePlayerObjects = [];
    var playerName1;
    var movePlayer1;
    var playerName2;
    var movePlayer2;
    var movePlayer1Row;
    var movePlayer2Row;
    var saveName;
    var currentName;

////////////////////////////////////////////

    //Page loads with all .name sections being inputs
    $('<input class="nameInputs" placeholder="Player Name"/>').appendTo($('.name'));

    $("#regStatsButton, #mobileRegStatsButton").click(function () {
        $('.advStat').addClass("hidden");
        $('.regStat').removeClass("hidden");
        $('.centerButtonDiv').removeClass("hidden");
        $('.teamRowPercent').removeClass("hidden");
        $('.statPanel h1').html("STAT PANEL");
    });
    //Change all regStat to hidden and all advStat off of hidden
    $("#advStatsButton, #mobileAdvStatsButton").click(function () {
        $('.regStat').addClass("hidden");
        $('.advStat').removeClass("hidden");
        $('.centerButtonDiv').addClass("hidden");
        $('.teamRowPercent').addClass("hidden");
        $('.statPanel h1').html("ADVANCED STAT PANEL");
    });

    //TODO
    // $('#optionsButton').on("click", function () {
    //
    // });

    $('.editButton').on("click", function () {
        console.log("edit button 4");

        //save name in case user confirms a blank input
        saveName = $('.active').children('.name').html();
        $('.active').children('.name').html("");
        $('<input class="nameInputs" placeholder="Player Name" />').appendTo($('.active').children('.name'));
        //disable stat buttons when editing name
        $('.rightPanel, .editButton, .moveButton').addClass('disabled');
        $('.statButton').addClass("disabled");
        $('.confirmEditButton, #missedFGButton, .madeFGButton').removeClass('hidden');
    });


    $('.confirmEditButton').on("click", function () {
        console.log("confirm edit button");
        var highlightedName = $('.active').children('.name').children('.nameInputs').val();
        $('.active').children('.name').text(highlightedName);

        //if user enters nothing (""), the name will stay.
        if (highlightedName == "") {
            $('.active').children('.name').html(saveName);
        }

        //update array with new player name that was typed in
        $('.name').each(function (i , arr) {
            if ($(this).html() != "") {
                populatePlayers[i] = $(this).html();
                // console.log(populatePlayers[i]);
            }
        });

        $('.statButton').removeClass("disabled");
        $('.rightPanel, .editButton, .moveButton').removeClass('disabled');
        $('.confirmEditButton').addClass("hidden");
    });

    $('.confirmAllEditButton').on("click", function () {

        //Reveal other buttons once names are confirmed
        $('#optionsButton').removeClass("hidden");
        $('.editButton').removeClass("hidden");
        $('#editTeamButton').removeClass("hidden");

        //populate array with all player names typed in to inputs
        for (var i = 0; i < $('.nameInputs').length; i++) {
            if ($('.nameInputs')[i].value != "") {
                populatePlayers[i] = $('.nameInputs')[i].value;
                // console.log(populatePlayers[i]);
            }
        }
        //populate array with team names typed in to inputs
        for (var j = 0; j < $('.teamNameInput').length; j++) {
            populateTeamNames[j] = $('.teamNameInput')[j].value;
            // console.log(populateTeamNames[j]);
        }
        $(this).addClass("hidden");

        $('.teamName').each(function (i, arr) {
            if ($(this).html() == "") {
                $(this).html(populateTeamNames[i]);
            }
        });

        $('.teamName').removeClass("hidden");
        $('.teamNameInput').addClass("hidden");

        //Iterates through all .name to:
        $('.name').each(function (i , arr) {
            // 1.remove rows that did not have a name typed in
            if ($(this).children().val() == "") {
                $(this).parent().remove();
            }
            // 2.populate all names that were typed in.
            else if ($(this).html() != "") {
                $(this).html(populatePlayers[i]);
            }
        });

        for (var i = 0; i < populatePlayers.length; i++) {
            populatePlayerObjects[i] = new Player(populatePlayers[i], i);
            // console.log(populatePlayerObjects[i].name);
        }
    });         //end confirmalledit button

    // $('#editTeamButton').on("click", function () {
    //     $('#editHomeTeam, #editAwayTeam').toggleClass("hidden");
    // });

    //Toggle possession arrow
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
        //The disabled class is removed inside the swapActiveClass function
        $('.editButton').addClass("disabled");
        $('.statButton').addClass("disabled");

        //when move button is clicked deselect all names
        $('.activeli').removeClass('activeli info1');
        $('.active').removeClass('active info');
        console.log("move button 9");


        //Allows first player clicked to be toggled before selecting the second player.
        if ($('.movePlayer').length < 2) {
            $(this).parent().parent().toggleClass("movePlayer");
            $('.moveButton').toggleClass("hidden");
            $('.hereButton').toggleClass("hidden");
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
                $('.name').each(function (i, arr) {
                    if ($(this).html() != "") {
                        $(this).html(populatePlayers[i]);
                    }
                });

                $('.movePlayer').eq(0).html(movePlayer2Row);
                $('.movePlayer').eq(1).html(movePlayer1Row);

                //Remove Highlighting
                $('.movePlayer').toggleClass('movePlayer');
            }
        });

    });
    
    $(document).on("click", '.name', function() {
        swapActiveClass(this);

        //store current name
        currentName = $('.active').children('.name').text();
        console.log(currentName);
    });
    
    //////////          MADE FGS          //////////
    $(document).on("click", '#hiddenFGMade', function() {
        /////       /////       /////       /////       /////       /////       /////       /////       /////
        //                     Implementing new object oriented way of updating stats                      //

        var active = $('.active');
        var teamRowStats = $('.teamRowStats');

        //Iterate through playerObjects array
        for (var i = 0; i < populatePlayerObjects.length; i++) {
            if (populatePlayerObjects[i].name === currentName) {
                console.log(populatePlayerObjects[i].name === currentName);
                populatePlayerObjects[i].fgm += 1;
                populatePlayerObjects[i].fga += 1;
                populatePlayerObjects[i].points += 2;
                Team.points += 2;
                Team.fgm += 1;
                Team.fga += 1;

                //Update HTML
                active.children('.fg').html(populatePlayerObjects[i].fgm + "/" + populatePlayerObjects[i].fga);
                active.children('.pts').html(populatePlayerObjects[i].points);
                teamRowStats.children('.pts').html(Team.points);
                teamRowStats.children('.teamFG').html(Team.fgm + "/" + Team.fga);

                var playerFGPercent = populatePlayerObjects[i].fgm * 100 / populatePlayerObjects[i].fga;
                active.children('.fgPercent').html(playerFGPercent.toFixed(1) + "%");
                var teamFGPercent = Team.fgm * 100 / Team.fga;
                $('.teamRowPercent').children('.teamFG').html(teamFGPercent.toFixed(1) + "%");
                trueShootingPercentage(populatePlayerObjects[i].fga, populatePlayerObjects[i].fta, populatePlayerObjects[i].points, '.active', Team.fga, Team.fta, Team.points);
                effectiveFieldGoalPercentage(populatePlayerObjects[i].fgm, populatePlayerObjects[i].threePtMade, populatePlayerObjects[i].fga, '.active', Team.fgm, Team.threePtMade, Team.fga);
                turnoverPercentage(populatePlayerObjects[i].turnovers, populatePlayerObjects[i].fga, populatePlayerObjects[i].fta, populatePlayerObjects[i].assists, '.active', Team.turnovers, Team.fga, Team.fta, Team.assists);
                pointsPerPossession(populatePlayerObjects[i].fga, populatePlayerObjects[i].fta, Team.oRebounds, Team.turnovers, Team.points);
                $('#homeTeamScore').html(Team.points);
            }
        }
    });
        /////       /////       /////       /////       /////       /////       /////       /////       /////


    // $('#hidden3PTMade').on("click", function () {
    $(document).on("click", '#hidden3PTMade', function() {
        var active = $('.active');
        var teamRowStats = $('.teamRowStats');
        for (var i = 0; i < populatePlayerObjects.length; i++) {
            if (populatePlayerObjects[i].name === currentName) {
                populatePlayerObjects[i].fgm++;
                populatePlayerObjects[i].fga++;
                populatePlayerObjects[i].threePtMade++;
                populatePlayerObjects[i].threePtA++;
                populatePlayerObjects[i].points += 3;
                Team.points += 3;
                Team.fgm++;
                Team.fga++;
                Team.threePtMade++;
                Team.threePtA++;

                //Update all FG tds and 3pt tds
                active.children('.fg').html(populatePlayerObjects[i].fgm + "/" + populatePlayerObjects[i].fga);
                active.children('.3pt').html(populatePlayerObjects[i].threePtMade + "/" + populatePlayerObjects[i].threePtA);
                active.children('.pts').html(populatePlayerObjects[i].points);
                $('#homeTeamScore').html(populatePlayerObjects[i].points);
                //Team
                teamRowStats.children('.teamFG').html(Team.fgm + "/" + Team.fga);
                teamRowStats.children('.team3pt').html(Team.threePtMade + "/" + Team.threePtA);
                teamRowStats.children('.pts').html(Team.points);
                //Player Percent
                var playerFGPercent = populatePlayerObjects[i].fgm * 100 / populatePlayerObjects[i].fga;
                active.children('.fgPercent').html(playerFGPercent.toFixed(1) + "%");
                var player3Percent = populatePlayerObjects[i].threePtMade * 100 / populatePlayerObjects[i].threePtA;
                active.children('.3ptPercent').html(player3Percent.toFixed(1) + "%");
                //Team Percent
                var teamFGPercent = Team.fgm * 100 / Team.fga;
                $('.teamRowPercent').children('.teamFG').html(teamFGPercent.toFixed(1) + "%");
                var team3Percent = Team.threePtMade * 100 / Team.threePtA;
                $('.teamRowPercent').children('.team3pt').html(team3Percent.toFixed(1) + "%");
                trueShootingPercentage(populatePlayerObjects[i].fga, populatePlayerObjects[i].fta, populatePlayerObjects[i].points, '.active', Team.fga, Team.fta, Team.points);
                effectiveFieldGoalPercentage(populatePlayerObjects[i].fgm, populatePlayerObjects[i].threePtMade, populatePlayerObjects[i].fga, '.active', Team.fgm, Team.threePtMade, Team.fga);
                turnoverPercentage(populatePlayerObjects[i].turnovers, populatePlayerObjects[i].fga, populatePlayerObjects[i].fta, populatePlayerObjects[i].assists, '.active', Team.turnovers, Team.fga, Team.fta, Team.assists);
                pointsPerPossession(Team.fga, Team.fta, Team.oRebounds, Team.turnovers, Team.points);
                $('#homeTeamScore').html(Team.points);
            }
        }
    });
    //////////          MISSED FGS          //////////
    //When fg button is pressed, adds 1 missed shot to specific player clicked
    // $('#hiddenFGMissed').on("click", function () {
    $(document).on("click", '#hiddenFGMissed', function() {
        var active = $('.active');
        var teamRowStats = $('.teamRowStats');
        for (var i = 0; i < populatePlayerObjects.length; i++) {
            if (populatePlayerObjects[i].name === currentName) {
                populatePlayerObjects[i].fga++;
                Team.fga++;
                active.children('.fg').html(populatePlayerObjects[i].fgm + "/" + populatePlayerObjects[i].fga);
                teamRowStats.children('.teamFG').html(Team.fgm + "/" + Team.fga);
                teamRowStats.children('.fga').html(Team.fga);
                var playerFGPercent = populatePlayerObjects[i].fgm * 100 / populatePlayerObjects[i].fga;
                active.children('.fgPercent').html(playerFGPercent.toFixed(1) + "%");
                var teamFGPercent = Team.fgm * 100 / Team.fga;
                $('.teamRowPercent').children('.teamFG').html(teamFGPercent.toFixed(1) + "%");
                trueShootingPercentage(populatePlayerObjects[i].fga, populatePlayerObjects[i].fta, populatePlayerObjects[i].points, '.active', Team.fga, Team.fta, Team.points);
                effectiveFieldGoalPercentage(populatePlayerObjects[i].fgm, populatePlayerObjects[i].threePtMade, populatePlayerObjects[i].fga, '.active', Team.fgm, Team.threePtMade, Team.fga);
                turnoverPercentage(populatePlayerObjects[i].turnovers, populatePlayerObjects[i].fga, populatePlayerObjects[i].fta, populatePlayerObjects[i].assists, '.active', Team.turnovers, Team.fga, Team.fta, Team.assists);
                pointsPerPossession(Team.fga, Team.fta, Team.oRebounds, Team.turnovers, Team.points);
            }
        }
    });

    //When 3pt button is pressed, adds 1 missed shot to 3pt column and FG column
    $(document).on("click", '#hidden3PTMissed', function() {
        var active = $('.active');
        var teamRowStats = $('.teamRowStats');
        for (var i = 0; i < populatePlayerObjects.length; i++) {
            if (populatePlayerObjects[i].name === currentName) {
                populatePlayerObjects[i].threePtA++;
                populatePlayerObjects[i].fga++;
                Team.fga++;
                Team.threePtA++;
                active.children('.fg').html(populatePlayerObjects[i].fgm + "/" + populatePlayerObjects[i].fga);
                active.children('.3pt').html(populatePlayerObjects[i].threePtMade + "/" + populatePlayerObjects[i].threePtA);
                //Team Fraction
                teamRowStats.children('.teamFG').html(Team.fgm + "/" + Team.fga);
                teamRowStats.children('.team3pt').html(Team.threePtMade + "/" + Team.threePtA);
                //Player Percent
                var playerFGPercent = populatePlayerObjects[i].fgm * 100 / populatePlayerObjects[i].fga;
                active.children('.fgPercent').html(playerFGPercent.toFixed(1) + "%");
                var player3Percent = populatePlayerObjects[i].threePtMade * 100 / populatePlayerObjects[i].threePtA;
                active.children('.3ptPercent').html(player3Percent.toFixed(1) + "%");
                //Team Percent
                var teamFGPercent = Team.fgm * 100 / Team.fga;
                var team3Percent = Team.threePtMade * 100 / Team.threePtA;
                $('.teamRowPercent').children('.teamFG').html(teamFGPercent.toFixed(1) + "%");
                $('.teamRowPercent').children('.team3pt').html(team3Percent.toFixed(1) + "%");
                trueShootingPercentage(populatePlayerObjects[i].fga, populatePlayerObjects[i].fta, populatePlayerObjects[i].points, '.active', Team.fga, Team.fta, Team.points);
                effectiveFieldGoalPercentage(populatePlayerObjects[i].fgm, populatePlayerObjects[i].threePtMade, populatePlayerObjects[i].fga, '.active', Team.fgm, Team.threePtMade, Team.fga);
                turnoverPercentage(populatePlayerObjects[i].turnovers, populatePlayerObjects[i].fga, populatePlayerObjects[i].fta, populatePlayerObjects[i].assists, '.active', Team.turnovers, Team.fga, Team.fta, Team.assists);
                pointsPerPossession(Team.fga, Team.fta, Team.oRebounds, Team.turnovers, Team.points);
            }
        }
    });
    //////////          FREE THROWS          //////////
    $(document).on("click", '#hiddenFTMade', function() {
        console.log("name click test 4");
        var active = $('.active');
        var teamRowStats = $('.teamRowStats');
        for (var i = 0; i < populatePlayerObjects.length; i++) {
            if (populatePlayerObjects[i].name === currentName) {
                populatePlayerObjects[i].ftm++;
                populatePlayerObjects[i].fta++;
                populatePlayerObjects[i].points++;
                Team.points++;
                Team.ftm++;
                Team.fta++;
                //Player Fractions
                active.children('.ft').html(populatePlayerObjects[i].ftm + "/" + populatePlayerObjects[i].fta);
                active.children('.pts').html(populatePlayerObjects[i].points);
                //Team Fractions
                teamRowStats.children('.teamFT').html(Team.ftm + "/" + Team.fta);
                teamRowStats.children('.pts').html(Team.points);
                //Player Percent
                var playerFTPercent = populatePlayerObjects[i].ftm * 100 / populatePlayerObjects[i].fta;
                active.children('.ftPercent').html(playerFTPercent.toFixed(1) + "%");
                //Team Percent
                var teamFTPercent = Team.ftm * 100 / Team.fta;
                $('.teamRowPercent').children('.teamFT').html(teamFTPercent.toFixed(1) + "%");
                trueShootingPercentage(populatePlayerObjects[i].fga, populatePlayerObjects[i].fta, populatePlayerObjects[i].points, '.active', Team.fga, Team.fta, Team.points);
                effectiveFieldGoalPercentage(populatePlayerObjects[i].fgm, populatePlayerObjects[i].threePtMade, populatePlayerObjects[i].fga, '.active', Team.fgm, Team.threePtMade, Team.fga);
                turnoverPercentage(populatePlayerObjects[i].turnovers, populatePlayerObjects[i].fga, populatePlayerObjects[i].fta, populatePlayerObjects[i].assists, '.active', Team.turnovers, Team.fga, Team.fta, Team.assists);
                pointsPerPossession(Team.fga, Team.fta, Team.oRebounds, Team.turnovers, Team.points);
                $('#homeTeamScore').html(Team.points);
            }
        }
    });
    //When sub ft button is pressed, adds 1 missed free throw
    $(document).on("click", '#hiddenFTMissed', function() {
        var active = $('.active');
        var teamRowStats = $('.teamRowStats');
        for (var i = 0; i < populatePlayerObjects.length; i++) {
            if (populatePlayerObjects[i].name === currentName) {
                populatePlayerObjects[i].fta++;
                Team.fta++;
                //Player Fractions
                active.children('.ft').html(populatePlayerObjects[i].ftm + "/" + populatePlayerObjects[i].fta);
                //Team Fractions
                teamRowStats.children('.teamFT').html(Team.ftm + "/" + Team.fta);
                //Player Percent
                var playerFTPercent = populatePlayerObjects[i].ftm * 100 / populatePlayerObjects[i].fta;
                active.children('.ftPercent').html(playerFTPercent.toFixed(1) + "%");
                //Team Percent
                var teamFTPercent = Team.ftm * 100 / Team.fta;
                $('.teamRowPercent').children('.teamFT').html(teamFTPercent.toFixed(1) + "%");
                trueShootingPercentage(populatePlayerObjects[i].fga, populatePlayerObjects[i].fta, populatePlayerObjects[i].points, '.active', Team.fga, Team.fta, Team.points);
                effectiveFieldGoalPercentage(populatePlayerObjects[i].fgm, populatePlayerObjects[i].threePtMade, populatePlayerObjects[i].fga, '.active', Team.fgm, Team.threePtMade, Team.fga);
                turnoverPercentage(populatePlayerObjects[i].turnovers, populatePlayerObjects[i].fga, populatePlayerObjects[i].fta, populatePlayerObjects[i].assists, '.active', Team.turnovers, Team.fga, Team.fta, Team.assists);
                pointsPerPossession(Team.fga, Team.fta, Team.oRebounds, Team.turnovers, Team.points);
            }
        }
    });

    //////////          OTHER STATS          //////////
    $(document).on("click", '#orbd', function() {
        var active = $('.active');
        var teamRowStats = $('.teamRowStats');
        for (var i = 0; i < populatePlayerObjects.length; i++) {
            if (populatePlayerObjects[i].name === currentName) {
                //When oRbd button is pressed, adds 1 rebound to specified name
                populatePlayerObjects[i].oRebounds++;
                populatePlayerObjects[i].rebounds++;
                Team.oRebounds++;
                Team.rebounds++;
                active.children('.oreb').html(populatePlayerObjects[i].oRebounds);
                active.children('.reb').html(populatePlayerObjects[i].rebounds);
                teamRowStats.children('.oreb').html(Team.oRebounds);
                teamRowStats.children('.reb').html(Team.rebounds);
                pointsPerPossession(Team.fga, Team.fta, Team.oRebounds, Team.turnovers, Team.points);
            }
        }
    });
    $(document).on("click", '#drbd', function() {

        var active = $('.active');
        var teamRowStats = $('.teamRowStats');
        for (var i = 0; i < populatePlayerObjects.length; i++) {
            if (populatePlayerObjects[i].name === currentName) {
                //When dRbd button is pressed, adds 1 rebound to specified name
                populatePlayerObjects[i].dRebounds++;
                populatePlayerObjects[i].rebounds++;
                Team.dRebounds++;
                Team.rebounds++;
                active.children('.dreb').html(populatePlayerObjects[i].dRebounds);
                active.children('.reb').html(populatePlayerObjects[i].rebounds);
                teamRowStats.children('.dreb').html(Team.dRebounds);
                teamRowStats.children('.reb').html(Team.rebounds);
            }
        }
    });
    $('#astButton').on("click", function () {
        var active = $('.active');
        var teamRowStats = $('.teamRowStats');
        for (var i = 0; i < populatePlayerObjects.length; i++) {
            if (populatePlayerObjects[i].name === currentName) {
                //When Ast button is pressed, adds 1 assist to specified name
                populatePlayerObjects[i].assists++;
                Team.assists++;
                active.children('.ast').html(populatePlayerObjects[i].assists);
                teamRowStats.children('.ast').html(Team.assists);
                assistToTurnoverRatio(populatePlayerObjects[i].assists, populatePlayerObjects[i].turnovers, '.active', Team.assists, Team.turnovers);
                if (active.children('.ASTTO').html() == 'Infinity') {
                    active.children('.ASTTO').html("-");
                }
                if ($('.teamASTTO').html() == 'Infinity') {
                    $('.teamASTTO').html("-");
                }
                turnoverPercentage(populatePlayerObjects[i].turnovers, populatePlayerObjects[i].fga, populatePlayerObjects[i].fta, populatePlayerObjects[i].assists, '.active', Team.turnovers, Team.fga, Team.fta, Team.assists);
            }
        }
    });
    $('#stlButton').on("click", function () {
        var active = $('.active');
        var teamRowStats = $('.teamRowStats');
        for (var i = 0; i < populatePlayerObjects.length; i++) {
            if (populatePlayerObjects[i].name === currentName) {
                //When Stl button is pressed, adds 1 steal to specified name
                populatePlayerObjects[i].steals++;
                Team.steals++;
                $('.active').children('.stl').html(populatePlayerObjects[i].steals);
                $('.teamRowStats').children('.stl').html(Team.steals);
            }
        }
    });
    $('#blkButton').on("click", function () {
        var active = $('.active');
        var teamRowStats = $('.teamRowStats');
        for (var i = 0; i < populatePlayerObjects.length; i++) {
            if (populatePlayerObjects[i].name === currentName) {
                //When Blk button is pressed, adds 1 block to specified name
                populatePlayerObjects[i].blocks++;
                Team.blocks++;
                $(".active").children('.blk').html(populatePlayerObjects[i].blocks);
                $('.teamRowStats').children('.blk').html(Team.blocks);
            }
        }
    });
    $('#toButton').on("click", function () {
        var active = $('.active');
        var teamRowStats = $('.teamRowStats');
        for (var i = 0; i < populatePlayerObjects.length; i++) {
            if (populatePlayerObjects[i].name === currentName) {
                //When TO button is pressed, adds 1 block to specified name
                populatePlayerObjects[i].turnovers++;
                Team.turnovers++;
                $(".active").children('.to').html(populatePlayerObjects[i].turnovers);
                $('.teamRowStats').children('.to').html(Team.turnovers);
                assistToTurnoverRatio(populatePlayerObjects[i].assists, populatePlayerObjects[i].turnovers, '.active', Team.assists, Team.turnovers);
                turnoverPercentage(populatePlayerObjects[i].turnovers, populatePlayerObjects[i].fga, populatePlayerObjects[i].fta, populatePlayerObjects[i].assists, '.active', Team.turnovers, Team.fga, Team.fta, Team.assists);
                pointsPerPossession(Team.fga, Team.fta, Team.oRebounds, Team.turnovers, Team.points);
            }
        }
    });
    $('#pfButton').on("click", function () {
        var active = $('.active');
        var teamRowStats = $('.teamRowStats');
        for (var i = 0; i < populatePlayerObjects.length; i++) {
            if (populatePlayerObjects[i].name === currentName) {
                //When PF button is pressed, adds 1 block to specified name
                populatePlayerObjects[i].fouls++;
                Team.fouls++;
                $('.active').children('.pf').html(populatePlayerObjects[i].fouls);
                $('.teamRowStats').children('.pf').html(Team.fouls);
                $('#firstHalfHomeFoul').html("Fouls: " + Team.fouls);

                //Change pf td to red if the player has fouled out.
                if (populatePlayerObjects[i].fouls == 5) {
                    $('.active').children('.pf').css("background-color", "red");
                }
            }
        }
    });

    $(document).on("click", '.changeFieldGoalStatDisplay', function () {
        $('.fg').toggleClass("hidden");
        $('.fgPercent').toggleClass("hidden");
    });
    $(document).on("click", '.change3PointStatDisplay', function () {
        $('.3pt').toggleClass("hidden");
        $('.3ptPercent').toggleClass("hidden");
    });
    $(document).on("click", '.changeFreeThrowStatDisplay', function () {
        $('.ft').toggleClass("hidden");
        $('.ftPercent').toggleClass("hidden");
    });

    //Present the stats in a way that is easily copy/pasted
    $(document).on("click", '#doneYes', function() {
        $('.rightPanel, .bottomSection, .topSection').addClass("hidden");
        $('.statPanel').css("width", "100%")
            .css("overflow", "inherit");
        $('.action, .benchHeader').addClass("hidden");

    });

    // Bootstrap popover for made Field Goals
    $('a.madeFGButton').popover({
        container: 'body',
        html: true,
        title: 'What type of Field Goal?',
        placement: 'top',
        content: '<button class="btn btn-success subMadeFG" id="hiddenFTMade"> FT</button>' +
        '<button class="btn btn-success subMadeFG" id="hidden3PTMade"> 3PT</button>' +
        '<button class="btn btn-success subMadeFG" id="hiddenFGMade"> FG</button>'
    });

    // Bootstrap popover for missed Field Goals
    $('a.missedFGButton').popover({
        container: 'body',
        html: true,
        title: 'What type of Field Goal?',
        placement: 'top',
        content: '<button class="btn btn-danger subMissedFG" id="hiddenFTMissed"> FT</button>' +
        '<button class="btn btn-danger subMissedFG" id="hidden3PTMissed"> 3PT</button>' +
        '<button class="btn btn-danger subMissedFG" id="hiddenFGMissed"> FG</button>'
    });

    // Bootstrap popover for rebounds
    $('a#rbdButton').popover({
        container: 'body',
        html: true,
        title: 'Offensive or Defensive?',
        placement: 'top',
        content: '<button class="btn btn-default statButton subrbd" id="orbd"> Offensive</button>' +
        '<button class="btn btn-default statButton subrbd" id="drbd"> Defensive</button>'
    });

    // Bootstrap popover for done button
    $('a#doneButton').popover({
        container: 'body',
        html: true,
        title: 'Are you sure?',
        placement: 'top',
        content: '<button class="btn btn-success btn-sm btn-group-row btn-block" id="doneYes"> YES </button>' +
        '<button class="btn btn-danger btn-sm btn-group-row btn-block" id="doneNo"> NO </button>'
    });



}); //end document ready
