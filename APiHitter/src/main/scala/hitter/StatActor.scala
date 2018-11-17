package hitter

import akka.actor.Actor
import akka.http.scaladsl.model.HttpResponse

import scala.collection.mutable.ListBuffer

class StatActor extends Actor {

  var count = 0
  var startTime: Long = 0
  var total = 0
  var timeList = ListBuffer[Long]()
  override def receive: Receive = {
    case SetMax(max) =>
      total = max
      startTime = System.currentTimeMillis()
    case Done(httpResponse, time) =>
      count = count + 1
      timeList += time
      if(count == total){
        println(s"Total: ${System.currentTimeMillis() - startTime}")
        println(s"Promedio: ${timeList.sum / total}")
      }
  }

}

case class SetMax(max: Int)