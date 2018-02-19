const AuxiliaryFunctions = {
    getRandomExclOnes: function()
    {
        var rand = Math.floor(Math.random() * 4) + 1;
        var randExcl = Math.floor(Math.random() * 4) + 1;
        
        return "!".repeat(rand) + "1".repeat(randExcl);
    },

    getRandomSuffix: function()
    {
        var rand = Math.floor(Math.random() * 3);
        
        console.log(rand);
        switch (rand)
        {
            case 0:
                return ' ';
            case 1:
                return '!';
            case 2:
                return this.getRandomExclOnes();
        }
    }
}

module.exports = AuxiliaryFunctions;