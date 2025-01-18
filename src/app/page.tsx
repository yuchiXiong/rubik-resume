import { getSchema, checkRepoExist } from "@/services/schema";
import HomeApp from "./components/app";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth-config";
import * as radash from 'radash'

export default async function Home() {
	const [err, session] = await radash.try(getServerSession)(authOptions);

	let pageStatus = 'unauthenticated'
	if (err || !session?.accessToken) {
		pageStatus = 'unauthenticated'
		return <HomeApp schemaList={[]} pageStatus={pageStatus} />
	} else {
		// const [err, data] = await radash.try(getRepoInfo)();
		const repoData = await checkRepoExist();
		console.log(repoData)
		const data = await getSchema();
		console.log(data);
		return <HomeApp schemaList={data.data} pageStatus={pageStatus} />
	}

}
