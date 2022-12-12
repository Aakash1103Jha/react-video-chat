import { NextFunction, Request, Response } from "express";
import { InitError } from "../utils/initError";

export const errorhandler = async (err: InitError, _: Request, res: Response, next: NextFunction) => {
	const { message, statusCode } = err;
	return res.status(statusCode).json(message);
};
