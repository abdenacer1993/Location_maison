import { Component, OnInit } from "@angular/core";
import { MapService } from "src/app/services/map.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent implements OnInit {
  constructor(private map: MapService) {}
  ngOnInit() {
    this.map.buildMap();
  }
}
