const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: 'q0bdmt5v',
    dataset: 'production',
    token: 'sktQKCCKjfN8Wj1lnQtN3MZ2q1pYBEvYsGLNOpPxA0mMaudxN1KVhXKX7VGZpxaToB34O3wCu30qZzYVxpIBr2akATxBhLqWVpcMiSRsmbYwcu9t08CbADA1bS40EywZDjus2eHFqkDWqPmX2fO4OStorGwRR12J8K44ELLUq0htA77NcEGf',
    apiVersion: '2026-01-22',
    useCdn: false
});

const servicesContent = [
    {
        slug: 'reiki-kundalini',
        title: 'Reiki Kundalini',
        stripePriceId: 'price_1SsRKHHvoxa2NZ5dBojYw9mU',
        price: 80,
        duration: '90 minutos',
        category: 'Terapia Energética',
        featured: true,
        description: 'O Reiki Kundalini é uma poderosa técnica de cura energética que combina a energia universal do Reiki tradicional com a ativação da energia Kundalini. Esta sessão profunda trabalha todos os chakras, promovendo equilíbrio, vitalidade e despertar espiritual.',
        shortDescription: 'Técnica avançada de cura energética que desperta e equilibra a energia vital Kundalini',
        benefits: [
            'Ativação e equilíbrio dos chakras',
            'Despertar da energia Kundalini de forma segura',
            'Libertação de bloqueios energéticos profundos',
            'Aumento da vitalidade e energia física',
            'Expansão da consciência espiritual',
            'Redução significativa do stress e ansiedade',
            'Fortalecimento do sistema imunitário',
            'Clareza mental e emocional'
        ],
        whatToExpect: 'Durante a sessão, você permanecerá deitado confortavelmente enquanto canalizo energia através das mãos em pontos específicos do corpo. Muitos sentem calor, formigueiros ou ondas de energia subindo pela coluna. É comum experimentar estados profundos de relaxamento, visões coloridas ou sensações de expansão. Após a sessão, é normal sentir-se energizado e ao mesmo tempo profundamente relaxado.',
        whoIsItFor: [
            'Pessoas em busca de crescimento espiritual',
            'Quem sofre de fadiga crônica ou baixa energia',
            'Indivíduos com bloqueios emocionais profundos',
            'Praticantes de meditação e yoga',
            'Pessoas em processos de transformação pessoal'
        ],
        preparation: 'Vista roupas confortáveis e soltas. Evite refeições pesadas 2 horas antes. Hidrate-se bem no dia anterior e no dia da sessão. Venha com intenção aberta para cura e transformação.',
        aftercare: 'Beba muita água nas 24-48 horas seguintes. Descanse e permita-se processar as energias movimentadas. Evite álcool e estimulantes no dia da sessão. Journaling pode ajudar a integrar insights recebidos.',
        contraindications: 'Não recomendado para pessoas com distúrbios psiquiátricos graves não controlados. Em caso de gravidez ou condições médicas sérias, consulte seu médico antes.',
        imageUrl: '/images/services/reiki-kundalini.jpg'
    },
    {
        slug: 'leitura-aura',
        title: 'Leitura de Aura',
        stripePriceId: 'price_1SsRKVHvoxa2NZ5dTyJ8rOOV',
        price: 60,
        duration: '60 minutos',
        category: 'Diagnóstico Energético',
        featured: true,
        description: 'A Leitura de Aura é uma análise profunda do seu campo energético que revela o estado dos seus corpos físico, emocional, mental e espiritual. Através desta leitura intuitiva, identifico padrões energéticos, bloqueios e potenciais, oferecendo orientações práticas para o seu bem-estar.',
        shortDescription: 'Análise detalhada do campo energético para compreender padrões emocionais e espirituais',
        benefits: [
            'Compreensão profunda do estado energético atual',
            'Identificação de bloqueios emocionais e mentais',
            'Reconhecimento de padrões de comportamento',
            'Orientação para cura e crescimento pessoal',
            'Validação de experiências e sentimentos',
            'Clareza sobre propósito de vida',
            'Identificação de dons e potenciais',
            'Consciência de influências energéticas externas'
        ],
        whatToExpect: 'Começamos com uma breve meditação para centrar a energia. Depois, faço uma leitura visual e intuitiva da sua aura, descrevendo cores, texturas, brilho e padrões que observo. Compartilho informações sobre cada camada energética e o que elas revelam. A sessão inclui tempo para perguntas e orientações personalizadas.',
        whoIsItFor: [
            'Pessoas em busca de autoconhecimento',
            'Quem sente-se perdido ou confuso',
            'Indivíduos em momentos de transição',
            'Quem deseja validação espiritual',
            'Pessoas curiosas sobre sua energia'
        ],
        preparation: 'Venha com mente aberta e questões específicas se desejar. Não é necessária preparação especial, apenas disposição para receber informações.',
        aftercare: 'Reflita sobre as informações recebidas. Faça anotações dos insights importantes. Implemente gradualmente as orientações sugeridas.',
        contraindications: 'Nenhuma conhecida. Adequado para todos os níveis de experiência espiritual.',
        imageUrl: '/images/services/leitura-aura.jpg'
    },
    {
        slug: 'cura-holistca',
        title: 'Cura Holística',
        stripePriceId: 'price_1SsRKgHvoxa2NZ5dQ6wCP6vF',
        price: 120,
        duration: '120 minutos',
        category: 'Terapia Integrativa',
        featured: true,
        description: 'A Cura Holística é uma sessão abrangente que integra múltiplas técnicas terapêuticas - Reiki, leitura energética, cura emocional, alinhamento de chakras e aconselhamento espiritual. É uma experiência transformadora que trabalha todos os níveis do ser: físico, emocional, mental e espiritual.',
        shortDescription: 'Sessão integrativa completa combinando múltiplas técnicas de cura energética e emocional',
        benefits: [
            'Cura profunda em múltiplos níveis',
            'Alinhamento completo dos chakras',
            'Libertação de traumas emocionais',
            'Resolução de questões de vidas passadas',
            'Equilíbrio mente-corpo-espírito',
            'Transformação de padrões limitantes',
            'Ativação do potencial de autocura',
            'Conexão profunda com o eu superior',
            'Paz interior duradoura'
        ],
        whatToExpect: 'Esta é uma jornada terapêutica profunda. Começamos com uma conversa sobre suas necessidades e intenções. A sessão inclui análise energética, trabalho de Reiki, técnicas de liberação emocional, canalização de mensagens e orientações práticas. É uma experiência personalizada, adaptada às suas necessidades específicas do momento.',
        whoIsItFor: [
            'Pessoas com questões complexas ou crônicas',
            'Quem busca transformação profunda',
            'Indivíduos em crise existencial',
            'Pessoas com traumas a processar',
            'Quem deseja experiência terapêutica completa'
        ],
        preparation: 'Reserve o resto do dia para integração. Vista roupas muito confortáveis. Hidrate-se bem. Defina intenções claras para a sessão. Esteja preparado para liberação emocional profunda.',
        aftercare: 'Descanse pelo menos 24 horas após a sessão. Beba muita água. Permita-se sentir e processar emoções que surgirem. Evite decisões importantes por 48 horas. Faça journaling. Banhos com sal grosso podem ajudar na integração.',
        contraindications: 'Não recomendado durante crises psiquiátricas agudas. Informe condições médicas sérias previamente.',
        imageUrl: '/images/services/cura-holistica.jpg'
    },
    {
        slug: 'consultoria-energetica',
        title: 'Consultoria Energética',
        stripePriceId: 'price_1SsRKhHvoxa2NZ5dIy8TpsPm',
        price: 100,
        duration: '90 minutos',
        category: 'Orientação Espiritual',
        featured: false,
        description: 'A Consultoria Energética é uma sessão de orientação e aconselhamento espiritual que combina leitura intuitiva, análise energética de situações e orientações práticas para questões específicas da vida. Ideal para quem busca clareza, direção e ferramentas para navegar desafios pessoais, profissionais ou espirituais.',
        shortDescription: 'Orientação personalizada para questões de vida através de perspectiva energética e intuitiva',
        benefits: [
            'Clareza sobre situações complexas',
            'Compreensão energética de relacionamentos',
            'Orientação para decisões importantes',
            'Identificação de próximos passos',
            'Estratégias para proteção energética',
            'Ferramentas práticas de autocuidado',
            'Validação de intuições pessoais',
            'Plano de ação personalizado'
        ],
        whatToExpect: 'Conversamos profundamente sobre suas questões e desafios. Faço leituras energéticas das situações apresentadas, oferecendo perspectivas intuitivas e espirituais. Juntos, desenvolvemos estratégias práticas e energéticas para lidar com os desafios. Você sairá com um plano de ação claro e ferramentas concretas.',
        whoIsItFor: [
            'Pessoas enfrentando decisões difíceis',
            'Quem busca orientação sobre relacionamentos',
            'Profissionais em transição de carreira',
            'Indivíduos com questões familiares complexas',
            'Quem deseja desenvolver proteção energética'
        ],
        preparation: 'Prepare lista de questões específicas. Traga informações relevantes sobre as situações (datas, nomes se confortável). Venha com abertura para diferentes perspectivas.',
        aftercare: 'Implemente as orientações gradualmente. Faça anotações detalhadas após a sessão. Pratique as técnicas ensinadas diariamente. Agende follow-up se necessário.',
        contraindications: 'Esta não é substituição para aconselhamento médico, psicológico ou legal profissional.',
        imageUrl: '/images/services/consultoria-energetica.jpg'
    },
    {
        slug: 'meditacao-guiada',
        title: 'Meditação Guiada',
        stripePriceId: 'price_1SsRKiHvoxa2NZ5dMCSAdw0F',
        price: 50,
        duration: '45 minutos',
        category: 'Práticas Meditativas',
        featured: false,
        description: 'Sessões de Meditação Guiada personalizadas para diferentes intenções: relaxamento profundo, conexão espiritual, cura emocional, visualização criativa ou desenvolvimento intuitivo. Uma jornada interior conduzida com suavidade e segurança.',
        shortDescription: 'Experiência meditativa conduzida para relaxamento, cura ou desenvolvimento espiritual',
        benefits: [
            'Relaxamento profundo imediato',
            'Redução de stress e ansiedade',
            'Acesso a estados meditativos profundos',
            'Conexão com guias espirituais',
            'Cura emocional gentil',
            'Desenvolvimento da intuição',
            'Clareza mental e emocional',
            'Experiência de paz interior',
            'Ferramentas para prática autônoma'
        ],
        whatToExpect: 'Você ficará confortavelmente acomodado enquanto guio uma jornada meditativa através de visualizações, respirações e técnicas de relaxamento. Cada sessão é adaptada à sua intenção - seja cura, relaxamento, conexão ou insight. Pode incluir música suave, sons da natureza ou trabalho com cristais.',
        whoIsItFor: [
            'Iniciantes em meditação',
            'Pessoas com dificuldade em meditar sozinhas',
            'Quem busca relaxamento profundo',
            'Indivíduos com insônia ou stress',
            'Praticantes que desejam aprofundar a prática'
        ],
        preparation: 'Vista roupas confortáveis. Evite cafeína 2 horas antes. Desligue celular. Venha com intenção específica se desejar.',
        aftercare: 'Mantenha-se hidratado. Evite atividades intensas imediatamente após. Pratique técnicas aprendidas em casa diariamente se possível.',
        contraindications: 'Pessoas com epilepsia fotossensível devem informar previamente. Não recomendado durante episódios psicóticos agudos.',
        imageUrl: '/images/services/meditacao-guiada.jpg'
    },
    {
        slug: 'limpeza-energetica',
        title: 'Limpeza Energética',
        stripePriceId: 'price_1SsRKiHvoxa2NZ5ddcd5VUc0',
        price: 75,
        duration: '75 minutos',
        category: 'Purificação Energética',
        featured: false,
        description: 'A Limpeza Energética é uma sessão focada em remover energias densas, estagnadas ou negativas do campo energético e dos chakras. Ideal após períodos difíceis, ambientes pesados ou quando sente-se energeticamente sobrecarregado. Inclui purificação com ervas sagradas, cristais e trabalho energético profundo.',
        shortDescription: 'Remoção de energias negativas e purificação profunda do campo energético',
        benefits: [
            'Remoção de energias densas e negativas',
            'Purificação do campo áurico',
            'Limpeza de chakras obstruídos',
            'Corte de cordões energéticos prejudiciais',
            'Proteção energética fortalecida',
            'Sensação de leveza e renovação',
            'Aumento de vitalidade',
            'Clareza mental e emocional',
            'Melhoria do sono e bem-estar'
        ],
        whatToExpect: 'A sessão combina defumação com ervas sagradas (sálvia, palo santo), trabalho com cristais purificadores, técnicas de Reiki de limpeza e visualizações. Trabalho sistematicamente em todos os chakras e camadas do campo energético, removendo cargas, implantes energéticos e cordões prejudiciais. Finalizo com selagem e proteção energética.',
        whoIsItFor: [
            'Pessoas que sentem-se energeticamente pesadas',
            'Quem trabalha com públicos ou ambientes densos',
            'Profissionais de saúde e terapeutas',
            'Após términos de relacionamentos',
            'Depois de períodos de doença',
            'Pessoas sensíveis a energias alheias',
            'Quem vive ou trabalha em ambientes negativos'
        ],
        preparation: 'Tome banho antes da sessão. Vista roupas limpas e claras (branco ou cores suaves preferível). Evite perfumes fortes. Hidrate-se bem.',
        aftercare: 'Tome banho com sal grosso em casa. Beba muita água. Evite ambientes e pessoas negativas por 72 horas se possível. Mantenha proteção energética diária (visualizações, orações). Defume sua casa.',
        contraindications: 'Pessoas com alergias respiratórias graves devem informar (alternativas sem fumaça disponíveis). Gestantes devem informar.',
        imageUrl: '/images/services/limpeza-energetica.jpg'
    }
];

