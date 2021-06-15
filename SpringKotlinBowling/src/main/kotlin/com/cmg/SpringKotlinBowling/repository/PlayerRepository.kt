package com.cmg.SpringKotlinBowling.repository
import com.cmg.SpringKotlinBowling.model.FramePostgre
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface PlayerRepository: CrudRepository<FramePostgre, Int>{

    @Query("SELECT * FROM frame_postgre WHERE id = (SELECT MAX(id) FROM frame_postgre)", nativeQuery = true)
    fun getLastFrame() : FramePostgre
}