import { getUser } from "../data-access/user";

export default async function UsersPage({
    params,
}: {
    params: {
        userId: string;
    }
}) {

    const user = await getUser(params.userId);
    
    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            {user ? (
                    <div>Users: {user.name}</div>
                ) : (
                    <div>User not found</div>
                )}
        </main>
        </div>
    );
}
