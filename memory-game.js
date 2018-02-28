(function (window) {
    "use strict";

    function MemoryGame() {
        this.gameDataArray = [];
        this.badgesToCompare = [];
        this.gameStarted = false;
        this.allowedClicks = 2;
        this.clickAllowed = true;
        this.availablePairs = 9;
        this.defaultImg = 'https://i2.wp.com/codebits.eu/logos/defaultavatar.jpg';
    }

    /**
     * Checks if badge is already in the list to be compared
     *
     * @param id
     * @returns {boolean}
     */
    MemoryGame.prototype.alreadyInList = function (id) {
        let i;
        for (i = 0; i < this.badgesToCompare.length; i++) {
            if (this.badgesToCompare[i].index === id) {
                console.log("found it");
                return true;
            }
        }

        return false;
    };

    /**
     * Gets the corresponding badge image source and checks if badges match.
     *
     * Also validates if there are still badges to match, if all have been matched displays a link to share the total elapsed time on twitter.
     *
     * @param id
     */
    MemoryGame.prototype.changeSource = function (id) {
        if (!this.gameStarted || !this.clickAllowed) {
            return;
        }

        let badgeId = parseInt(id.split('-')[1]);
        if (this.badgesToCompare.length > 0 && this.alreadyInList(id)) {
            document.getElementById(this.badgesToCompare[this.badgesToCompare.length - 1].index).src = this.defaultImg;
            this.badgesToCompare.pop();
            this.allowedClicks = 2;
            return;
        }

        if (this.badgesToCompare.length === 2) {
            return;
        }

        console.log(this.gameDataArray[badgeId]);
        document.getElementById(id).src = this.gameDataArray[badgeId].img;

        this.badgesToCompare.push({src: this.gameDataArray[badgeId].img, index: id});

        this.allowedClicks--;


        if (this.allowedClicks === 0) {

            this.clickAllowed = false;

            if (this.badgesToCompare[this.badgesToCompare.length - 1].src !== this.badgesToCompare[this.badgesToCompare.length - 2].src) {
                setTimeout(this.resetPair.bind(this), 750);

            } else {

                this.availablePairs--;
                document.getElementById(this.badgesToCompare[this.badgesToCompare.length - 1].index).classList.add('matched');
                document.getElementById(this.badgesToCompare[this.badgesToCompare.length - 2].index).classList.add('matched');

                if (this.availablePairs === 0) {
                    this.gameStarted = false;

                    let stopwatch = document.getElementById('stopwatch');
                    let timer = document.getElementById('timer');
                    let totalTime = timer.innerHTML;
                    let twitter = document.getElementById('twitter');

                    twitter.setAttribute( 'href', 'https://twitter.com/intent/tweet/?text=Memory JavaScript FTW in: ' + totalTime );

                    stopwatch.style.display = 'none';
                    twitter.style.display = 'block';

                } else {

                    this.badgesToCompare.pop();
                    this.badgesToCompare.pop();
                }
            }

            this.clickAllowed = true;
            this.allowedClicks = 2;
        }
    };

    /**
     * Resets the pair of badges so it displays the default badge cover
     */
    MemoryGame.prototype.resetPair = function () {
        document.getElementById(this.badgesToCompare[this.badgesToCompare.length - 1].index).src = this.defaultImg;
        document.getElementById(this.badgesToCompare[this.badgesToCompare.length - 2].index).src = this.defaultImg;
        this.badgesToCompare.pop();
        this.badgesToCompare.pop();
    };

    /**
     * Starts the game by hiding the start button, starting the timer and displaying it
     */
    MemoryGame.prototype.startGame = function () {
        let start = document.getElementById('start-game');
        let stopwatch = document.getElementById('stopwatch');

        this.gameStarted = true;

        window.setInterval(function () {
            if (!this.gameStarted)
                return;
            start.style.display = 'none';
            stopwatch.style.display = 'block';
            this.updateTimer();

        }.bind(this), 800);

    };

    /**
     * Receives a previously chosen list of badges and shuffle it.
     *
     * @param arrayBadges
     * @returns {*}
     */
    MemoryGame.prototype.shuffleBadges = function (arrayBadges) {
        let currentIndex = arrayBadges.length;
        let temporaryValue;
        let randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = arrayBadges[currentIndex];
            arrayBadges[currentIndex] = arrayBadges[randomIndex];
            arrayBadges[randomIndex] = temporaryValue;
        }

        return arrayBadges;
    };

    /**
     * Choose badges from list and duplicate them to have the resulting total number of badges.
     * Defaults to 9 badges to be chosen, resulting in a total of 18 badges.
     *
     * @param array
     * @param numBadges
     * @returns {*[]}
     */
    MemoryGame.prototype.chooseBadges = function (array, numBadges = 9) {
        let badgesArray = [];

        for (let i = 0; i < numBadges; i++) {
            badgesArray[i] = array[i];
        }

        return badgesArray.concat(badgesArray.slice(0));

    };

    /**
     * Update the timer to display the elapsed playing time.
     */
    MemoryGame.prototype.updateTimer = function () {
        let time = parseInt(document.getElementById('timer').innerHTML.split(' ')[0]);
        time += 1;
        document.getElementById('timer').innerHTML = time + ' segundos';
    };

    window.MemoryGame = MemoryGame;

})(window);