import express from "express";
import * as apartmentServices from "../services/apartmentsService";
import toNewApartmentEntry from "../utils/utils";

const router = express.Router();

router.get("/", (_req, res) => {
  try {
    res.send(apartmentServices.getApartments());
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

router.get("/basic", (_req, res) => {
  try {
    res.send(apartmentServices.getApartmentsBasicInfo());
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

router.get("/:id", (req, res) => {
  try {
    res.send(apartmentServices.getApartmentById(+req.params.id));
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

router.get("/basic/:id", (req, res) => {
  try {
    res.send(apartmentServices.getApartmentBasicInfoById(+req.params.id));
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

router.post("/", (req, res) => {
  try {
    const newApartmentEntry = toNewApartmentEntry(req.body);

    const addedApartmentEntry =
      apartmentServices.addApartment(newApartmentEntry);

    res.json(addedApartmentEntry);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

router.put("/:id", (req, res) => {
  try {
    const newApartmentEntry = toNewApartmentEntry(req.body);

    const updatedApartmentEntry = apartmentServices.updateApartment(
      +req.params.id,
      newApartmentEntry
    );

    res.json(updatedApartmentEntry);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

router.delete("/:id", (req, res) => {
  try {
    apartmentServices.removeApartment(+req.params.id);

    res.json("deleted");
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

export default router;
