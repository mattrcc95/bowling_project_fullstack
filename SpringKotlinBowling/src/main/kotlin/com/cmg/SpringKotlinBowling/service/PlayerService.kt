package com.cmg.SpringKotlinBowling.service
import com.cmg.SpringKotlinBowling.model.Frame
import com.cmg.SpringKotlinBowling.model.FramePostgre
import com.cmg.SpringKotlinBowling.repository.PlayerRepository
import org.springframework.stereotype.Service

@Service
class PlayerService (private val playerRepository: PlayerRepository){
    private var game = arrayListOf<Frame>()

    fun getScoreBoard() : MutableIterable<FramePostgre> = this.playerRepository.findAll()
    fun uploadFrame(framePostgre: FramePostgre) : FramePostgre = this.playerRepository.save(framePostgre)

    fun deleteAll(){
        game = arrayListOf<Frame>()
        this.playerRepository.deleteAll()
    }

    fun getLastFrame() : FramePostgre = this.playerRepository.getLastFrame()

    fun playRoll(currentShot: Int){
        val currentFrame = Frame(0, currentShot, arrayListOf(), 0, 0, false, false)
        if(game.isEmpty()){
            currentFrame.id = 1
            game.add(currentFrame)
            val scoreBoard = playRollAndGetScoreBoard(game)
            scoreBoard.forEach { framePostgre -> uploadFrame(framePostgre) }
        } else{
            val lastFrame = game[game.lastIndex]
            val isRollPlayable = lastFrame.id < 10 || (lastFrame.id == 10 && !lastFrame.isExpired)
            if(isRollPlayable) {
                if (lastFrame.isExpired) {
                    currentFrame.id = lastFrame.id + 1
                    game.add(currentFrame)
                } else {
                    lastFrame.currentShot = currentShot
                }
                val scoreBoard = playRollAndGetScoreBoard(game)
                scoreBoard.forEach { framePostgre -> uploadFrame(framePostgre) }
            } else{
                println("game ends!")
            }
        }
    }

}