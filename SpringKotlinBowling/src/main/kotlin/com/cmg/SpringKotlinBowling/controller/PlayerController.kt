package com.cmg.SpringKotlinBowling.controller
import com.cmg.SpringKotlinBowling.model.FramePostgre
import com.cmg.SpringKotlinBowling.service.PlayerService
import org.springframework.web.bind.annotation.*


@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/player/game")
class PlayerController(private val playerService: PlayerService){

    //URL EXAMPLE TO TEST THE ENDPOINT WITH MORE THAN ONE @REQUESTPARAM =>
    // http://localhost:8080/api/player/game/roll?id=1&currShot=8
    //with ONE @REQUESTPARAM:
    //URL EXAMPLE TO TEST THE ENDPOINT (with get) => http://localhost:8080/api/player/game/roll?currShot=1
    @PostMapping("/roll")
    fun getCurrentShot(@RequestBody currShot : Int){
        this.playerService.playRoll(currShot)
    }

    @GetMapping("/scoreboard") //retrieve scoreboard from DB table
    fun getCompleteScoreBoard() : MutableIterable<FramePostgre> = this.playerService.getScoreBoard()

    @GetMapping("/frame") //retireve last frame from DB table
    fun getLastFrame() : FramePostgre = this.playerService.getLastFrame()

    @DeleteMapping("/scoreboard") //clear DB table
    fun deleteGame() = this.playerService.deleteAll()

}
