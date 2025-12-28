import { Router, Request, Response } from 'express';
import { pool } from '../db';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Get all heros for a specific user
router.get('/:userId/heros', requireAuth, async (req: Request, res: Response) => {
    const query = `
        SELECT * FROM cypher('iron_scribe_graph', $$
            MATCH (u:User {id: $userId})-[:OWNS]->(h:Hero)
            RETURN h.id, h.name, h.level
        $$, jsonb_build_object('userId', $1)) 
        AS (id agtype, name agtype, level agtype);
    `;
    try {
        const result = await pool.query(query, [req.params.userId]);
        res.json(result.rows);
    } catch (err: unknown) { 
        const message = err instanceof Error ? err.message : "Internal Server Error";
        res.status(500).json({ error: message });
    }
});

export default router;