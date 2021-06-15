package com.cmg.SpringKotlinBowling.model

data class Frame (
    var id: Int,
    var currentShot: Int,
    var frameShots: ArrayList<Int>,
    var localScore: Int,
    var bonusShots: Int,
    var isExpired: Boolean,
    var isUpdated: Boolean){
}