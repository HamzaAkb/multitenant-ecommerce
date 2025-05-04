import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
    getMany: baseProcedure.query(async ({ ctx }) => {
        const data = await ctx.db.find({
            collection: 'categories' as any,
            depth: 1, // popuulate subcategories
            pagination: false,
            where: {
                parent: {
                    exists: false,
                },
            },
            sort: 'name',
        })

        const formattedData = data.docs.map((doc) => ({
            ...doc,
            subcategories: (doc.subcategories?.docs ?? []).map((subdoc: any) => ({
                ...subdoc,
                subcategories: undefined,
            })),
        }))


        return formattedData
    })
})