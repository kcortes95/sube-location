name := "APiHitter"

version := "0.1"

scalaVersion := "2.12.7"

libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-actor" % "2.5.18",
  "com.typesafe.akka" %% "akka-stream" % "2.5.18",
  "com.typesafe.akka" %% "akka-http" % "10.1.5",
)

Compile/mainClass := Some("hitter.Main")


lazy val runHit = InputKey[Unit]("run","Hit it haard")
fullRunInputTask(runHit, Compile, "hitter.Main")