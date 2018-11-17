package hitter

import akka.actor.{ActorSystem, Props}
import akka.routing.RoundRobinPool

import scala.io.Source

object Main extends App {

  val hitterCount: Int = args(0).toInt
  val db: String = args(1)
  val file = Source.fromFile(args(2)).getLines().toList
  val system = ActorSystem("gis")
  val stat = system.actorOf(Props[StatActor])
  val hitters = system.actorOf(RoundRobinPool(hitterCount).props(HitActor.props(stat)),"hitters")
  stat ! SetMax(file.size)
  file.foreach(line => {
    val split = line.split(",")
    hitters ! HitRequest(split(1), split(0), db)
  })
}
