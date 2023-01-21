var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
const helmet = require("helmet");
var cors = require("cors");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");

var app = express();
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("view engine", "ejs");
var http = require("http");
var server = http.createServer(app);

// Create Server start 
server.listen(3000);
server.on("listening", function () {
    console.log(
        "Server started on port %s at %s",
        server.address().port,
        server.address().address
    );
});
// Create Server end

// view engine setup start
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(helmet());
var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname + "/uploads"));
app.use("/uploads", express.static("uploads/"));
// view engine setup end

app.use(bodyParser.urlencoded());
// app.use("/test", function(req, res, next) {
//     console.log(req.body);
//     console.log('check');
// });

//routes - controller
var testRouter = require("./routes/test.js");
TotalteamCount = 10;
byeCount = 0;
mactchesCountList = [];
function powerOfTwo(x) {
    return (Math.log(x)/Math.log(2)) % 1 === 0;
}

function nearestPoweroftwo(n)
{
    let res = 0;
    for (let i = n; i >= 1; i--){
        // If i is a power of 2
        if ((i & (i - 1)) == 0){
                res = i;
                break;
            }
    }
  return res;
}

function getTheHighestPowerOfTwo(TotalteamCount){
    var lowest2ndNumber = nearestPoweroftwo(TotalteamCount);
    var str = Math.log(lowest2ndNumber)/Math.log(2)+1;
    var getTheHighestPowerOfTwo = Math.pow(2, str);
    return getTheHighestPowerOfTwo;
}

function getByeTeamcount(highestPowerOfTwo,TotalteamCount){
    byeVlaue = highestPowerOfTwo - TotalteamCount;
    return byeVlaue;
}

if(!powerOfTwo(TotalteamCount)){
    highestPowerOfTwo = getTheHighestPowerOfTwo(TotalteamCount);
    byeCount = getByeTeamcount(highestPowerOfTwo,TotalteamCount);
}else{
    highestPowerOfTwo = TotalteamCount;
}
function getTotalmatches(){
    totalMatches = TotalteamCount - 1;
    return totalMatches;
}
totalRounds = Math.log(highestPowerOfTwo)/Math.log(2);

function getMatchCountOnRounds(TotalteamCount){
   var nearestPoweroftwoValue =  nearestPoweroftwo(TotalteamCount);
   firstRound = nearestPoweroftwoValue - byeCount;
   mactchesCountList.push(firstRound);
   var temp = Math.log(nearestPoweroftwoValue)/Math.log(2)
   for(i=0;i<temp;i++){
    nearestPoweroftwoValue = nearestPoweroftwoValue/2;
    mactchesCountList.push(nearestPoweroftwoValue);
   }
}

getMatchCountOnRounds(TotalteamCount);
console.log(getTotalmatches());
console.log(byeCount);
console.log(mactchesCountList);

app.use(
    "/test",
    testRouter,
);