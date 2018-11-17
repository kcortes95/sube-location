package hitter

import java.util.concurrent.TimeUnit

import akka.actor.{Actor, ActorRef, Props}
import akka.http.scaladsl.Http
import akka.http.scaladsl.model.{HttpRequest, HttpResponse}

import scala.concurrent.duration.Duration
import scala.concurrent.{Await, Future}

class HitActor(statActor: ActorRef) extends Actor {

  implicit val system = context.system

  override def receive: Receive = {
    case HitRequest(lat, long, db) =>
      val start = System.currentTimeMillis()
      val uri = s"http://localhost:3000/$db/$lat/$long/500"
      val responseFuture: Future[HttpResponse] = Http().singleRequest(HttpRequest(uri = uri))
      val result = Await.result(responseFuture, Duration(10, TimeUnit.SECONDS))
      statActor ! Done(result, System.currentTimeMillis() - start)
  }

}

object HitActor {
  def props(actor: ActorRef) =  Props(new HitActor(actor))
}
case class HitRequest(lat: String, long: String, db: String)
case class Done(result: HttpResponse, time: Long)