async function populateServices() {
    console.log('🌟 Iniciando população de conteúdo dos serviços...\n');

    for (const service of servicesContent) {
        try {
            const doc = {
                _id: `service-${service.slug}`,
                _type: 'service',
                title: service.title,
                slug: { _type: 'slug', current: service.slug },
                stripePriceId: service.stripePriceId,
                price: service.price,
                duration: service.duration,
                category: service.category,
                featured: service.featured,
                description: service.description,
                shortDescription: service.shortDescription,
                benefits: service.benefits,
                whatToExpect: service.whatToExpect,
                whoIsItFor: service.whoIsItFor,
                preparation: service.preparation,
                aftercare: service.aftercare,
                contraindications: service.contraindications,
                imageUrl: service.imageUrl
            };

            const result = await client.createOrReplace(doc);
            console.log(`✅ ${service.title} - atualizado com sucesso`);
            console.log(`   - Preço: €${service.price} | Duração: ${service.duration}`);
            console.log(`   - ${service.benefits.length} benefícios | Categoria: ${service.category}\n`);
        } catch (error) {
            console.error(`❌ Erro ao atualizar ${service.title}:`, error.message);
        }
    }

    console.log('🎉 População de conteúdo concluída!');
    console.log('\n📋 Resumo:');
    console.log(`   - Total de serviços: ${servicesContent.length}`);
    console.log(`   - Serviços destacados: ${servicesContent.filter(s => s.featured).length}`);
    console.log(`   - Faixa de preços: €${Math.min(...servicesContent.map(s => s.price))} - €${Math.max(...servicesContent.map(s => s.price))}`);
}

populateServices().catch(console.error);
